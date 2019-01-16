import org.w3c.dom.*

class TicTacToeDisplay(canvas: HTMLCanvasElement, infoArea: HTMLDivElement)
	: GameDisplay<TicTacToe, TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>(canvas, infoArea) {
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
		game.players[TicTacToePiece.Cross] = "Cross"
		players["Cross"] = Player()
		game.players[TicTacToePiece.Circle] = "Circle"
		players["Circle"] = TicTacToeAIRandom("Circle")

		updateDisplay(null)

		squareDisplay.onClick = {
			if (players[game.currentPlayer()] is Player && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3)
				performAction(TicTacToeAction(game.state.currentPlayer, it.x, it.y))
		}
	}
}

class TicTacToeAIRandom(override val name: String) : AIPlayer<TicTacToeState, TicTacToeAction> {
	override fun requestAction(state: TicTacToeState): TicTacToeAction {
		val actions = state.possibleActions()
		return actions[(0 until actions.size).random()]
	}

	override fun endGame(state: TicTacToeState, won: Boolean) {

	}
}
