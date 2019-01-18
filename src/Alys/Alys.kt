import kotlin.random.Random

class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

}

data class AlysState(
		val width: Int = 10, val height: Int = 10,
		val playerCount: Int = 3,
		override val board: Grid<AlysField?> = Grid(width, height, { x, y ->
			AlysField((1..playerCount).random())
		}),
		override val currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<AlysField?, AlysAction, Int> {

	fun newGame(seed: Int = 1) : AlysState {
		val random = Random(seed)
		val newBoard = Grid<AlysField?>(width, height, { x, y ->
			AlysField((1..playerCount).random())
		})
		val state = AlysState(width, height, playerCount, newBoard, 1, players)
		val examinedArea = mutableListOf<Position>()
		for(position in newBoard.positions()){
			if(position in examinedArea)
				continue
			val area = state.connectedPositions(position)
			examinedArea.addAll(area)
			if(area.size < 2)
				continue
			val basePosition = area.random(random)
			newBoard[basePosition] = (newBoard[basePosition] as AlysField).copy(treasury = 10)
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
		return this.copy(board = newBoard)
	}

	override fun findWinner(): Int? {
		return null
	}

	fun isConnected(source: Position, destination: Position): Boolean {
		val area = connectedPositions(source)
		for(pos in destination.adjacentHexes())
			if(area.contains(pos))
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
enum class AlysType { Fort, Soldier }
interface AlysAction {}
data class AlysMoveAction(val source: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val type: AlysType, val source: Position, val destination: Position) : AlysAction
class AlysEndTurnAction : AlysAction