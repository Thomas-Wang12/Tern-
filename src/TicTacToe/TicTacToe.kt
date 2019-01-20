class TicTacToe(override var state: TicTacToeState = TicTacToeState())
	: BoardGame<TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>() {

	companion object {
		val rules = listOf<Rule<TicTacToeState, TicTacToeAction>>(
				Rule("Can only place the current player's piece") { action, state ->
					state.currentPlayer == action.piece
				},
				Rule("Can only place pieces on empty fields") { action, state ->
					state.board[action.x, action.y] == null
				})
	}
}

data class TicTacToeState(
		override val board: Grid<TicTacToePiece?> = Grid(3, 3, { _, _ -> null }),
		override val currentPlayer: TicTacToePiece = TicTacToePiece.Cross,
		override val players: List<TicTacToePiece> = listOf(TicTacToePiece.Cross, TicTacToePiece.Circle)
) : BoardGameState<TicTacToePiece?, TicTacToeAction, TicTacToePiece> {

	override fun confirmLegality(action: TicTacToeAction): Result<Any?> {
		for(rule in TicTacToe.rules)
			if(!rule.isLegal(action, this))
				return Result.failure(rule.name)
		return Result.success()
	}

	override fun possibleActions(): List<TicTacToeAction> {
		val actions = mutableListOf<TicTacToeAction>()
		for (i in 0..2)
			for (j in 0..2)
				if (board[i, j] == null)
					actions.add(TicTacToeAction(currentPlayer, i, j))
		return actions.toList()
	}

	override fun nextState(action: TicTacToeAction): TicTacToeState {
		val newBoard = board.copy()
		newBoard[action.x, action.y] = action.piece
		return TicTacToeState(newBoard, if (currentPlayer == TicTacToePiece.Cross) TicTacToePiece.Circle else TicTacToePiece.Cross)
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

enum class TicTacToePiece { Cross, Circle }
data class TicTacToeAction(val piece: TicTacToePiece, val x: Int, val y: Int)