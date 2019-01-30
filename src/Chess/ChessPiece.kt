import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

/// Original code by Lasse
/// Ported from Java by Kristjan

data class ChessPiece(val type: ChessPieceType, val player: ChessPlayer, val hasMoved: Boolean = false) {
	fun isLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		return when (type) {
			ChessPieceType.King -> isKingMoveLegal(board, action)
			ChessPieceType.Queen -> isQueenMoveLegal(board, action)
			ChessPieceType.Bishop -> isBishopMoveLegal(board, action)
			ChessPieceType.Knight -> isKnightMoveLegal(board, action)
			ChessPieceType.Rook -> isRookMoveLegal(board, action)
			ChessPieceType.Pawn -> isPawnMoveLegal(board, action)
		}
	}

	private fun isKingMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		//Checks if the step size is exactly one
		if (abs(action.origin.x - action.destination.x) <= 1 && abs(action.origin.y - action.destination.y) <= 1)
			return true
		//The rest in this method is in case of castling
		if (hasMoved || isInCheck(board, action.origin))
			return false
		if (player === ChessPlayer.White) {
			//If the castling is done with the rook to the left of the white king
			if (action.origin.x - action.destination.x == 2 && action.origin.y == action.destination.y) {
				val cornerPiece = board[0, 0]
				//Checks if the corner piece is a rook of the correct colour and it has not moved
				if (cornerPiece == null
						|| cornerPiece.player !== ChessPlayer.White
						|| cornerPiece.type !== ChessPieceType.Rook
						|| cornerPiece.hasMoved)
					return false
				//Checks if there is any pieces between the king and the rook
				for (i in action.origin.x - 1 downTo action.destination.x + 1)
					if (board[i, 0] != null)
						return false
				//Checks if the king would be in check if it was standing between current position and the destination
				if (!isIntermediatePositionSafe(board, action.origin.copy(x = action.origin.x - 1), action.origin))
					return false
				return true
			} else if (action.origin.x - action.destination.x == -2 && action.origin.y == action.destination.y) {
				val cornerPiece = board[board.width - 1, 0]
				//Checks if the corner piece is a rook of the correct colour and it has not moved
				if (cornerPiece == null
						|| cornerPiece.player !== ChessPlayer.White
						|| cornerPiece.type !== ChessPieceType.Rook
						|| cornerPiece.hasMoved)
					return false
				//Checks if there is any pieces between the king and the rook
				for (i in action.origin.x + 1 until action.destination.x)
					if (board[i, 0] != null)
						return false
				//Checks if the king would be in check if it was standing between current position and the destination
				if (!isIntermediatePositionSafe(board, action.origin.copy(x = action.origin.x + 1), action.origin))
					return false
				return true
			}//If the castling is done with the rook to the right of the white king
		} else {
			//If the castling is done with the rook to the left of the black king
			if (action.origin.x - action.destination.x == 2 && action.origin.y == action.destination.y) {
				val cornerPiece = board[0, board.height - 1]
				//Checks if the corner piece is a rook of the correct colour and it has not moved
				if (cornerPiece == null
						|| cornerPiece.player !== ChessPlayer.Black
						|| cornerPiece.type !== ChessPieceType.Rook
						|| cornerPiece.hasMoved)
					return false
				//Checks if there is any pieces between the king and the rook
				for (i in action.origin.x - 1 downTo action.destination.x + 1)
					if (board[i, board.height - 1] != null)
						return false
				//Checks if the king would be in check if it was standing between current position and the destination
				if (!isIntermediatePositionSafe(board, action.origin.copy(x = action.origin.x - 1), action.origin))
					return false
				return true
			} else if (action.origin.x - action.destination.x == -2 && action.origin.y == action.destination.y) {
				val cornerPiece = board[board.width - 1, board.height - 1]
				//Checks if the corner piece is a rook of the correct colour and it has not moved
				if (cornerPiece == null
						|| cornerPiece.player !== ChessPlayer.Black
						|| cornerPiece.type !== ChessPieceType.Rook
						|| cornerPiece.hasMoved)
					return false
				//Checks if there is any pieces between the king and the rook
				for (i in action.origin.x + 1 until action.destination.x)
					if (board[i, board.height - 1] != null)
						return false
				//Checks if the king would be in check if it was standing between current position and the destination
				if (!isIntermediatePositionSafe(board, action.origin.copy(x = action.origin.x + 1), action.origin))
					return false
				return true
			}//If the castling is done with the rook to the right of the black king
		}
		return false
	}

	private fun isQueenMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		if (isBishopMoveLegal(board, action) || isRookMoveLegal(board, action))
			return true
		return false
	}

	private fun isBishopMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		//Checks if the destination is on any of the same diagonally lines this piece
		if (abs(action.origin.x - action.destination.x) != abs(action.origin.y - action.destination.y))
			return false
		//Checks which direction it's moving and then checks for blocking pieces
		if ((action.origin.x - action.destination.x) > 0 && (action.origin.y - action.destination.y) > 0) {
			var tilesBetween = Position(action.origin.x - 1, action.origin.y - 1)
			while (tilesBetween != action.destination) {
				if (board[tilesBetween] != null)
					return false
				tilesBetween = Position(tilesBetween.x - 1, tilesBetween.y - 1)
			}
		} else if ((action.origin.x - action.destination.x) > 0 && (action.origin.y - action.destination.y) < 0) {
			var tilesBetween = Position(action.origin.x - 1, action.origin.y + 1)
			while (tilesBetween != action.destination) {
				if (board[tilesBetween] != null)
					return false
				tilesBetween = Position(tilesBetween.x - 1, tilesBetween.y + 1)
			}
		} else if ((action.origin.x - action.destination.x) < 0 && (action.origin.y - action.destination.y) < 0) {
			var tilesBetween = Position(action.origin.x + 1, action.origin.y + 1)
			while (tilesBetween != action.destination) {
				if (board[tilesBetween] != null)
					return false
				tilesBetween = Position(tilesBetween.x + 1, tilesBetween.y + 1)
			}
		} else if ((action.origin.x - action.destination.x) < 0 && (action.origin.y - action.destination.y) > 0) {
			var tilesBetween = Position(action.origin.x + 1, action.origin.y - 1)
			while (tilesBetween != action.destination) {
				if (board[tilesBetween] != null)
					return false
				tilesBetween = Position(tilesBetween.x + 1, tilesBetween.y - 1)
			}
		}
		return true
	}

	private fun isKnightMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		if ((abs(action.origin.x - action.destination.x) == 2 &&
						abs(action.origin.y - action.destination.y) == 1) ||
				(abs(action.origin.x - action.destination.x) == 1 &&
						abs(action.origin.y - action.destination.y) == 2))
			return true
		return false
	}

	private fun isRookMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		//Checks if the destination is on the same horisontal or vertical axis
		if (!(action.origin.x == action.destination.x || action.origin.y == action.destination.y))
			return false
		//Checks which direction it's moving and then checks for blocking pieces
		if (action.origin.x - action.destination.x < 0) {
			for (i in action.origin.x + 1 until action.destination.x)
				if (board[i, action.origin.y] != null)
					return false
		} else if (action.origin.x - action.destination.x > 0) {
			for (i in action.origin.x - 1 downTo action.destination.x + 1)
				if (board[i, action.origin.y] != null)
					return false
		} else if (action.origin.y - action.destination.y < 0) {
			for (i in action.origin.y + 1 until action.destination.y)
				if (board[action.origin.x, i] != null)
					return false
		} else if (action.origin.y - action.destination.y > 0) {
			for (i in action.origin.y - 1 downTo action.destination.y + 1)
				if (board[action.origin.x, i] != null)
					return false
		}
		return true
	}

	private fun isPawnMoveLegal(board: Grid<ChessPiece?>, action: ChessAction): Boolean {
		//Checks whether the pawn should move upward or downward
		val stepDirection = if (player == ChessPlayer.White) 1 else -1
		//Checks if it can move one step forward
		if (action.origin.x == action.destination.x && action.origin.y + stepDirection == action.destination.y)
			if (board[action.destination] == null)
				return true
		//Checks if it can move diagonally
		if (abs(action.origin.x - action.destination.x) == 1 && action.origin.y + stepDirection == action.destination.y)
			if (board[action.destination] != null)
				return true
		//Checks if it can move two steps from spawn
		if (!hasMoved) {
			if (action.origin.x == action.destination.x && action.origin.y + (2 * stepDirection) == action.destination.y) {
				val tileBetween = Position(action.origin.x, action.origin.y + stepDirection)
				if (board[action.destination] == null && board[tileBetween] == null)
					return true
			}
			//TODO - en passant
		}
		return false
	}

	private fun isIntermediatePositionSafe(board: Grid<ChessPiece?>, intermediatePosition: Position, originalPosition: Position): Boolean {
		board[intermediatePosition] = this
		board[originalPosition] = null
		if (isInCheck(board, intermediatePosition)) {
			board[intermediatePosition] = null
			board[originalPosition] = this
			return false
		}
		board[intermediatePosition] = null
		board[originalPosition] = this
		return true
	}

	fun isInCheck(board: Grid<ChessPiece?>, position: Position): Boolean {
		//Checks if any enemy piece (except the king) can move to this kings position
		for (i in 0 until board.height) {
			for (j in 0 until board.width) {
				val piece = board[i, j] ?: continue
				if (piece.player != player && piece.type != ChessPieceType.King) // bit of a hack
					if (piece.isLegal(board, ChessAction(Position(i, j), position)))
						return true
			}
		}
		return false
	}

	fun possibleMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		return when (type) {
			ChessPieceType.King -> possibleKingMoves(board, position)
			ChessPieceType.Queen -> possibleQueenMoves(board, position)
			ChessPieceType.Bishop -> possibleBishopMoves(board, position)
			ChessPieceType.Knight -> possibleKnightMoves(board, position)
			ChessPieceType.Rook -> possibleRookMoves(board, position)
			ChessPieceType.Pawn -> possiblePawnMoves(board, position)
		}
	}

	private fun possibleKingMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in max(0, position.x - 1)..min(7, position.x + 1)) {
			for (j in max(0, position.y - 1)..min(7, position.y + 1)) {
				if (board[i, j]?.player != player)
					actions.add(ChessAction(position, Position(i, j)))
			}
		}
		// TODO: castling
		return actions
	}

	private fun possibleQueenMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		var actions = mutableListOf<ChessAction>()
		actions.addAll(possibleBishopMoves(board, position))
		actions.addAll(possibleRookMoves(board, position))
		return actions
	}

	private fun possibleBishopMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in 1..7) {
			val pos = Position(position.x + i, position.y + i)
			if (pos.x < 8 && pos.y < 8 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x + i, position.y - i)
			if (pos.x < 8 && pos.y >= 0 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x - i, position.y + i)
			if (pos.x >= 0 && pos.y < 8 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x - i, position.y - i)
			if (pos.x >= 0 && pos.y >= 0 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		return actions
	}

	private fun possibleKnightMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		var destination = position.add(1, 2)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(2, 1)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(1, -2)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(2, -1)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(-1, 2)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(-2, 1)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(-1, -2)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		destination = position.add(-2, -1)
		if (isWithinBoard(destination) && board[destination]?.player != player)
			actions.add(ChessAction(position, destination))
		return actions
	}

	private fun possibleRookMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in 1..7) {
			val pos = Position(position.x + i, position.y)
			if (pos.x < 8 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x - i, position.y)
			if (pos.x >= 0 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x, position.y + i)
			if (pos.y < 8 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		for (i in 1..7) {
			val pos = Position(position.x, position.y - i)
			if (pos.y >= 0 && board[pos]?.player != player)
				actions.add(ChessAction(position, pos))
			else break
		}
		return actions
	}

	private fun possiblePawnMoves(board: Grid<ChessPiece?>, position: Position): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		val direction = if (player == ChessPlayer.Black) -1 else 1
		if (board[position.x, position.y + direction] == null)
			actions.add(ChessAction(position, Position(position.x, position.y + direction)))
		if (!hasMoved &&
				board[position.x, position.y + direction] == null &&
				board[position.x, position.y + direction * 2] == null)
			actions.add(ChessAction(position, Position(position.x, position.y + direction * 2)))
		if (position.x > 0 &&
				board[position.x - 1, position.y + direction] != null &&
				board[position.x - 1, position.y + direction]?.player != player)
			actions.add(ChessAction(position, Position(position.x - 1, position.y + direction)))
		if (position.x < 7 &&
				board[position.x + 1, position.y + direction] != null &&
				board[position.x + 1, position.y + direction]?.player != player)
			actions.add(ChessAction(position, Position(position.x + 1, position.y + direction)))
		return actions
	}

	private fun isWithinBoard(position: Position): Boolean {
		return position.x in 0..7 && position.y in 0..7
	}
}