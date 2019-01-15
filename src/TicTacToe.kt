class TicTacToe ( override var state: TicTacToeState = TicTacToeState())
    : BoardGame<TicTacToeState, TicTacToeField, TicTacToeAction, TicTacToeField>() {

}

data class TicTacToeState(
        override val board: SquareGrid<TicTacToeField> = SquareGrid(3, 3, { _, _ -> TicTacToeField.Empty }),
        override val currentPlayer: TicTacToeField = TicTacToeField.Cross,
        override val players: List<TicTacToeField> = listOf(TicTacToeField.Cross, TicTacToeField.Circle)
) : BoardGameState<TicTacToeField, TicTacToeAction, TicTacToeField> {

    override fun isLegal(action: TicTacToeAction): Boolean {
        if (action.piece != currentPlayer)
            return false
        if (board[action.x, action.y] != TicTacToeField.Empty)
            return false
        return true
    }

    override fun nextState(action: TicTacToeAction): BoardGameState<TicTacToeField, TicTacToeAction, TicTacToeField> {
        val newBoard = board.copy()
        newBoard[action.x, action.y] = action.piece
        return TicTacToeState(newBoard, if (currentPlayer == TicTacToeField.Cross) TicTacToeField.Circle else TicTacToeField.Cross)
    }

    override fun findWinner(): TicTacToeField? {
        if(hasPieceWon(TicTacToeField.Cross))
            return TicTacToeField.Cross
        else if(hasPieceWon(TicTacToeField.Circle))
            return TicTacToeField.Circle
        return null
    }

    private fun hasPieceWon(piece: TicTacToeField): Boolean {
        if ((board[0, 0] == piece && board[0, 1] == piece && board[0, 2] == piece) ||
                (board[1, 0] == piece && board[1, 1] == piece && board[1, 2] == piece) ||
                (board[2, 0] == piece && board[2, 1] == piece && board[2, 2] == piece))
            return true
        if ((board[0, 0] == piece && board[1, 0] == piece && board[2, 0] == piece) ||
                (board[0, 1] == piece && board[1, 1] == piece && board[2, 1] == piece) ||
                (board[0, 2] == piece && board[1, 2] == piece && board[2, 2] == piece))
            return true
        if ((board[0, 0] == piece && board[1, 1] == piece && board[2, 2] == piece) ||
                (board[0, 2] == piece && board[1, 1] == piece && board[2, 0] == piece))
            return true
        return false
    }
}

data class TicTacToeAction(val piece: TicTacToeField, val x: Int, val y: Int)

enum class TicTacToeField { Cross, Circle, Empty }