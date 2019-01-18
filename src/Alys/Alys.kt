import kotlin.random.Random

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

}

data class AlysState(
		val width: Int = 5, val height: Int = 5,
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
		val examinedArea = mutableListOf<Position>()
		for (position in newBoard.positions()) {
			if (position in examinedArea)
				continue
			val area = state.connectedPositions(position)
			examinedArea.addAll(area)
			if (area.size < 2)
				continue
			val basePosition = area.random(random)
			newBoard[basePosition] = (newBoard[basePosition] as AlysField)
					.copy(treasury = area.filter { (newBoard[it] as AlysField).piece == null }.size * 5)
		}
		return state
	}

	override fun isLegal(action: AlysAction): Boolean {
		if (action is AlysMoveAction)
			return moveIsLegal(action)
		if (action is AlysCreateAction)
			return createIsLegal(action)
		return false
	}

	private fun moveIsLegal(action: AlysMoveAction): Boolean {
		return true
	}

	private fun createIsLegal(action: AlysCreateAction): Boolean {
		val base = board[action.source] ?: return false
		if (base.player != currentPlayer)
			return false
		val treasury = base.treasury ?: return false
		if (action.type == AlysType.Fort && treasury >= 15)
			return isConnected(action.source, action.destination) && board[action.destination]?.player == currentPlayer
		if (action.type == AlysType.Soldier && treasury >= 10)
			return moveIsLegal(AlysMoveAction(action.source, action.destination))
		return false
	}

	override fun possibleActions(): List<AlysAction> {
		val actions = mutableListOf<AlysAction>()
		return actions.toList()
	}

	override fun nextState(action: AlysAction): BoardGameState<AlysField?, AlysAction, Int> {
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
		// modifying destination
		when {
			destination.player != currentPlayer ->
				newBoard[action.destination] = destination.copy(player = currentPlayer, piece = piece.copy(hasMoved = true), treasury = null)
			destination.piece?.type == AlysType.Soldier ->
				newBoard[action.destination] = destination.copy(piece = destination.piece.copy(strength = destination.piece.strength + 1))
			else ->
				newBoard[action.destination] = destination.copy(piece = piece.copy(hasMoved = true))
		}
		newBoard[action.source] = (newBoard[action.source] as AlysField).copy(piece = null)
		val newState = this.copy(board = newBoard)
		// consolidating money
		val area = newState.connectedPositions(action.destination)
		var firstBase: Position? = null
		for (i in 0 until area.size) {
			val treasury = newBoard[area[i]]?.treasury
			if (treasury != null) {
				if (firstBase == null)
					firstBase = area[i]
				else {
					val base = newBoard[firstBase] as AlysField
					newBoard[firstBase] = base.copy(treasury = (base.treasury as Int) + treasury)
					newBoard[area[i]] = (newBoard[area[i]] as AlysField).copy(treasury = null)
				}
			}
		}
		return newState
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
		return this
	}

	override fun findWinner(): Int? {
		return null
	}

	fun isConnected(source: Position, destination: Position): Boolean {
		val area = connectedPositions(source)
		for (pos in destination.adjacentHexes())
			if (area.contains(pos))
				return true
		return false
	}

	fun connectedPositions(source: Position): List<Position> {
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
		return connected
	}
}

data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int? = null)
data class AlysPiece(val type: AlysType, val strength: Int = 1, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier, Grave, Tree, CoastTree }
interface AlysAction {}
data class AlysMoveAction(val source: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val type: AlysType, val source: Position, val destination: Position) : AlysAction
class AlysEndTurnAction : AlysAction