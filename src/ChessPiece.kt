import kotlin.math.abs

/// Original code by Lasse
/// Ported from Java by Kristjan

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
        //The rest in this method is in case of castling
        if (hasMoved || isInCheck(board, action.source))
            return false
        if (player === ChessPlayer.White) {
            //If the castling is done with the rook to the left of the white king
            if (action.source.x - action.destination.x == 2 && action.source.y == action.destination.y) {
                val cornerPiece = board[0, 0]
                //Checks if the corner piece is a rook of the correct colour and it has not moved
                if (cornerPiece == null
                        || cornerPiece.player !== ChessPlayer.White
                        || cornerPiece.type !== ChessPieceType.Rook
                        || cornerPiece.hasMoved)
                    return false
                //Checks if there is any pieces between the king and the rook
                for (i in action.source.x - 1 downTo action.destination.x + 1)
                    if (board[i, 0] != null)
                        return false
                //Checks if the king would be in check if it was standing between current position and the destination
                if(!isIntermediatePositionSafe(board, action.source.copy(x = action.source.x - 1), action.source))
                    return false
                return true
            } else if (action.source.x - action.destination.x == -2 && action.source.y == action.destination.y) {
                val cornerPiece = board[board.width - 1, 0]
                //Checks if the corner piece is a rook of the correct colour and it has not moved
                if (cornerPiece == null
                        || cornerPiece.player !== ChessPlayer.White
                        || cornerPiece.type !== ChessPieceType.Rook
                        || cornerPiece.hasMoved)
                    return false
                //Checks if there is any pieces between the king and the rook
                for (i in action.source.x + 1 until action.destination.x)
                    if (board[i, 0] != null)
                        return false
                //Checks if the king would be in check if it was standing between current position and the destination
                if(!isIntermediatePositionSafe(board, action.source.copy(x = action.source.x + 1), action.source))
                    return false
                return true
            }//If the castling is done with the rook to the right of the white king
        } else {
            //If the castling is done with the rook to the left of the black king
            if (action.source.x - action.destination.x == 2 && action.source.y == action.destination.y) {
                val cornerPiece = board[0, board.height - 1]
                //Checks if the corner piece is a rook of the correct colour and it has not moved
                if (cornerPiece == null
                        || cornerPiece.player !== ChessPlayer.Black
                        || cornerPiece.type !== ChessPieceType.Rook
                        || cornerPiece.hasMoved)
                    return false
                //Checks if there is any pieces between the king and the rook
                for (i in action.source.x - 1 downTo action.destination.x + 1)
                    if (board[i, board.height - 1] != null)
                        return false
                //Checks if the king would be in check if it was standing between current position and the destination
                if(!isIntermediatePositionSafe(board, action.source.copy(x = action.source.x - 1), action.source))
                    return false
                return true
            } else if (action.source.x - action.destination.x == -2 && action.source.y == action.destination.y) {
                val cornerPiece = board[board.width - 1, board.height - 1]
                //Checks if the corner piece is a rook of the correct colour and it has not moved
                if (cornerPiece == null
                        || cornerPiece.player !== ChessPlayer.Black
                        || cornerPiece.type !== ChessPieceType.Rook
                        || cornerPiece.hasMoved)
                    return false
                //Checks if there is any pieces between the king and the rook
                for (i in action.source.x + 1 until action.destination.x)
                    if (board[i, board.height - 1] != null)
                        return false
                //Checks if the king would be in check if it was standing between current position and the destination
                if(!isIntermediatePositionSafe(board, action.source.copy(x = action.source.x + 1), action.source))
                    return false
                return true
            }//If the castling is done with the rook to the right of the black king
        }
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
        else if (action.source.y - action.destination.y < 0) {
            for (i in action.source.y + 1 until action.destination.y)
                if (board[action.source.x, i] != null)
                    return false
        }
        else if (action.source.y - action.destination.y > 0) {
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

    private fun isIntermediatePositionSafe(board: SquareGrid<ChessPiece?>, intermediatePosition: Position, originalPosition: Position): Boolean {
        board[intermediatePosition] = this
        board[originalPosition] = null
        if(isInCheck(board, intermediatePosition)){
            board[intermediatePosition] = null
            board[originalPosition] = this
            return false
        }
        board[intermediatePosition] = null
        board[originalPosition] = this
        return true
    }

    private fun isInCheck(board: SquareGrid<ChessPiece?>, position: Position): Boolean {
        //Checks if any enemy piece (except the king) can move to this kings position
        for (i in 0 until board.height) {
            for (j in 0 until board.width) {
                val piece = board[i,j]?: continue
                if (piece.player != player && piece.type != ChessPieceType.King) // bit of a hack
                    if(piece.isLegal(board, ChessAction(Position(i,j), position)))
                        return true
            }
        }
        return false
    }
}