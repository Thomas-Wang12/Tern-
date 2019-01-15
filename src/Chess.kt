import kotlin.math.abs

data class ChessState(
        val board: SquareGrid<ChessPiece?> = SquareGrid(8, 8, { x, y ->
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
        val currentPlayer: ChessPlayer = ChessPlayer.White
) {
    fun isLegal(action: ChessAction): Boolean {
        val piece = board[action.source] ?: return false
        if (piece.player != currentPlayer)
            return false
        return piece.isLegal(board, action)
    }

    fun nextState(action: ChessAction, skipLegalCheck: Boolean = false): ChessState? {
        if (!skipLegalCheck)
            if (!isLegal(action))
                return null
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

    fun findWinner(): ChessPlayer? {
        return null
    }

    private fun moveCastlingRook(action: ChessAction){
        if(action.destination.x <4){
            board[action.destination.x + 1, action.source.y] = board[0, action.source.y]
            board[0, action.source.y] = null
        }
        else {
            board[action.destination.x - 1, action.source.y] = board[board.width - 1, action.source.y]
            board[board.width - 1, action.source.y] = null
        }
    }
}

data class ChessAction(val source: Position, val destination: Position)

enum class ChessPieceType { King, Queen, Bishop, Knight, Rook, Pawn }
enum class ChessPlayer { White, Black }