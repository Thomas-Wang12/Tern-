data class TicTacToeState(
        val board: SquareGrid<TicTacToeField> = SquareGrid(3, 3, { _, _ -> TicTacToeField.Empty }),
        val currentPlayer: TicTacToeField = TicTacToeField.Cross
) {

    fun isLegal(action: TicTacToeAction): Boolean {
        if (action.piece != currentPlayer)
            return false
        if (board[action.x, action.y] != TicTacToeField.Empty)
            return false
        return true
    }

    fun nextState(action: TicTacToeAction, skipLegalCheck: Boolean = false): TicTacToeState? {
        if (!skipLegalCheck)
            if (!isLegal(action))
                return null
        val newBoard = board.copy()
        newBoard[action.x, action.y] = action.piece
        return TicTacToeState(newBoard, if(currentPlayer == TicTacToeField.Cross) TicTacToeField.Circle else TicTacToeField.Cross)
    }
}

data class TicTacToeAction(val piece: TicTacToeField, val x: Int, val y: Int) {}

enum class TicTacToeField { Cross, Circle, Empty }