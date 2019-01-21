import kotlin.math.min

data class AlysState(
		val width: Int = 10, val height: Int = 10,
		val playerCount: Int = 4,
		override val board: Grid<AlysField?> = Grid(width, height, { x, y ->
			AlysField((1..playerCount).random())
		}),
		override val currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<AlysField?, AlysAction, Int> {

	override fun confirmLegality(action: AlysAction): Result<Any?> {
		if (action is AlysMoveAction)
			return confirmMoveLegality(action)
		if (action is AlysCreateAction)
			return confirmCreateLegality(action)
		if (action is AlysEndTurnAction)
			return Result.success()
		return Result.failure("Unknown action")
	}

	fun <R : AlysRule<A>, A> confirmRules(action: A, rules: List<R>, info: AlysActionInfo): Result<Any?> {
		for (rule in rules)
			if (!rule.isLegal(action, this, info))
				return Result.failure(rule.description)
		return Result.success()
	}

	private fun confirmMoveLegality(action: AlysMoveAction, previousInfo: AlysActionInfo? = null): Result<Any?> {
		val info = previousInfo ?: AlysActionInfo()
		if (previousInfo == null)
			confirmRules(action, Alys.commonRules, info).onFailure { return it }
		return confirmRules(action, Alys.moveRules, info)
	}

	private fun confirmCreateLegality(action: AlysCreateAction): Result<Any?> {
		val info = AlysActionInfo()
		confirmRules(action, Alys.commonRules, info).onFailure { return it }
		confirmRules(action, Alys.createRules, info).onFailure { return it }
		if (action.type == AlysType.Soldier){
			info.originPiece = AlysPiece(AlysType.Soldier)
			return confirmMoveLegality(AlysMoveAction(action.origin, action.destination), info)
		}
		return Result.success()
	}

	fun defenseOf(field: AlysField): Int {
		if (field.piece?.type == AlysType.Soldier)
			return min(field.piece.strength, 3)
		if (field.piece?.type == AlysType.Fort)
			return 2
		if (field.treasury != null)
			return 1
		return 0
	}

	override fun possibleActions(): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		return actions.toList()
	}

	override fun nextState(action: AlysAction): AlysState {
		val newBoard = board.copy()
		if (action is AlysMoveAction)
			return nextStateFrom(action, newBoard)
		if (action is AlysCreateAction)
			return nextStateFrom(action, newBoard)
		if (action is AlysEndTurnAction)
			return nextStateFrom(action, newBoard)
		return this.copy(board = newBoard)
	}

	private fun nextStateFrom(action: AlysMoveAction, newBoard: Grid<AlysField?>): AlysState {
		val piece = newBoard[action.origin]?.piece ?: return this
		val destination = newBoard[action.destination] ?: return this
		val newState = this.copy(board = newBoard)
		// modifying destination
		when {
			destination.player != currentPlayer ->
				invadeField(action.origin, action.destination, newState)
			destination.piece?.type == AlysType.Soldier ->
				newBoard[action.destination] = destination.copy(
						piece = destination.piece.copy(strength = min(4, destination.piece.strength + piece.strength))
				)
			destination.piece?.type != null ->
				newBoard[action.destination] = AlysField(currentPlayer, piece.copy(hasMoved = true))
			else ->
				newBoard[action.destination] = AlysField(currentPlayer, piece.copy())
		}
		newBoard[action.origin] = (newBoard[action.origin] as AlysField).copy(piece = null)
		return newState
	}

	private fun invadeField(origin: Position, destination: Position, newState: AlysState) {
		val piece = newState.board[origin]?.piece as AlysPiece
		newState.board[destination] = AlysField(currentPlayer, piece.copy(hasMoved = true))
		mergeAreas(destination, newState)
		fixSplitAreas(destination, newState)
	}

	private fun mergeAreas(mergePoint: Position, newState: AlysState) {
		val area = connectedPositions(mergePoint, newState.board)
		val bases = area.filter { it.field.treasury != null }
		val treasury = bases.sumBy { it.field.treasury ?: 0 }
		val biggestBase = bases.maxBy { it.field.treasury ?: 0 } ?: return
		for (base in bases)
			newState.board[base.position] = base.field.copy(treasury = null)
		newState.board[biggestBase.position] = biggestBase.field.copy(treasury = treasury)
	}

	private fun fixSplitAreas(mergePoint: Position, newState: AlysState) {
		for (position in mergePoint.adjacentHexes()) {
			if (!newState.board.isWithinBounds(position) || newState.board[position] == null)
				continue
			val area = connectedPositions(position, newState.board)
			if (area.size == 1) {
				newState.board[area[0].position] = area[0].field.copy(treasury = null)
				continue
			}
			if (area.any { it.field.treasury != null })
				continue
			val emptyArea = area.filter { it.field.piece?.type != AlysType.Soldier && it.field.piece?.type != AlysType.Fort }
			val newBase = if (emptyArea.isEmpty()) area.random() else emptyArea.random()
			newState.board[newBase.position] = AlysField(newBase.field.player, treasury = 0)
		}
	}

	private fun nextStateFrom(action: AlysCreateAction, newBoard: Grid<AlysField?>): AlysState {
		val origin = newBoard[action.origin] ?: return this
		if (action.type == AlysType.Soldier) {
			newBoard[action.origin] = origin.copy(treasury = (origin.treasury as Int) - 10, piece = AlysPiece(AlysType.Soldier))
			return nextStateFrom(AlysMoveAction(action.origin, action.destination), newBoard)
		} else if (action.type == AlysType.Fort) {
			newBoard[action.origin] = origin.copy(treasury = (origin.treasury as Int) - 15)
			newBoard[action.destination] = (newBoard[action.destination] as AlysField).copy(piece = AlysPiece(AlysType.Fort))
			return this.copy(board = newBoard)
		}
		return this
	}

	private fun nextStateFrom(action: AlysEndTurnAction, newBoard: Grid<AlysField?>): AlysState {
		val basePositions = newBoard.positions().filter { newBoard[it]?.player == currentPlayer && newBoard[it]?.treasury != null }
		for (position in basePositions) {
			val base = newBoard[position] as AlysField
			val treasury = (base.treasury as Int) + connectedPositions(position, board).size
			newBoard[position] = base.copy(treasury = treasury)
		}
		var nextPlayer = currentPlayer + 1
		if (nextPlayer > playerCount) {
			nextPlayer = 1
		}
		beginTurn(nextPlayer, newBoard)
		return this.copy(board = newBoard, currentPlayer = nextPlayer)
	}

	private fun beginTurn(player: Int, newBoard: Grid<AlysField?>) {
		val playerArea = newBoard.positionedFields()
				.filter { it.field?.player == player }
				.map { PositionedField(it.position, it.field as AlysField) }
		val newTrees = mutableListOf<Position>()
		for (place in playerArea)
			if (place.field.piece == null && place.field.treasury == null)
				if (place.position.adjacentHexes()
								.map { if (newBoard.isWithinBounds(it)) newBoard[it] else null }
								.filter { it?.piece?.type == AlysType.Tree }.size > 1)
					newTrees.add(place.position)
		for (position in newTrees)
			newBoard[position] = AlysField(player, AlysPiece(AlysType.Tree))
		for (place in playerArea.filter { it.field.piece?.type == AlysType.Grave })
			newBoard[place.position] = AlysField(player, AlysPiece(AlysType.Tree))
		for (place in playerArea.filter { it.field.piece?.type == AlysType.Soldier
				&& it.position.adjacentHexes().filter { newBoard.isWithinBounds(it) && newBoard[it]?.player == player }.isEmpty() })
			newBoard[place.position] = AlysField(player, AlysPiece(AlysType.Grave ))
		val bases = playerArea.filter { it.field.player == player && it.field.treasury != null }
		for (base in bases) {
			val area = connectedPositions(base.position, board)
			val treasury = (base.field.treasury as Int)
			+area.filter { it.field.piece?.type != AlysType.Tree && it.field.piece?.type != AlysType.CoastTree }.size
			val soldiers = area.filter { it.field.piece?.type == AlysType.Soldier }
			for (soldier in soldiers)
				newBoard[soldier.position] = soldier.field.copy(piece = soldier.field.piece?.copy(hasMoved = false))
			val upkeep = soldiers.map { upkeepFor(it.field.piece?.strength ?: 0) }.sum()
			if (upkeep <= treasury)
				newBoard[base.position] = base.field.copy(treasury = treasury - upkeep)
			else
				for (soldier in soldiers)
					newBoard[soldier.position] = AlysField(player, AlysPiece(AlysType.Grave))
		}
	}

	private fun upkeepFor(strength: Int): Int {
		return when (strength) {
			1 -> 2
			2 -> 6
			3 -> 18
			4 -> 54
			else -> 0
		}
	}

	override fun findWinner(): Int? {
		return null
	}

	fun isConnected(origin: Position, destination: Position): Boolean {
		val area = connectedPositions(origin, board)
		for (pos in destination.adjacentHexes())
			if (area.any { it.position == pos })
				return true
		return false
	}

	companion object {
		fun connectedPositions(origin: Position, board: Grid<AlysField?>): List<PositionedField<AlysField>> {
			val base = board[origin] ?: return listOf()
			val front = mutableListOf(origin)
			val connected = mutableListOf(origin)
			while (front.isNotEmpty()) {
				val nextPosition = front.removeAt(0)
				val newConnected = nextPosition.adjacentHexes()
						.filter { board.isWithinBounds(it) && board[it]?.player == base.player }
						.filter { !connected.contains(it) }
				connected.addAll(newConnected)
				front.addAll(newConnected)
			}
			return connected.map { PositionedField(it, board[it] as AlysField) }
		}
	}
}
