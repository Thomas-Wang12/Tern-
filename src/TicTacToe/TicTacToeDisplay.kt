import org.w3c.dom.*
import kotlinx.coroutines.*

class TicTacToeDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) : GameDisplay {
	var game = TicTacToe()
	val squareDisplay = SquareGridDisplay(canvas)
	var aiDelay = 500L
	val players: MutableMap<String, Any> = mutableMapOf()


	val getColor = { _: TicTacToePiece?, _: Int, _: Int ->
		"white"
	}
	val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: TicTacToePiece?, x: Int, y: Int ->
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

	fun performAction(action: TicTacToeAction) {
		game.performAction(action)
		updateDisplay(game.winner)
		if (game.winner != null || game.state.possibleActions().isEmpty())
			return
		awaitActionFrom(players[game.currentPlayer()])
	}

	fun updateDisplay(winner: String?) {
		if (winner != null)
			infoArea.textContent = winner + " has won!"
		else
			infoArea.textContent = "Current player: " + game.currentPlayer()
		squareDisplay.display(game.state.board, getColor, draw)
	}

	fun awaitActionFrom(player: Any?) {
		if (player is TicTacToeAI)
			GlobalScope.launch {
				delay(aiDelay)
				performAction(player.requestAction(game.state))
			}
	}

	override fun end() {
		squareDisplay.end()
	}
}

class Player {

}

interface AIPlayer<S, A> {
	val name: String

	fun requestAction(state: S): A
	fun endGame(state: S, won: Boolean)
}

interface TicTacToeAI : AIPlayer<TicTacToeState, TicTacToeAction>

class TicTacToeAIRandom(override val name: String) : TicTacToeAI {
	override fun requestAction(state: TicTacToeState): TicTacToeAction {
		val actions = state.possibleActions()
		return actions[(0 until actions.size).random()]
	}

	override fun endGame(state: TicTacToeState, won: Boolean) {

	}
}