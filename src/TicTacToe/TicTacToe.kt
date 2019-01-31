class TicTacToe(override var state: TicTacToeState = TicTacToeState())
	: BoardGame<TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>() {

	override fun copyState(): TicTacToeState {
		return TicTacToeState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("place piece",
					{ _, _ -> true },
					{ oldState: TicTacToeState, action: TicTacToeAction, newState: TicTacToeState ->
						Success(StandardStateActionState(oldState, action, newState))
					},
					listOf<ActionStep<TicTacToeSas>>(
							TicTacToeSas::mustPlaceOwnPiece,
							TicTacToeSas::placePiece,
							TicTacToeSas::switchPlayer
					)
			)
	)
}

private typealias TicTacToeSas = StandardStateActionState<TicTacToeState, TicTacToeAction>

fun TicTacToeSas.mustPlaceOwnPiece() =
		Result.check("must place own piece", action.piece == oldState.currentPlayer)

fun TicTacToeSas.placePiece(): Result<Any?> {
	if (oldState.board[action.x, action.y] != null)
		Failure<Any?>("must place pieces on empty fields")
	newState.board[action.x, action.y] = action.piece
	return Result.success()
}

fun TicTacToeSas.switchPlayer(): Result<Any?> {
	newState.currentPlayer = if (oldState.currentPlayer == TicTacToePiece.Cross) TicTacToePiece.Circle else TicTacToePiece.Cross
	return Result.success()
}

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

enum class TicTacToePiece { Cross, Circle }
data class TicTacToeAction(val piece: TicTacToePiece, val x: Int, val y: Int)