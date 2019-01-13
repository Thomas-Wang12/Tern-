import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

data class VirusState(
        val width: Int = 5, val height: Int = 5,
        val playerCount: Int = 2,
        val board: SquareGrid<Int> = SquareGrid(width, height, { x, y ->
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
        val currentPlayer: Int = 1
) {
    fun isLegal(action: VirusAction): Boolean {
        if (!isWithinBoard(action.source) || !isWithinBoard(action.destination))
            return false
        if (board[action.source.x, action.source.y] != currentPlayer)
            return false
        if (board[action.destination.x, action.destination.y] != 0)
            return false
        if (abs(action.source.x - action.destination.x) > 2 || abs(action.source.y - action.destination.y) > 2)
            return false
        return true
    }

    fun nextState(action: VirusAction, skipLegalCheck: Boolean = false): VirusState? {
        if (!skipLegalCheck)
            if (!isLegal(action))
                return null
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

    fun findWinner(): Int? {
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

    private fun findMovablePlayers(board: SquareGrid<Int>): List<Boolean> {
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

    private fun isWithinBoard(position: Position): Boolean {
        if (position.x < 0 || position.y < 0)
            return false
        if (position.x >= width || position.y >= height)
            return false
        return true
    }

    private fun switchSurroundings(position: Position, board: SquareGrid<Int>) {
        for (n in max(0, position.x - 1)..min(width - 1, position.x + 1)) {
            for (m in max(0, position.y - 1)..min(height - 1, position.y + 1)) {
                if (board[n, m] != 0)
                    board[n, m] = currentPlayer
            }
        }
    }
}

data class VirusAction(val source: Position, val destination: Position)
