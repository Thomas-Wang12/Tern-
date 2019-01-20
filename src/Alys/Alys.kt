import kotlin.math.min
import kotlin.random.Random

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>()

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
		/*
		for (rule in action.rules)
			if (!rule.isLegal(this))
				return Result.failure(rule.name)
		*/
		if (action is AlysMoveAction)
			return if(moveIsLegal(action)) Result.success() else Result.failure("can't")
		if (action is AlysCreateAction)
			return if(createIsLegal(action)) Result.success() else Result.failure("can't")
		if (action is AlysEndTurnAction)
			return Result.success()
		return Result.failure("can't")
	}

	private fun moveIsLegal(action: AlysMoveAction, ignorePiece: Boolean = false): Boolean {
		val sourceField = board[action.source] ?: return false
		val destinationField = board[action.destination] ?: return false
		val sourceArea = connectedPositions(action.source)
		val allowedPositions = mutableListOf<Position>()
		for (place in sourceArea)
			allowedPositions.addAll(place.position.adjacentHexes())
		allowedPositions.addAll(sourceArea.map { it.position })
		if (action.destination !in allowedPositions)
			return false
		if (!ignorePiece && sourceField.piece?.type != AlysType.Soldier)
			return false
		val strength = sourceField.piece?.strength ?: 1
		if (destinationField.player == currentPlayer) {
			if (destinationField.piece?.type == AlysType.Fort)
				return false
			if (destinationField.piece?.type == AlysType.Soldier && destinationField.piece.strength > 4)
				return false
			return true
		}
		var defense = defenseOf(destinationField)
		val defenses = action.destination.adjacentHexes()
				.filter { board.isWithinBounds(it) }
				.map { board[it] }
				.filter { it != null && it.player == destinationField.player }
				.map { if (it == null) 0 else defenseOf(it) }
		for (def in defenses)
			if (def > defense)
				defense = def
		if (strength <= defense)
			return false
		return true
	}

	private fun defenseOf(field: AlysField): Int {
		if (field.piece?.type == AlysType.Soldier)
			return min(field.piece.strength, 3)
		if (field.piece?.type == AlysType.Fort)
			return 2
		if (field.treasury != null)
			return 1
		return 0
	}

	private fun createIsLegal(action: AlysCreateAction): Boolean {
		val base = board[action.source] ?: return false
		if (base.player != currentPlayer)
			return false
		val treasury = base.treasury ?: return false
		if (action.type == AlysType.Fort && treasury >= 15)
			return isConnected(action.source, action.destination) && board[action.destination]?.player == currentPlayer
		if (action.type == AlysType.Soldier && treasury >= 10)
			return moveIsLegal(AlysMoveAction(action.source, action.destination), true)
		return false
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
		val piece = newBoard[action.source]?.piece ?: return this
		val destination = newBoard[action.destination] ?: return this
		val newState = this.copy(board = newBoard)
		// modifying destination
		when {
			destination.player != currentPlayer ->
				invadeField(action.source, action.destination, newState)
			destination.piece?.type == AlysType.Soldier ->
				newBoard[action.destination] = destination.copy(
						piece = destination.piece.copy(strength = min(4, destination.piece.strength + piece.strength))
				)
			else ->
				newBoard[action.destination] = destination.copy()
		}
		newBoard[action.source] = (newBoard[action.source] as AlysField).copy(piece = null)
		return newState
	}

	private fun invadeField(source: Position, destination: Position, newState: AlysState) {
		val piece = newState.board[source]?.piece as AlysPiece
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
			if (area.size == 1)
				continue
			if (area.any { it.field.treasury != null })
				continue
			val emptyArea = area.filter { it.field.piece?.type != AlysType.Soldier && it.field.piece?.type != AlysType.Fort }
			val newBase = if (emptyArea.isEmpty()) area.random() else emptyArea.random()
			newState.board[newBase.position] = AlysField(newBase.field.player, treasury = 0)
		}
	}

	private fun nextStateFrom(action: AlysCreateAction, newBoard: Grid<AlysField?>): AlysState {
		val source = newBoard[action.source] ?: return this
		if (action.type == AlysType.Soldier) {
			newBoard[action.source] = source.copy(treasury = (source.treasury as Int) - 10, piece = AlysPiece(AlysType.Soldier))
			return nextStateFrom(AlysMoveAction(action.source, action.destination), newBoard)
		} else if (action.type == AlysType.Fort) {
			newBoard[action.source] = source.copy(treasury = (source.treasury as Int) - 15)
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

	fun isConnected(source: Position, destination: Position): Boolean {
		val area = connectedPositions(source)
		for (pos in destination.adjacentHexes())
			if (area.any { it.position == pos })
				return true
		return false
	}

	fun connectedPositions(source: Position): List<PositionedField<AlysField>> {
		val base = board[source] ?: return listOf()
		val front = mutableListOf(source)
		val connected = mutableListOf(source)
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
interface AlysAction {
	val rules: List<Rule<AlysState, AlysAction>>
}

data class AlysMoveAction(val source: Position, val destination: Position) : AlysAction {
	override val rules = listOf<Rule<AlysState, AlysAction>>(
			Rule("Pieces can only be moved next to or within their area") { action, state ->
				true
			})
}

data class AlysCreateAction(val type: AlysType, val source: Position, val destination: Position) : AlysAction {
	override val rules = listOf(
			Rule<AlysState, AlysAction>("The area must be able to afford the piece") { action, state ->
				true
			})
}

class AlysEndTurnAction : AlysAction {
	override val rules = listOf<Rule<AlysState, AlysAction>>()
}

class Rule<S, A>(val name: String, val isLegal: (action: A, state: S) -> Boolean)