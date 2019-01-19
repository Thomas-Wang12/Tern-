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
		val examinedArea = mutableListOf<PositionedField<AlysField>>()
		for (position in newBoard.positions()) {
			if (examinedArea.any{it.position == position})
				continue
			val area = state.connectedPositions(position)
			examinedArea.addAll(area)
			if (area.size < 2)
				continue
			val base = area.random(random)
			newBoard[base.position] = base.field?.copy(treasury = area.filter { it.field?.piece == null }.size * 5)
		}
		return state
	}

	override fun isLegal(action: AlysAction): Boolean {
		if (action is AlysMoveAction)
			return moveIsLegal(action)
		if (action is AlysCreateAction)
			return createIsLegal(action)
		if (action is AlysEndTurnAction)
			return true
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
				newBoard[action.destination] = destination.copy(piece = destination.piece.copy(strength = destination.piece.strength + piece.strength))
			else ->
				newBoard[action.destination] = destination.copy()
		}
		newBoard[action.source] = (newBoard[action.source] as AlysField).copy(piece = null)
		val newState = this.copy(board = newBoard)
		// consolidating money
		val area = newState.connectedPositions(action.destination)
		val bases = area.filter{it.field.treasury != null}
		val treasury = bases.sumBy { it.field.treasury ?: 0 }
		val biggestBase = bases.maxBy { it.field.treasury ?: 0 } as PositionedField<AlysField>
		for(base in bases)
			newBoard[base.position] = base.field.copy(treasury = null)
		newBoard[biggestBase.position] = biggestBase.field.copy(treasury = treasury)
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
		val basePositions = newBoard.positions().filter { newBoard[it]?.player == currentPlayer && newBoard[it]?.treasury != null }
		for(position in basePositions){
			val base = newBoard[position] as AlysField
			val treasury = (base.treasury as Int) + connectedPositions(position).size
			newBoard[position] = base.copy(treasury = treasury)
		}
		var nextPlayer = currentPlayer+1
		if(nextPlayer > playerCount){
			nextPlayer = 1
		}
		beginTurn(nextPlayer, newBoard)
		return this.copy(board = newBoard, currentPlayer = nextPlayer)
	}

	private fun beginTurn(player: Int, newBoard: Grid<AlysField?>) {
		val basePositions = newBoard.positions().filter { newBoard[it]?.player == player && newBoard[it]?.treasury != null }
		for(position in basePositions){
			val base = newBoard[position] as AlysField
			val treasury = (base.treasury as Int) + connectedPositions(position).size
			val soldiers = connectedPositions(position).filter { it.field.piece?.type == AlysType.Soldier }
			for(soldier in soldiers)
				newBoard[soldier.position] = soldier.field.copy(piece = soldier.field.piece?.copy(hasMoved = false))
			val upkeep = soldiers.map { upkeepFor(it.field.piece?.strength ?: 0) }.sum()
			if(upkeep <= treasury)
				newBoard[position] = base.copy(treasury = treasury - upkeep)
			else
				for(soldier in soldiers)
					newBoard[soldier.position] = AlysField(player, AlysPiece(AlysType.Grave))
		}
	}

	private fun upkeepFor(strength: Int): Int {
		return when(strength){
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
		return connected.map{ PositionedField(it, board[it] as AlysField) }
	}
}

data class AlysField(val player: Int, val piece: AlysPiece? = null, val treasury: Int? = null)
data class AlysPiece(val type: AlysType, val strength: Int = 1, val hasMoved: Boolean = false)
enum class AlysType { Fort, Soldier, Grave, Tree, CoastTree }
interface AlysAction {}
data class AlysMoveAction(val source: Position, val destination: Position) : AlysAction
data class AlysCreateAction(val type: AlysType, val source: Position, val destination: Position) : AlysAction
class AlysEndTurnAction : AlysAction