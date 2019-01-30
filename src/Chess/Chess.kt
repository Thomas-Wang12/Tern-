import kotlin.math.abs

class Chess(override var state: ChessState = ChessState())
	: BoardGame<ChessState, ChessPiece?, ChessAction, ChessPlayer>() {

	override fun copyState(): ChessState {
		return ChessState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("build fort",
					{ _, _ -> true },
					ChessSas.Companion::readyAction,
					listOf<ActionStep<ChessSas>>(
							ChessSas::originMustBeCurrentPlayer,
							ChessSas::destinationMustBeEmptyOrEnemy,
							ChessSas::moveMustBeLegal,
							ChessSas::performMove,
							ChessSas::kingMustNotBeInCheck,
							ChessSas::switchPlayer
					)
			)
	)
}

fun ChessSas.originMustBeCurrentPlayer() =
		Result.check("piece must not have moved", piece.player == oldState.currentPlayer)

fun ChessSas.destinationMustBeEmptyOrEnemy() =
		Result.check("piece must not have moved", destination.field == null || destination.field.player != oldState.currentPlayer)

fun ChessSas.moveMustBeLegal() =
		Result.check("piece must not have moved", piece.isLegal(oldState.board, action))

fun ChessSas.kingMustNotBeInCheck(): Result<Any?> {
	val index = newState.board.fields.indexOfFirst { it?.type == ChessPieceType.King && it.player == oldState.currentPlayer }
	val position = Position(index % 8, index / 8)
	return Result.check("piece must not have moved", piece.isInCheck(newState.board, position))
}

fun ChessSas.performMove(): Result<Any?> {
	var newPiece = piece.copy(hasMoved = true)
	if (newPiece.type == ChessPieceType.Pawn &&
			(action.destination.y == 0 && newPiece.player == ChessPlayer.Black) ||
			(action.destination.y == oldState.board.height - 1 && newPiece.player == ChessPlayer.White))
		newPiece = newPiece.copy(type = ChessPieceType.Queen)
	if (newPiece.type == ChessPieceType.King && abs(action.origin.x - action.destination.x) == 2)
		moveCastlingRook(action, newState)
	newState.board[action.destination] = newPiece
	newState.board[action.origin] = null
	return Result.success()
}

private fun moveCastlingRook(action: ChessAction, state: ChessState) {
	if (action.destination.x < 4) {
		state.board[action.destination.x + 1, action.origin.y] = state.board[0, action.origin.y]
		state.board[0, action.origin.y] = null
	} else {
		state.board[action.destination.x - 1, action.origin.y] = state.board[state.board.width - 1, action.origin.y]
		state.board[state.board.width - 1, action.origin.y] = null
	}
}

fun ChessSas.switchPlayer(): Result<Any?> {
	newState.currentPlayer = if (oldState.currentPlayer == ChessPlayer.White) ChessPlayer.Black else ChessPlayer.White
	return Result.success()
}

class ChessSas(
		val piece: ChessPiece,
		val destination: PositionedField<ChessPiece?>,
		val action: ChessAction,
		oldState: ChessState,
		newState: ChessState
) : StateActionState<ChessState>(oldState, newState) {
	companion object {
		fun readyAction(oldState: ChessState, action: ChessAction, newState: ChessState): Result<ChessSas> {
			val originField = oldState.board[action.origin]
					?: return Failure("must move a piece")
			return Success(ChessSas(
					originField,
					PositionedField(action.destination, oldState.board[action.destination]),
					action,
					oldState, newState))
		}
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

	override fun possibleActions(): List<ChessAction> {
		val actions = mutableListOf<ChessAction>()
		for (i in 0 until 8) {
			for (j in 0 until 8) {
				val piece = board[i, j]
				if (piece?.player != currentPlayer)
					continue
				actions.addAll(piece.possibleMoves(board, Position(i, j)))
			}
		}
		return actions//.filter { confirmLegality(it) is Success }
	}

	override fun findWinner(): ChessPlayer? {
		if(possibleActions().isNotEmpty())
			return null
		return if (currentPlayer == ChessPlayer.Black) ChessPlayer.White else ChessPlayer.Black
	}
}

data class ChessAction(val origin: Position, val destination: Position)

enum class ChessPieceType { King, Queen, Bishop, Knight, Rook, Pawn }
enum class ChessPlayer { White, Black }