data class VirusState(
        val width: Int = 5, val height: Int = 5,
        val playerCount: Int = 2,
        val board: SquareGrid<Int> = SquareGrid(width, height, { x, y ->
            if(x == 0 && y == 0){
                when(playerCount){
                    2 -> 1
                    3 -> 1
                    4 -> 1
                    else -> 1
                }
            }
            else if(x == 0 && y == height - 1){
                when(playerCount){
                    2 -> 2
                    3 -> 2
                    4 -> 2
                    else -> 0
                }
            }
            else if(x == height - 1 && y == 0){
                when(playerCount){
                    2 -> 1
                    3 -> 3
                    4 -> 3
                    else -> 0
                }
            }
            else if(x == height - 1 && y == height - 1){
                when(playerCount){
                    2 -> 2
                    3 -> 0
                    4 -> 4
                    else -> 0
                }
            }
            else 0
        }),
        val currentPlayer: Int = 1
) {
    fun isLegal(action: VirusAction): Boolean {
        if (action.piece != currentPlayer)
            return false
        // TODO: more checks
        return true
    }

    fun nextState(action: VirusAction, skipLegalCheck: Boolean = false): VirusState? {
        if (!skipLegalCheck)
            if (!isLegal(action))
                return null
        val newBoard = board.copy()
        newBoard[action.destination.x, action.destination.y] = action.piece
        return VirusState(board = newBoard, currentPlayer = currentPlayer + 1)
    }

    fun findWinner(): Int? {
        val counts = MutableList(playerCount) { 0 }
        for(field in board.fields)
            counts[field]++
        return null
    }
}

data class VirusAction(val piece: Int, val source: Position, val destination: Position)
