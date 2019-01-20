import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

class Virus(override var state: VirusState = VirusState())
	: BoardGame<VirusState, Int, VirusAction, Int>() {

	companion object {
		val rules = listOf<Rule<VirusState, VirusAction>>(
				Rule("Cannot place piece outside board") { action, state ->
					state.board.isWithinBounds(action.source) && state.board.isWithinBounds(action.destination)
				},
				Rule("Can only place the current player's piece") { action, state ->
					state.board[action.source.x, action.source.y] == state.currentPlayer
				},
				Rule("Can only place pieces on empty fields") { action, state ->
					state.board[action.destination.x, action.destination.y] != 0
				},
				Rule("Cannot move farther than two squares") { action, state ->
					abs(action.source.x - action.destination.x) > 2 || abs(action.source.y - action.destination.y) <= 2
				})
	}
}

data class VirusState(
		val width: Int = 5, val height: Int = 5,
		val playerCount: Int = 2,
		override val board: Grid<Int> = Grid(width, height, { x, y ->
			if (x == 0 && y == 0) {
				when (playerCount) {
					2 -> 1
					3 -> 1
					4 -> 1
					else -> 1
				}
			} else if (x == 0 && y == height - 1) {
				when (playerCount) {
					2 -> 2
					3 -> 2
					4 -> 2
					else -> 0
				}
			} else if (x == height - 1 && y == 0) {
				when (playerCount) {
					2 -> 2
					3 -> 3
					4 -> 3
					else -> 0
				}
			} else if (x == height - 1 && y == height - 1) {
				when (playerCount) {
					2 -> 1
					3 -> 0
					4 -> 4
					else -> 0
				}
			} else 0
		}),
		override val currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<Int, VirusAction, Int> {

	override fun confirmLegality(action: VirusAction): Result<Any?> {
		for(rule in Virus.rules)
			if(!rule.isLegal(action, this))
				return Result.failure(rule.name)
		return Result.success()
	}

	override fun possibleActions(): List<VirusAction> {
		val actions = mutableListOf<VirusAction>()
		for (i in 0 until width) {
			for (j in 0 until height) {
				if (board[i, j] != 0)
					continue

				var exists = false
				for (n in max(0, i - 2) until min(width, i + 3)) {
					for (m in max(0, j - 2) until min(height, j + 3)) {
						if (board[n, m] != currentPlayer)
							continue
						val action = VirusAction(Position(n, m), Position(i, j))
						if (abs(action.source.x - action.destination.x) > 1 ||
								abs(action.source.y - action.destination.y) > 1) {
							actions.add(action)
						} else if (!exists) {
							actions.add(action)
							exists = true
						}
					}
				}
			}
		}
		return actions.toList()
	}

	override fun nextState(action: VirusAction): VirusState {
		val newBoard = board.copy()
		if (abs(action.source.x - action.destination.x) > 1 || abs(action.source.y - action.destination.y) > 1)
			newBoard[action.source.x, action.source.y] = 0
		newBoard[action.destination.x, action.destination.y] = currentPlayer
		switchSurroundings(action.destination, newBoard)
		val movablePlayers = findMovablePlayers(newBoard)
		var nextPlayer = currentPlayer + 1
		if (movablePlayers.filter { it }.isEmpty()) {
			nextPlayer = 0
		} else {
			if (nextPlayer > playerCount)
				nextPlayer = 1
			while (!movablePlayers[nextPlayer]) {
				nextPlayer++
				if (nextPlayer > playerCount)
					nextPlayer = 1
			}
		}
		return VirusState(board = newBoard, currentPlayer = nextPlayer)
	}

	override fun findWinner(): Int? {
		val pieces = MutableList(playerCount + 1) { 0 }
		for (field in board.fields)
			pieces[field]++

		val movablePlayers = findMovablePlayers(board)
		if (movablePlayers.filter { it }.size > 1)
			return null

		val lastPlayer = movablePlayers.indexOfLast { it }
		if (lastPlayer > 0)
			pieces[lastPlayer] += pieces[0] // lægger de frie felter til den sidste spiller, der kan bevæge sig

		var max = 0
		var winner = 0
		for (i in 1..playerCount) {
			if (pieces[i] > max) {
				max = pieces[i]
				winner = i
			}
		}
		return winner
	}

	private fun findMovablePlayers(board: Grid<Int>): List<Boolean> {
		val movablePlayers = MutableList(playerCount + 1) { false }
		loop@ for (i in 0 until width) {
			for (j in 0 until height) {
				if (board[i, j] != 0)
					continue

				for (n in max(0, i - 2) until min(width, i + 3)) {
					for (m in max(0, j - 2) until min(height, j + 3)) {
						if (board[n, m] > 0)
							movablePlayers[board[n, m]] = true
						if (movablePlayers.filter { it }.size == playerCount) break@loop
					}
				}
			}
		}
		return movablePlayers
	}

	private fun switchSurroundings(position: Position, board: Grid<Int>) {
		for (n in max(0, position.x - 1)..min(width - 1, position.x + 1)) {
			for (m in max(0, position.y - 1)..min(height - 1, position.y + 1)) {
				if (board[n, m] != 0)
					board[n, m] = currentPlayer
			}
		}
	}
}

data class VirusAction(val source: Position, val destination: Position)
