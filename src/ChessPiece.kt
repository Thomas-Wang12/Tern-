import kotlin.math.abs

data class ChessPiece(val type: ChessPieceType, val player: ChessPlayer, val hasMoved: Boolean = false) {
    fun isLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        return when (type) {
            ChessPieceType.King -> isKingMoveLegal(board, action)
            ChessPieceType.Queen -> isQueenMoveLegal(board, action)
            ChessPieceType.Bishop -> isBishopMoveLegal(board, action)
            ChessPieceType.Knight -> isKnightMoveLegal(board, action)
            ChessPieceType.Rook -> isRookMoveLegal(board, action)
            ChessPieceType.Pawn -> isPawnMoveLegal(board, action)
        }
    }

    private fun isKingMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        //Checks if the step size is exactly one
        if (abs(action.source.x - action.destination.x) <= 1 && abs(action.source.y - action.destination.y) <= 1)
            return true
        // TODO: castling
        return false
    }

    private fun isQueenMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        if (isBishopMoveLegal(board, action) || isRookMoveLegal(board, action))
            return true
        return false
    }

    private fun isBishopMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        //Checks if the destination is on any of the same diagonally lines this piece
        if (abs(action.source.x - action.destination.x) != abs(action.source.y - action.destination.y))
            return false
        //Checks which direction it's moving and then checks for blocking pieces
        if ((action.source.x - action.destination.x) > 0 && (action.source.y - action.destination.y) > 0) {
            var tilesBetween = Position(action.source.x - 1, action.source.y - 1)
            while (tilesBetween != action.destination) {
                if (board[tilesBetween] != null)
                    return false
                tilesBetween = Position(tilesBetween.x - 1, tilesBetween.y - 1)
            }
        } else if ((action.source.x - action.destination.x) > 0 && (action.source.y - action.destination.y) < 0) {
            var tilesBetween = Position(action.source.x - 1, action.source.y + 1)
            while (tilesBetween != action.destination) {
                if (board[tilesBetween] != null)
                    return false
                tilesBetween = Position(tilesBetween.x - 1, tilesBetween.y + 1)
            }
        } else if ((action.source.x - action.destination.x) < 0 && (action.source.y - action.destination.y) < 0) {
            var tilesBetween = Position(action.source.x + 1, action.source.y + 1)
            while (tilesBetween != action.destination) {
                if (board[tilesBetween] != null)
                    return false
                tilesBetween = Position(tilesBetween.x + 1, tilesBetween.y + 1)
            }
        } else if ((action.source.x - action.destination.x) < 0 && (action.source.y - action.destination.y) > 0) {
            var tilesBetween = Position(action.source.x + 1, action.source.y - 1)
            while (tilesBetween != action.destination) {
                if (board[tilesBetween] != null)
                    return false
                tilesBetween = Position(tilesBetween.x + 1, tilesBetween.y - 1)
            }
        }
        return true
    }

    private fun isKnightMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        if ((abs(action.source.x - action.destination.x) == 2 &&
                        abs(action.source.y - action.destination.y) == 1) ||
                (abs(action.source.x - action.destination.x) == 1 &&
                        abs(action.source.y - action.destination.y) == 2))
            return true
        return false
    }

    private fun isRookMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        //Checks if the destination is on the same horisontal or vertical axis
        if (!(action.source.x == action.destination.x || action.source.y == action.destination.y))
            return false
        //Checks which direction it's moving and then checks for blocking pieces
        if (action.source.x - action.destination.x < 0) {
            for (i in action.source.x + 1 until action.destination.x)
                if (board[i, action.source.y] != null)
                    return false
        }
        else if (action.source.x - action.destination.x > 0) {
            for (i in action.source.x - 1 downTo action.destination.x + 1)
                if (board[i, action.source.y] != null)
                    return false
        }
        else if (action.source.x - action.destination.x < 0) {
            for (i in action.source.y + 1 until action.destination.y)
                if (board[action.source.x, i] != null)
                    return false
        }
        else if (action.source.x - action.destination.x > 0) {
            for (i in action.source.y - 1 downTo action.destination.y + 1)
                if (board[action.source.x, i] != null)
                    return false
        }
        return true
    }

    private fun isPawnMoveLegal(board: SquareGrid<ChessPiece?>, action: ChessAction): Boolean {
        //Checks whether the pawn should move upward or downward
        val stepDirection = if (player == ChessPlayer.White) 1 else -1
        //Checks if it can move one step forward
        if (action.source.x == action.destination.x && action.source.y + stepDirection == action.destination.y)
            if (board[action.destination] == null)
                return true
        //Checks if it can move diagonally
        if (abs(action.source.x - action.destination.x) == 1 && action.source.y + stepDirection == action.destination.y)
            if (board[action.destination] != null)
                return true
        //Checks if it can move two steps from spawn
        if (!hasMoved) {
            if (action.source.x == action.destination.x && action.source.y + (2 * stepDirection) == action.destination.y) {
                val tileBetween = Position(action.source.x, action.source.y + stepDirection)
                if (board[action.destination] == null && board[tileBetween] == null)
                    return true
            }
            //TODO - en passant
        }
        return false
    }
}