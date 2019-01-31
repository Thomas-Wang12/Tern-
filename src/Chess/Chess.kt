import kotlin.math.abs

class Chess(override var state: ChessState = ChessState())
	: BoardGame<ChessState, ChessPiece?, ChessAction, ChessPlayer>() {

	override fun copyState(): ChessState {
		return ChessState(state.board.copy(), state.currentPlayer, state.players)
	}

	override val actionTypes = listOf(
			ActionType("move piece",
					{ _, _ -> true },
					ChessSas.Companion::readyAction,
					listOf<ActionStep<ChessSas>>(
							ChessSas::originMustBeCurrentPlayer,
							ChessSas::destinationMustBeEmptyOrEnemy,
							ChessSas::moveMustBeLegal,
							ChessSas::movePiece,
							ChessSas::switchPlayer,
							ChessSas::kingMustNotBeInCheck
					)
			)
	)
}

fun ChessSas.originMustBeCurrentPlayer() =
		Result.check("must move own piece", piece.player == oldState.currentPlayer)

fun ChessSas.destinationMustBeEmptyOrEnemy() =
		Result.check("destination must be empty or enemy", destination.field == null || destination.field.player != oldState.currentPlayer)

fun ChessSas.moveMustBeLegal() =
		Result.check("move must be legal", piece.isLegal(oldState.board, action))

fun ChessSas.kingMustNotBeInCheck(): Result<Any?> {
	val index = newState.board.fields.indexOfFirst { it?.type == ChessPieceType.King && it.player == oldState.currentPlayer }
	val position = Position(index % 8, index / 8)
	return Result.check("king must not be in check", !ChessPiece.isInCheck(newState.board, position))
}

fun ChessSas.movePiece(): Result<Any?> {
	var newPiece = piece.copy(hasMoved = true)
	if (newPiece.type == ChessPieceType.Pawn &&
			((action.destination.y == 0 && newPiece.player == ChessPlayer.Black) ||
			(action.destination.y == oldState.board.height - 1 && newPiece.player == ChessPlayer.White)))
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

data class ChessAction(val origin: Position, val destination: Position)

enum class ChessPieceType { King, Queen, Bishop, Knight, Rook, Pawn }
enum class ChessPlayer { White, Black }