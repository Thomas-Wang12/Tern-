import org.w3c.dom.*

class TicTacToeDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<TicTacToe, TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>(canvas, playerArea, gameAreaTop, gameAreaRight) {
	override var game = TicTacToe()

	override val getColor = null
	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: TicTacToePiece?, _: Int, _: Int ->
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		when (piece) {
			TicTacToePiece.Cross -> context.fillText("X", 0.0, 0.0)
			TicTacToePiece.Circle -> context.fillText("O", 0.0, 0.0)
		}
	}

	init {
		game.players[TicTacToePiece.Cross] = HumanPlayer("Cross")
		game.players[TicTacToePiece.Circle] = RandomAIPlayer<TicTacToeState, TicTacToeAction>("Circle")
		gridDisplay.outerBorder = 0.0

		updateDisplay()

		gridDisplay.onClick = {
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3)
				performAction(TicTacToeAction(game.state.currentPlayer, it.x, it.y))
		}
	}

	override fun startNewGame(){

	}
}
