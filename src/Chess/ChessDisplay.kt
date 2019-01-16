import org.w3c.dom.*

class ChessDisplay(canvas: HTMLCanvasElement, infoArea: HTMLDivElement)
	: GameDisplay<Chess, ChessState, ChessPiece?, ChessAction, ChessPlayer>(canvas, infoArea) {
	override var game = Chess()

	override val getColor =  { _: ChessPiece?, x: Int, y: Int ->
		if (if (x % 2 == 0) y % 2 == 0 else y % 2 == 1)
			"white"
		else
			"grey"
	}

	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: ChessPiece?, _: Int, _: Int ->
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		val isBlack = piece?.player == ChessPlayer.Black
		when (piece?.type) {
			ChessPieceType.King -> context.fillText(if (isBlack) "♚" else "♔", 0.0, 0.0)
			ChessPieceType.Queen -> context.fillText(if (isBlack) "♛" else "♕", 0.0, 0.0)
			ChessPieceType.Knight -> context.fillText(if (isBlack) "♞" else "♘", 0.0, 0.0)
			ChessPieceType.Rook -> context.fillText(if (isBlack) "♜" else "♖", 0.0, 0.0)
			ChessPieceType.Bishop -> context.fillText(if (isBlack) "♝" else "♗", 0.0, 0.0)
			ChessPieceType.Pawn -> context.fillText(if (isBlack) "♟" else "♙", 0.0, 0.0)
		}
	}

	init {
		game.players[ChessPlayer.White] = "White"
		players["White"] = Player()
		game.players[ChessPlayer.Black] = "Black"
		players["Black"] = RandomAIPlayer<ChessState, ChessAction>()

		updateDisplay(null)

		var sourcePosition: Position? = null

		squareDisplay.onClick = {
			if (players[game.currentPlayer()] is Player && it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
				} else {
					sourcePosition = null
					performAction(ChessAction(source, Position(it.x, it.y)))
				}
			}
		}
	}
}