class Alys(override var state: AlysState = AlysState())
	: BoardGame<AlysState, AlysField?, AlysAction, Int>() {

}

data class AlysState(
		val width: Int = 5, val height: Int = 5,
		val playerCount: Int = 2,
		override val board: Grid<AlysField?> = Grid(width, height, { x, y ->
			AlysField((1..playerCount).random())
		}),
		override val currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<AlysField?, AlysAction, Int> {

	override fun isLegal(action: AlysAction): Boolean {
		return true
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
}

// TODO: fix names
data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int = 0)

data class AlysPiece(val type: AlysType, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier }
interface AlysAction {}
data class AlysMoveAction(val source: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val piece: AlysPiece, val destination: Position) : AlysAction