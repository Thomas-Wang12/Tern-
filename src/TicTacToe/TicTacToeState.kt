data class TicTacToeState(
		override val board: Grid<TicTacToePiece?> = Grid(3, 3, { _, _ -> null }),
		override var currentPlayer: TicTacToePiece = TicTacToePiece.Cross,
		override val players: List<TicTacToePiece> = listOf(TicTacToePiece.Cross, TicTacToePiece.Circle)
) : BoardGameState<TicTacToePiece?, TicTacToeAction, TicTacToePiece>, AIPlayable<TicTacToeAction> {

	override fun possibleActions(): List<TicTacToeAction> {
		val actions = mutableListOf<TicTacToeAction>()
		for (i in 0..2)
			for (j in 0..2)
				if (board[i, j] == null)
					actions.add(TicTacToeAction(currentPlayer, i, j))
		return actions.toList()
	}

	override fun findWinner(): TicTacToePiece? {
		if (hasPieceWon(TicTacToePiece.Cross))
			return TicTacToePiece.Cross
		else if (hasPieceWon(TicTacToePiece.Circle))
			return TicTacToePiece.Circle
		return null
	}

	private fun hasPieceWon(piece: TicTacToePiece): Boolean {
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
