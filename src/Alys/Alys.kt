import kotlin.math.min

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

	override fun copyState(): AlysState {
		return AlysState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players, state.round)
	}

	override val actionTypes = listOf(
			ActionType("build fort",
					{ _, action ->
						action is AlysCreateAction && action.type == AlysType.Fort
					},
					AlysSasBuild.Companion::readyAction,
					listOf<ActionStep<AlysSasBuild>>(
							AlysSasBuild::originMustBeCurrentPlayer,
							AlysSasBuild::originAndDestinationMustBeDifferent,
							AlysSasBuild::originAndDestinationMustConnected,
							AlysSasBuild::destinationMustBeCurrentPlayer,
							AlysSasBuild::destinationMustBeEmpty,
							AlysSasBuild::subtractMoney,
							AlysSasBuild::placePiece
					)
			),
			ActionType("hire and move soldier",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Soldier && state.board[action.destination]?.player == state.currentPlayer
					},
					AlysSasHire.Companion::readyAction,
					listOf<ActionStep<AlysSasHire>>(
							AlysSasHire::originMustBeCurrentPlayer,
							AlysSasHire::originAndDestinationMustBeDifferent,
							AlysSasHire::originAndDestinationMustConnected,
							AlysSasHire::subtractMoneyForSoldier,
							AlysSasHire::destinationMustNotBeFortOrTown,
							AlysSasMove::destinationMustNotBeFullyUpgradedSoldier,
							AlysSasHire::placeOrUpgradePiece,
							AlysSasMove::removeOriginalPiece
					)
			),
			ActionType("hire soldier and invade",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Soldier && state.board[action.destination]?.player != state.currentPlayer
					},
					AlysSasHire.Companion::readyAction,
					listOf<ActionStep<AlysSasHire>>(
							AlysSasHire::originMustBeCurrentPlayer,
							AlysSasHire::originAndDestinationMustBeDifferent,
							AlysSasHire::originAndDestinationMustConnected,
							AlysSasHire::subtractMoneyForSoldier,
							AlysSasMove::pieceMustBeStronger,
							AlysSasMove::invadeDestination,
							AlysSasMove::removeOriginalPiece,
							AlysSasMove::fixSplitAreas,
							AlysSasMove::fixMergedAreas
					)
			),
			ActionType("move soldier",
					{ state, action ->
						action is AlysMoveAction && state.board[action.destination]?.player == state.currentPlayer
					},
					AlysSasMove.Companion::readyAction,
					listOf<ActionStep<AlysSasMove>>(
							AlysSasMove::originMustBeCurrentPlayer,
							AlysSasMove::originAndDestinationMustBeDifferent,
							AlysSasMove::originAndDestinationMustConnected,
							AlysSasMove::pieceMustBeSoldier,
							AlysSasMove::pieceMustNotHaveMoved,
							AlysSasMove::destinationMustNotBeFortOrTown,
							AlysSasMove::destinationMustNotBeFullyUpgradedSoldier,
							AlysSasMove::placeOrUpgradePiece,
							AlysSasMove::removeOriginalPiece
					)
			),
			ActionType("invade",
					{ state, action ->
						action is AlysMoveAction && state.board[action.destination]?.player != state.currentPlayer
					},
					AlysSasMove.Companion::readyAction,
					listOf<ActionStep<AlysSasMove>>(
							AlysSasMove::originMustBeCurrentPlayer,
							AlysSasMove::originAndDestinationMustBeDifferent,
							AlysSasMove::originAndDestinationMustConnected,
							AlysSasMove::pieceMustBeSoldier,
							AlysSasMove::pieceMustNotHaveMoved,
							AlysSasMove::pieceMustBeStronger,
							AlysSasMove::invadeDestination,
							AlysSasMove::removeOriginalPiece,
							AlysSasMove::fixSplitAreas,
							AlysSasMove::fixMergedAreas
					)
			),
			ActionType("end turn",
					{ _, action ->
						action is AlysEndTurnAction
					},
					AlysSasEnd.Companion::readyAction,
					listOf<ActionStep<AlysSasEnd>>(
							AlysSasEnd::changeCurrentPlayer,
							AlysSasEnd::incrementRound,
							AlysSasEnd::gainIncome,
							AlysSasEnd::spreadTrees,
							AlysSasEnd::spreadCoastTrees,
							AlysSasEnd::overgrowGraves,
							AlysSasEnd::killLoneSoldiers,
							AlysSasEnd::subtractUpkeep
					)
			)
	)

	companion object {
		fun priceOf(type: AlysType): Int {
			return when (type) {
				AlysType.Soldier -> 10
				AlysType.Fort -> 15
				else -> 0
			}
		}

		fun upkeepFor(piece: AlysPiece): Int {
			if (piece.type != AlysType.Soldier)
				return 0
			return upkeepFor(piece.strength)
		}

		fun upkeepFor(strength: Int): Int {
			return when (strength) {
				1 -> 2
				2 -> 6
				3 -> 18
				4 -> 54
				else -> 0
			}
		}
	}

	fun newGame(width: Int = 15, height: Int = 15, seed: Int = 1) {
		val creator = AlysBoardCreator(width, height, seed)
		creator.generateLand()
		creator.fillBoard(players.size)
		this.state = AlysState(width, height, players.size, creator.board, 1, (1..players.size).toList())
	}
}

fun <T : AlysSasStandard> T.originAndDestinationMustBeDifferent() =
		Result.check("origin and destination must be different", origin.position != destination.position)

fun <T : AlysSasStandard> T.originAndDestinationMustConnected() =
		Result.check("origin and destination must connected", oldState.isConnected(origin.position, destination.position))

fun <T : AlysSasStandard> T.originMustBeCurrentPlayer() =
		Result.check("origin must be current player", origin.field.player == oldState.currentPlayer)

fun <T : AlysSasStandard> T.destinationMustBeCurrentPlayer() =
		Result.check("destination must be current player", destination.field.player == oldState.currentPlayer)

fun <T : AlysSasStandard> T.destinationMustBeEmpty() =
		Result.check("destination must be empty", destination.field.piece == null && destination.field.treasury == null)

fun <T : AlysSasStandard> T.destinationMustNotBeFortOrTown() =
		Result.check("destination must not be fort or town", destination.field.piece?.type != AlysType.Fort && destination.field.treasury == null)

fun <T : AlysSasStandard> T.destinationMustNotBeFullyUpgradedSoldier() =
		Result.check("destination must not be fully upgraded soldier", !(destination.field.piece?.type == AlysType.Soldier && destination.field.piece.strength == 4))

fun AlysSasMove.pieceMustNotHaveMoved() =
		Result.check("piece must not have moved", !piece.hasMoved)

fun AlysSasMove.pieceMustBeSoldier() =
		Result.check("piece must be soldier", piece.type == AlysType.Soldier)

fun AlysSasMove.pieceMustBeStronger() =
		Result.check("piece must be stronger", piece.strength > oldState.totalDefenseOf(destination))

fun AlysSasMove.placeOrUpgradePiece(): Result<Any?> {
	val destinationPiece = destination.field.piece
	when {
		destinationPiece == null ->
			newState.board[destination.position] = destination.field.copy(piece = piece.copy())
		destinationPiece.type == AlysType.Soldier ->
			newState.board[destination.position] = destination.field.copy(piece =
			destinationPiece.copy(strength = min(4, destinationPiece.strength + piece.strength)))
		else ->
			newState.board[destination.position] = destination.field.copy(piece = piece.copy(hasMoved = true))
	}
	return Result.success()
}

fun AlysSasMove.removeOriginalPiece(): Result<Any?> {
	newState.board[origin.position] = newState.board[origin.position]?.copy(piece = null)
	return Result.success()
}

fun AlysSasMove.invadeDestination(): Result<Any?> {
	newState.board[destination.position] = AlysField(oldState.currentPlayer, piece.copy(hasMoved = true))
	return Result.success()
}

fun AlysSasMove.fixSplitAreas(): Result<Any?> {
	for (place in newState.adjacentFields(destination.position)) {
		val area = newState.connectedPositions(place.position)
		if (area.size == 1) {
			newState.board[place.position] = place.field.copy(treasury = null)
			continue
		}
		if (area.any { it.field.treasury != null })
			continue
		val emptyArea = area.filter { it.field.piece?.type != AlysType.Soldier && it.field.piece?.type != AlysType.Fort }
		val newBase = if (emptyArea.isEmpty()) area.random() else emptyArea.random()
		newState.board[newBase.position] = AlysField(newBase.field.player, treasury = 0)
	}
	return Result.success()
}

fun AlysSasMove.fixMergedAreas(): Result<Any?> {
	val area = newState.connectedPositions(destination.position)
	val bases = area.filter { it.field.treasury != null }
	val treasury = bases.sumBy { it.field.treasury ?: 0 }
	val biggestBase = bases.maxBy { it.field.treasury ?: 0 } ?: return Failure("There was no base? This shouldn't happen")
	for (base in bases)
		newState.board[base.position] = base.field.copy(treasury = null)
	newState.board[biggestBase.position] = biggestBase.field.copy(treasury = treasury)
	return Result.success()
}

fun AlysSasBuild.subtractMoney(): Result<Any?> {
	if (treasury < Alys.priceOf(type))
		return Failure("not enough money")
	newState.board[origin.position] = origin.field.copy(treasury = treasury - Alys.priceOf(type))
	return Result.success()
}

fun AlysSasHire.subtractMoneyForSoldier(): Result<Any?> {
	if (treasury < Alys.priceOf(AlysType.Soldier))
		return Failure("not enough money")
	newState.board[origin.position] = origin.field.copy(treasury = treasury - Alys.priceOf(AlysType.Soldier))
	return Result.success()
}

fun AlysSasBuild.placePiece(): Result<Any?> {
	newState.board[destination.position] = destination.field.copy(piece = AlysPiece(type))
	return Result.success()
}

fun AlysSasEnd.changeCurrentPlayer(): Result<Any?> {
	newState.currentPlayer = player
	return Result.success()
}

fun AlysSasEnd.incrementRound(): Result<Any?> {
	if (newState.currentPlayer < oldState.currentPlayer)
		newState.round = oldState.round + 1
	return Result.success()
}

fun AlysSasEnd.gainIncome(): Result<Any?> {
	for (base in bases) {
		val treasury = (base.field.treasury as Int) + oldState.incomeFor(base.position)
		newState.board[base.position] = base.field.copy(treasury = treasury)
	}
	return Result.success()
}

fun AlysSasEnd.spreadTrees(): Result<Any?> {
	val newTrees = mutableListOf<Position>()
	for (place in playerArea)
		if (place.field.piece == null && place.field.treasury == null)
			if (oldState.adjacentFields(place.position)
							.filter { it.field.piece?.type == AlysType.Tree }.size > 1)
				newTrees.add(place.position)
	for (position in newTrees)
		newState.board[position] = AlysField(player, AlysPiece(AlysType.Tree))
	return Result.success()
}

fun AlysSasEnd.spreadCoastTrees(): Result<Any?> {
	val newTrees = mutableListOf<Position>()
	for (place in playerArea)
		if (place.field.piece == null && place.field.treasury == null) {
			val adjacents = oldState.adjacentFields(place.position)
			if (adjacents.size < 6 && adjacents.any { it.field.piece?.type == AlysType.CoastTree })
				newTrees.add(place.position)
		}
	for (position in newTrees)
		newState.board[position] = AlysField(player, AlysPiece(AlysType.CoastTree))
	return Result.success()
}

fun AlysSasEnd.overgrowGraves(): Result<Any?> {
	for (place in playerArea.filter { it.field.piece?.type == AlysType.Grave }) {
		if (oldState.adjacentFields(place.position).size < 6)
			newState.board[place.position] = AlysField(player, AlysPiece(AlysType.CoastTree))
		else
			newState.board[place.position] = AlysField(player, AlysPiece(AlysType.Tree))
	}
	return Result.success()
}

fun AlysSasEnd.killLoneSoldiers(): Result<Any?> {
	for (place in playerArea.filter {
		it.field.piece?.type == AlysType.Soldier &&
				oldState.adjacentFields(it.position).none { it.field.player == player }
	})
		newState.board[place.position] = AlysField(player, AlysPiece(AlysType.Grave))
	return Result.success()
}

fun AlysSasEnd.subtractUpkeep(): Result<Any?> {
	for (base in bases) {
		val area = oldState.connectedPositions(base.position)
		val treasury = (base.field.treasury as Int) + area.filter {
			it.field.piece?.type != AlysType.Tree && it.field.piece?.type != AlysType.CoastTree
		}.size
		val soldiers = area.filter { it.field.piece?.type == AlysType.Soldier }
		for (soldier in soldiers)
			newState.board[soldier.position] = soldier.field.copy(piece = soldier.field.piece?.copy(hasMoved = false))
		val upkeep = soldiers.map { Alys.upkeepFor(it.field.piece as AlysPiece) }.sum()
		if (upkeep <= treasury)
			newState.board[base.position] = base.field.copy(treasury = treasury - upkeep)
		else
			for (soldier in soldiers)
				newState.board[soldier.position] = AlysField(player, AlysPiece(AlysType.Grave))
	}
	return Result.success()
}

class AlysSasEnd(
		val playerArea: List<PositionedField<AlysField>>,
		val bases: List<PositionedField<AlysField>>,
		val player: Int,
		oldState: AlysState,
		newState: AlysState
) : StateActionState<AlysState>(oldState, newState) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction, newState: AlysState): Result<AlysSasEnd> {
			action as AlysEndTurnAction
			var nextPlayer = oldState.currentPlayer + 1
			if (nextPlayer > oldState.playerCount)
				nextPlayer = 1
			val playerArea = oldState.board.positionedFields()
					.filter { it.field?.player == nextPlayer }
					.map { PositionedField(it.position, it.field as AlysField) }
			val bases = playerArea.filter { it.field.treasury != null }
			return Success(AlysSasEnd(playerArea, bases, nextPlayer, oldState, newState))
		}
	}
}

class AlysSasBuild(
		val treasury: Int,
		val type: AlysType,
		base: AlysSasStandard) : AlysSasStandard(base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction, newState: AlysState): Result<AlysSasBuild> {
			action as AlysCreateAction
			val base = AlysSasStandard.readyAction(oldState, action.origin, action.destination, newState).onFailure {
				return Failure(it.error)
			}
			val treasury = base.origin.field.treasury
					?: return Failure("origin isn't a base")
			return Success(AlysSasBuild(treasury, action.type, base))
		}
	}
}

class AlysSasHire(
		override val piece: AlysPiece,
		val treasury: Int,
		base: AlysSasStandard) : AlysSasMove(piece, base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction, newState: AlysState): Result<AlysSasHire> {
			action as AlysCreateAction
			val base = AlysSasStandard.readyAction(oldState, action.origin, action.destination, newState).onFailure {
				return Failure(it.error)
			}
			val treasury = base.origin.field.treasury
					?: return Failure("origin isn't a base")
			return Success(AlysSasHire(AlysPiece(AlysType.Soldier), treasury, base))
		}
	}
}

open class AlysSasMove(
		open val piece: AlysPiece,
		base: AlysSasStandard) : AlysSasStandard(base) {
	companion object {
		fun readyAction(oldState: AlysState, action: AlysAction, newState: AlysState): Result<AlysSasMove> {
			action as AlysMoveAction
			val base = AlysSasStandard.readyAction(oldState, action.origin, action.destination, newState).onFailure {
				return Failure(it.error)
			}
			val piece = base.origin.field.piece
					?: return Failure("origin doesn't have a piece")
			return Success(AlysSasMove(piece, base))
		}
	}
}

open class AlysSasStandard(
		val origin: PositionedField<AlysField>,
		val destination: PositionedField<AlysField>,
		oldState: AlysState,
		newState: AlysState
) : StateActionState<AlysState>(oldState, newState) {

	constructor(base: AlysSasStandard) : this(base.origin, base.destination, base.oldState, base.newState)

	companion object {
		fun readyAction(oldState: AlysState, origin: Position, destination: Position, newState: AlysState): Result<AlysSasStandard> {
			val originField = oldState.board[origin]
					?: return Failure("origin is empty")
			val destinationField = oldState.board[destination]
					?: return Failure("destination is empty")
			return Success(AlysSasStandard(PositionedField(origin, originField), PositionedField(destination, destinationField), oldState, newState))
		}
	}
}

data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int? = null)
data class AlysPiece(val type: AlysType, val strength: Int = 1, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier, Grave, Tree, CoastTree }

interface AlysAction
data class AlysMoveAction(val origin: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val type: AlysType, val origin: Position, val destination: Position) : AlysAction
class AlysEndTurnAction : AlysAction

