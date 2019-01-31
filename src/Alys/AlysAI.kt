class SimpleAlysAIType : PlayerType<AlysState, AlysAction>("CPU - Medium") {
	override fun isOfType(player: Player<AlysState, AlysAction>): Boolean = player.controller is SimpleAIController
	override fun getController() = SimpleAIController(::alysUtility)
}

private fun alysUtility(state: AlysState, action: AlysAction): Int {
	if (action is AlysEndTurnAction)
		return 0
	if (action is AlysMoveAction)
		return utilityFor(state, action)
	if (action is AlysCreateAction)
		return utilityFor(state, action)
	return 1
}

private fun utilityFor(state: AlysState, action: AlysMoveAction): Int {
	val destination = state.board[action.destination] as AlysField
	if (destination.piece != null) {
		return if (destination.player == state.currentPlayer) {
			when (destination.piece.type) {
				AlysType.Soldier -> if (isUpgradeWanted(state, PositionedField(action.destination, destination))) 10 else -1
				AlysType.Tree -> 3
				AlysType.CoastTree -> 10
				else -> 1
			}
		} else when (destination.piece.type) {
			AlysType.Soldier -> 5
			AlysType.CoastTree -> 9
			AlysType.Fort -> 5
			else -> 1
		}
	}
	return 0
}

private fun isUpgradeWanted(state: AlysState, place: PositionedField<AlysField>): Boolean {
	val strength = place.field.piece?.strength ?: return false
	if (place.field.piece.hasMoved)
		return false
	val area = state.connectedPositions(place.position)
	if (!canAffordUpgrade(state, area, strength))
		return false
	val smallestDefense = state.neighbouringPositions(area).map { state.totalDefenseOf(it) }.min()
			?: return false
	if (strength <= smallestDefense)
		return true
	return false
}

private fun canAffordUpgrade(state: AlysState, area: List<PositionedField<AlysField>>, strength: Int): Boolean {
	val oldUpkeep = Alys.upkeepFor(strength)
	val newUpkeep = Alys.upkeepFor(strength + 1)
	val base = area.find { it.field.treasury != null } ?: return false
	val income = state.incomeFor(base.position)
	val totalUpkeep = newUpkeep - oldUpkeep - 2 + area
			.mapNotNull { it.field.piece }
			.sumBy { Alys.upkeepFor(it) }
	return income + (base.field.treasury ?: 0) >= totalUpkeep
}

private fun utilityFor(state: AlysState, action: AlysCreateAction): Int {
	if (action.type == AlysType.Soldier)
		return utilityFor(state, AlysMoveAction(action.origin, action.destination))
	val adjacents = state.adjacentFields(action.destination)
	val fortNearby = adjacents
			.filter { it.field.player == state.currentPlayer }
			.any { it.field.piece?.type == AlysType.Fort }
	if (fortNearby)
		return -1
	val enemyNearby = adjacents.any { it.field.player != state.currentPlayer } ||
			state.neighbouringPositions(adjacents).any { it.field.player != state.currentPlayer }
	return if (enemyNearby) 3 else -1
}
