import org.w3c.dom.*

class ChessDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) : GameDisplay {
	var game = ChessState()
	val squareDisplay = SquareGridDisplay(canvas)

	init {
		val getColor = { _: ChessPiece?, x: Int, y: Int ->
			if (if (x % 2 == 0) y % 2 == 0 else y % 2 == 1)
				"white"
			else
				"grey"
		}
		val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: ChessPiece?, x: Int, y: Int ->
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
		squareDisplay.display(game.board, getColor, draw)
		infoArea.textContent = "Current player: " + game.currentPlayer.toString()

		var sourcePosition: Position? = null

		squareDisplay.onClick = {
			if (it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
					println("source" + sourcePosition)
				} else {
					sourcePosition = null
					val action = ChessAction(source, Position(it.x, it.y))
					println("destination" + Position(it.x, it.y))
					val newState = game.nextState(action)
					if (newState != null)
						game = newState
					squareDisplay.display(game.board, getColor, draw)
					val winner = game.findWinner()
					if (winner != null)
						infoArea.textContent = winner.toString() + " has won!"
					else
						infoArea.textContent = "Current player: " + game.currentPlayer.toString()
				}
			}
		}
	}

	override fun end() {
		squareDisplay.end()
	}
}
