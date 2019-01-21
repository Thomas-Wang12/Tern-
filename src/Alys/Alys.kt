import kotlin.math.min
import kotlin.random.Random

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

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
					val originArea = state.connectedPositions(action.origin)
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
				AlysRule("Cannot move onto own forts") { _, state, info ->
					state.currentPlayer != info.destinationField?.player ||
							info.destinationField?.piece?.type != AlysType.Fort
				},
				AlysRule("Cannot move onto own fully upgraded soldiers") rule@{ _, state, info ->
					val piece = info.destinationPiece ?: return@rule true
					state.currentPlayer != info.destinationField?.player ||
							piece.type == AlysType.Soldier ||
							piece.strength < 4
				},
				AlysRule("Must be stronger than nearby pieces") rule@{ action, state, info ->
					val destinationField = info.destinationField ?: return@rule false
					if (destinationField.player == state.currentPlayer) return@rule true
					val strength = info.originPiece?.strength ?: return@rule false
					var defense = state.defenseOf(destinationField)
					val defenses = action.destination.adjacentHexes()
							.filter { state.board.isWithinBounds(it) }
							.map { state.board[it] }
							.filter { it != null && it.player == destinationField.player }
							.map { if (it == null) 0 else state.defenseOf(it) }
					for (def in defenses)
						if (def > defense)
							defense = def
					if (strength <= defense)
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
}

data class AlysState(
		val width: Int = 10, val height: Int = 10,
		val playerCount: Int = 4,
		override val board: Grid<AlysField?> = Grid(width, height, { x, y ->
			AlysField((1..playerCount).random())
		}),
		override val currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<AlysField?, AlysAction, Int> {

	fun newGame(seed: Int = 1): AlysState {
		val random = Random(seed)
		val newBoard = Grid<AlysField?>(width, height, { x, y ->
			AlysField((1..playerCount).random())
		})
		val state = AlysState(width, height, playerCount, newBoard, 1, players)
		val examinedArea = mutableListOf<PositionedField<AlysField>>()
		for (position in newBoard.positions()) {
			if (examinedArea.any { it.position == position })
				continue
			val area = state.connectedPositions(position)
			examinedArea.addAll(area)
			if (area.size < 2)
				continue
			val base = area.random(random)
			newBoard[base.position] = base.field.copy(treasury = area.filter { it.field.piece == null }.size * 5)
		}
		return state
	}

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
		val area = newState.connectedPositions(mergePoint)
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
			val area = newState.connectedPositions(position)
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
			val treasury = (base.treasury as Int) + connectedPositions(position).size
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
			val area = connectedPositions(base.position)
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
		val area = connectedPositions(origin)
		for (pos in destination.adjacentHexes())
			if (area.any { it.position == pos })
				return true
		return false
	}

	fun connectedPositions(origin: Position): List<PositionedField<AlysField>> {
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
