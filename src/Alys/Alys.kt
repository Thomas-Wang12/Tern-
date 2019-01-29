import kotlin.math.min
import kotlin.random.Random

class Alys(override var state: AlysState = AlysState())
	: AlysBoardGame<AlysState, AlysField?, AlysAction, Int>() {

	companion object {
		fun priceOf(type: AlysType): Int {
			return when (type) {
				AlysType.Soldier -> 10
				AlysType.Fort -> 15
				else -> 0
			}
		}

		val commonRules = listOf<AlysRule<WithOriginAndDestination>>(
				AlysRule("Cannot place piece outside board") { action, state, _ ->
					state.board.isWithinBounds(action.origin) && state.board.isWithinBounds(action.destination)
				},
				AlysRule("Destination and origin cannot be the same place") { action, _, _ ->
					action.origin != action.destination
				},
				AlysRule("Must move from a field") rule@{ action, state, info ->
					info.originField = state.board[action.origin] ?: return@rule false
					info.originPiece = info.originField?.piece
					return@rule true
				},
				AlysRule("Must move to a field") rule@{ action, state, info ->
					info.destinationField = state.board[action.destination] ?: return@rule false
					info.destinationPiece = info.destinationField?.piece
					return@rule true
				},
				AlysRule("Origin must belong to current player") { _, state, info ->
					info.originField?.player == state.currentPlayer
				},
				AlysRule("Can only move pieces within or next to its area") rule@{ action, state, _ ->
					val originArea = AlysState.connectedPositions(action.origin, state.board)
					val allowedPositions = mutableListOf<Position>()
					for (place in originArea)
						allowedPositions.addAll(place.position.adjacentHexes())
					allowedPositions.addAll(originArea.map { it.position })
					return@rule action.destination in allowedPositions
				})

		val moveRules = listOf<AlysRule<AlysMoveAction>>(
				AlysRule("Must have a piece to move") rule@{ _, _, info ->
					info.originPiece != null
				},
				AlysRule("Cannot move a piece more than once per turn") rule@{ _, _, info ->
					info.originPiece?.hasMoved == false
				},
				AlysRule("Can only move soldiers") { _, _, info ->
					info.originPiece?.type == AlysType.Soldier
				},
				AlysRule("Cannot move onto own forts or bases") { _, state, info ->
					state.currentPlayer != info.destinationField?.player ||
							info.destinationField?.piece?.type != AlysType.Fort &&
							info.destinationField?.treasury == null
				},
				AlysRule("Cannot move onto own fully upgraded soldiers") rule@{ _, state, info ->
					val piece = info.destinationPiece ?: return@rule true
					state.currentPlayer != info.destinationField?.player ||
							piece.type != AlysType.Soldier ||
							(piece.type == AlysType.Soldier &&
									piece.strength < 4)
				},
				AlysRule("Must be stronger than nearby pieces") rule@{ action, state, info ->
					val destinationField = info.destinationField ?: return@rule false
					if (destinationField.player == state.currentPlayer) return@rule true
					val strength = info.originPiece?.strength ?: return@rule false
					if (strength <= state.totalDefenseOf(PositionedField(action.destination, destinationField)))
						return@rule false
					return@rule true
				})

		val createRules = listOf<AlysRule<AlysCreateAction>>(
				AlysRule("Must have a base at origin") { _, _, info ->
					info.originField?.treasury != null
				},
				AlysRule("Must be able to afford the piece") { action, _, info ->
					Alys.priceOf(action.type) <= (info.originField?.treasury ?: 0)
				},
				AlysRule("Fort must be placed on a connected empty owned field") rule@{ action, state, info ->
					if (action.type != AlysType.Fort)
						return@rule true
					return@rule state.isConnected(action.origin, action.destination) && info.destinationField?.player == state.currentPlayer
				})
	}

	override val actionTypes = listOf<ActionType<AlysState, AlysAction, *>>(
			ActionType("build fort",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Fort
					},
					AlysActionBuild.Companion::readyAction,
					listOf<(sas: StateActionState<AlysState, AlysActionBuild>) -> Result<Any?>>(
							::originMustBeCurrentPlayer,
							::destinationMustBeCurrentPlayer,
							::subtractMoney,
							::destinationMustBeEmpty,
							::placePiece
					)
			),
			ActionType("hire soldier",
					{ state, action ->
						action is AlysCreateAction && action.type == AlysType.Soldier
					},
					AlysActionBuild.Companion::readyAction,
					listOf<(sas: StateActionState<AlysState, AlysActionBuild>) -> Result<Any?>>(
							::originMustBeCurrentPlayer,
							::subtractMoney
					)
			),
			ActionType("move soldier",
					{ state, action ->
						action is AlysMoveAction
					},
					AlysActionBuild.Companion::readyAction,
					listOf<(sas: StateActionState<AlysState, AlysActionBuild>) -> Result<Any?>>(
							::originMustBeCurrentPlayer,
							::originMustHaveSoldier,
							::
					)
			)
	)

	fun newGame(width: Int = 15, height: Int = 15, seed: Int = 1) {
		val creator = AlysBoardCreator(width, height, seed)
		creator.generateLand()
		creator.fillBoard(players.size)
		this.state = AlysState(width, height, players.size, creator.board, 1, (1..players.size).toList())
	}
}

fun <T : AlysActionStandard> originMustBeCurrentPlayer(sas: StateActionState<AlysState, T>): Result<Any?> {
	if (sas.action.origin.field.player != sas.oldState.currentPlayer)
		return Failure("Must player bla")
	return Result.success()
}

fun <T : AlysActionStandard> destinationMustBeCurrentPlayer(sas: StateActionState<AlysState, T>): Result<Any?> {
	if (sas.action.destination.field.player != sas.oldState.currentPlayer)
		return Failure("Must player bla")
	return Result.success()
}

fun <T : AlysActionStandard> destinationMustBeEmpty(sas: StateActionState<AlysState, T>): Result<Any?> {
	if (sas.action.destination.field.piece != null || sas.action.destination.field.treasury != null )
		return Failure("Must player bla")
	return Result.success()
}

fun subtractMoney(sas: StateActionState<AlysState, AlysActionBuild>): Result<Any?> {
	if (sas.action.treasury < Alys.priceOf(sas.action.type))
		return Failure("Must money bla")
	sas.newState.board[sas.action.origin.position] = sas.action.origin.field.copy(
			treasury = sas.action.treasury - Alys.priceOf(sas.action.type))
	return Result.success()
}

fun placePiece(sas: StateActionState<AlysState, AlysActionBuild>): Result<Any?> {
	sas.newState.board[sas.action.destination.position] = sas.action.destination.field.copy(
			piece = AlysPiece(sas.action.type))
	return Result.success()
}

class AlysActionBuild(
		val treasury: Int,
		val type: AlysType,
		base: AlysActionStandard) : AlysActionStandard(base.origin, base.destination) {
	companion object {
		fun readyAction(state: AlysState, action: AlysAction): Result<AlysActionBuild> {
			action as AlysCreateAction
			val base = AlysActionStandard.readyAction(state, action.origin, action.destination).onFailure {
				return Failure(it.error)
			}
			val treasury = base.origin.field.treasury
					?: return Failure("ads")
			return Success(AlysActionBuild(treasury, action.type, base))
		}
	}
}

open class AlysActionStandard(
		val origin: PositionedField<AlysField>,
		val destination: PositionedField<AlysField>
) {
	companion object {
		fun readyAction(state: AlysState, origin: Position, destination: Position): Result<AlysActionStandard> {
			val originField = state.board[origin]
					?: return Failure("ads")
			val destinationField = state.board[destination]
					?: return Failure("ads")
			return Success(AlysActionStandard(PositionedField(origin, originField), PositionedField(destination, destinationField)))
		}
	}
}

data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int? = null)
data class AlysPiece(val type: AlysType, val strength: Int = 1, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier, Grave, Tree, CoastTree }
interface AlysAction
interface WithOriginAndDestination : AlysAction {
	val origin: Position
	val destination: Position
}

data class AlysMoveAction(override val origin: Position, override val destination: Position) : AlysAction, WithOriginAndDestination
data class AlysCreateAction(val type: AlysType, override val origin: Position, override val destination: Position) : AlysAction, WithOriginAndDestination
class AlysEndTurnAction : AlysAction
data class AlysRule<A : AlysAction>(val description: String, val isLegal: (A, AlysState, AlysActionInfo) -> Boolean)
data class AlysActionInfo(
		var originField: AlysField? = null,
		var destinationField: AlysField? = null,
		var originPiece: AlysPiece? = null,
		var destinationPiece: AlysPiece? = null)
