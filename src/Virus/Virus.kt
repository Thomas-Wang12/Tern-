import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

class Virus(override var state: VirusState = VirusState())
	: BoardGame<VirusState, Int, VirusAction, Int>() {

	override fun copyState(): VirusState {
		return VirusState(state.width, state.height, state.playerCount, state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, _ -> true },
					{ oldState: VirusState, action: VirusAction, newState: VirusState ->
						Success(StandardStateActionState(oldState, action, newState))
					},
					listOf<ActionStep<VirusSas>>(
							VirusSas::originMustBeWithinBoard,
							VirusSas::originMustBeCurrentPlayer,
							VirusSas::destinationMustBeWithinBoard,
							VirusSas::destinationMustBeEmpty,
							VirusSas::mustNotMoveTooFar,
							VirusSas::movePiece,
							VirusSas::turnNeighbours,
							VirusSas::changePlayer
					)
			)
	)
}

private typealias VirusSas = StandardStateActionState<VirusState, VirusAction>

fun VirusSas.destinationMustBeWithinBoard() =
		Result.check("destination must be within board", oldState.board.isWithinBounds(action.destination))

fun VirusSas.originMustBeWithinBoard() =
		Result.check("origin must be within board", oldState.board.isWithinBounds(action.origin))

fun VirusSas.originMustBeCurrentPlayer() =
		Result.check("must move own piece", oldState.board[action.origin] == oldState.currentPlayer)

fun VirusSas.destinationMustBeEmpty() =
		Result.check("destination must be empty", oldState.board[action.destination] == 0)

fun VirusSas.mustNotMoveTooFar() =
		Result.check("must not move too far", abs(action.origin.x - action.destination.x) <= 2 && abs(action.origin.y - action.destination.y) <= 2)

fun VirusSas.movePiece(): Result<Any?> {
	if (abs(action.origin.x - action.destination.x) > 1 || abs(action.origin.y - action.destination.y) > 1)
		newState.board[action.origin.x, action.origin.y] = 0
	newState.board[action.destination.x, action.destination.y] = oldState.currentPlayer
	return Result.success()
}

fun VirusSas.turnNeighbours(): Result<Any?> {
	for (n in max(0, action.destination.x - 1)..min(oldState.width - 1, action.destination.x + 1)) {
		for (m in max(0, action.destination.y - 1)..min(oldState.height - 1, action.destination.y + 1)) {
			if (newState.board[n, m] != 0)
				newState.board[n, m] = oldState.currentPlayer
		}
	}
	return Result.success()
}

fun VirusSas.changePlayer(): Result<Any?> {
	val movablePlayers = newState.findMovablePlayers()
	var nextPlayer = oldState.currentPlayer + 1
	if (movablePlayers.none { it }) {
		nextPlayer = 0
	} else {
		if (nextPlayer > oldState.playerCount)
			nextPlayer = 1
		while (!movablePlayers[nextPlayer]) {
			nextPlayer++
			if (nextPlayer > oldState.playerCount)
				nextPlayer = 1
		}
	}
	newState.currentPlayer = nextPlayer
	return Result.success()
}

data class VirusState(
		val width: Int = 8, val height: Int = 8,
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
		override var currentPlayer: Int = 1,
		override val players: List<Int> = (1..playerCount).toList()
) : BoardGameState<Int, VirusAction, Int> {

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
						if (abs(action.origin.x - action.destination.x) > 1 ||
								abs(action.origin.y - action.destination.y) > 1) {
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

	override fun findWinner(): Int? {
		val pieces = MutableList(playerCount + 1) { 0 }
		for (field in board.fields)
			pieces[field]++

		val movablePlayers = findMovablePlayers()
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

	fun findMovablePlayers(): List<Boolean> {
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

data class VirusAction(val origin: Position, val destination: Position)
