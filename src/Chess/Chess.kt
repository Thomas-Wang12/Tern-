import kotlin.math.abs

class Chess(override var state: ChessState = ChessState())
	: BoardGame<ChessState, ChessPiece?, ChessAction, ChessPlayer>() {

	override fun copyState(): ChessState {
		return ChessState(state.board.copy(), state.currentPlayer, state.players)
	}

}

data class ChessState(
		override val board: Grid<ChessPiece?> = Grid(8, 8, { x, y ->
			when (y) {
				0 -> when (x) {
					0 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.White)
					1 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.White)
					2 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.White)
					3 -> ChessPiece(ChessPieceType.Queen, ChessPlayer.White)
					4 -> ChessPiece(ChessPieceType.King, ChessPlayer.White)
					5 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.White)
					6 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.White)
					7 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.White)
					else -> null
				}
				1 -> ChessPiece(ChessPieceType.Pawn, ChessPlayer.White)
				6 -> ChessPiece(ChessPieceType.Pawn, ChessPlayer.Black)
				7 -> when (x) {
					0 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.Black)
					1 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.Black)
					2 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.Black)
					3 -> ChessPiece(ChessPieceType.Queen, ChessPlayer.Black)
					4 -> ChessPiece(ChessPieceType.King, ChessPlayer.Black)
					5 -> ChessPiece(ChessPieceType.Bishop, ChessPlayer.Black)
					6 -> ChessPiece(ChessPieceType.Knight, ChessPlayer.Black)
					7 -> ChessPiece(ChessPieceType.Rook, ChessPlayer.Black)
					else -> null
				}
				else -> null
			}
		}),
		override var currentPlayer: ChessPlayer = ChessPlayer.White,
		override val players: List<ChessPlayer> = listOf(ChessPlayer.White, ChessPlayer.Black)
) : BoardGameState<ChessPiece?, ChessAction, ChessPlayer> {

	override fun confirmLegality(action: ChessAction): Result<Any?> {
		val piece = board[action.source] ?: return Result.failure("Couldn't find piece")
		if (piece.player != currentPlayer)
			return Result.failure("Can only move own pieces")
		val enemy = board[action.destination]
		if (enemy?.player == currentPlayer)
			return Result.failure("Cannot take own pieces")
		if(!piece.isLegal(board, action))
			return Result.failure("Piece cannot move there")
		val newState = nextState(action)
		val index = newState.board.fields.indexOfFirst { it?.type == ChessPieceType.King && it.player == currentPlayer }
		val position = Position(index % 8, index / 8)
		val king = newState.board[position] as ChessPiece
		return if(king.isInCheck(newState.board, position))
			Result.failure("Cannot make a move that would leave the king in check")
		else
			Result.success()
	}

	override fun possibleActions(): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in 0 until 8) {
			for (j in 0 until 8) {
				val piece = board[i,j]
				if(piece?.player != currentPlayer)
					continue
				actions.addAll(piece.possibleMoves(board, Position(i, j)))
			}
		}
		return actions.filter { confirmLegality(it) is Success }
	}

	override fun nextState(action: ChessAction): ChessState {
		val newBoard = board.copy()
		var newPiece = board[action.source]?.copy(hasMoved = true) as ChessPiece
		if (newPiece.type == ChessPieceType.Pawn) {
			if ((action.destination.y == 0 && newPiece.player == ChessPlayer.Black) ||
					(action.destination.y == board.height - 1 && newPiece.player == ChessPlayer.White))
				newPiece = newPiece.copy(type = ChessPieceType.Queen)
		}
		if (newPiece.type == ChessPieceType.King && abs(action.source.x - action.destination.x) == 2) {
			moveCastlingRook(action)
		}
		newBoard[action.destination] = newPiece
		newBoard[action.source] = null
		return ChessState(newBoard, if (currentPlayer == ChessPlayer.White) ChessPlayer.Black else ChessPlayer.White)
	}

	override fun findWinner(): ChessPlayer? {
		for (i in 0 until 8) {
			for (j in 0 until 8) {
				val piece = board[i,j]
				if(piece?.player != currentPlayer)
					continue
				if(piece.possibleMoves(board, Position(i, j)).any { confirmLegality(it) is Success })
					return null
			}
		}
		return if(currentPlayer == ChessPlayer.Black) ChessPlayer.White else ChessPlayer.Black
	}

	private fun moveCastlingRook(action: ChessAction) {
		if (action.destination.x < 4) {
			board[action.destination.x + 1, action.source.y] = board[0, action.source.y]
			board[0, action.source.y] = null
		} else {
			board[action.destination.x - 1, action.source.y] = board[board.width - 1, action.source.y]
			board[board.width - 1, action.source.y] = null
		}
	}
}

data class ChessAction(val source: Position, val destination: Position)

enum class ChessPieceType { King, Queen, Bishop, Knight, Rook, Pawn }
enum class ChessPlayer { White, Black }