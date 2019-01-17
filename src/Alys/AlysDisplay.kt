import org.w3c.dom.*

class AlysDisplay(canvas: HTMLCanvasElement, infoArea: HTMLDivElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, infoArea) {
	override var game = Alys()

	var sourcePosition: Position? = null

	init {
		squareDisplay.showHexagons()
	}

	override val getColor = getColor@ { _: AlysField?, x: Int, y: Int ->
		val source = sourcePosition
		if(source != null && source.x == x && source.y == y){
			return@getColor "darkgrey"
		}
		if (if (x % 2 == 0) y % 2 == 0 else y % 2 == 1)
			return@getColor "white"
		else
			return@getColor "grey"
	}

	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: AlysField?, _: Int, _: Int ->
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		val isBlack = piece?.player == 1
		/*when (piece?.type) {
			ChessPieceType.King -> context.fillText(if (isBlack) "♚" else "♔", 0.0, 0.0)
			ChessPieceType.Queen -> context.fillText(if (isBlack) "♛" else "♕", 0.0, 0.0)
			ChessPieceType.Knight -> context.fillText(if (isBlack) "♞" else "♘", 0.0, 0.0)
			ChessPieceType.Rook -> context.fillText(if (isBlack) "♜" else "♖", 0.0, 0.0)
			ChessPieceType.Bishop -> context.fillText(if (isBlack) "♝" else "♗", 0.0, 0.0)
			ChessPieceType.Pawn -> context.fillText(if (isBlack) "♟" else "♙", 0.0, 0.0)
		}*/
	}

	init {
		game.players[1] = "White"
		players["White"] = Player()
		game.players[2] = "Black"
		players["Black"] = RandomAIPlayer<ChessState, ChessAction>()

		updateDisplay(null)

		squareDisplay.onClick = {
			if (players[game.currentPlayer()] is Player && it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
					updateDisplay(game.winner)
				} else {
					sourcePosition = null
					performAction(AlysMoveAction(source, Position(it.x, it.y)))
				}
			}
		}
	}
}