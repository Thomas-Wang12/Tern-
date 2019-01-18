import kotlinx.coroutines.*
import org.w3c.dom.*

abstract class GameDisplay<G : BoardGame<S, T, A, P>, S : BoardGameState<T, A, P>, T, A, P>(val canvas: HTMLCanvasElement, val infoArea: HTMLElement) {
	abstract var game: G
	val gridDisplay = GridDisplay(canvas)
	var aiDelay = 500L
	val players: MutableMap<String, Any> = mutableMapOf()


	abstract val getColor: ((T, x: Int, y: Int) -> String)?
	abstract val draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)?


	fun performAction(action: A) {
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
		gridDisplay.display(game.state.board, getColor, draw)
	}

	fun awaitActionFrom(player: Any?) {
		if (player is AIPlayer<*, *>){
			player as AIPlayer<BoardGameState<T, A, P>, A>
			GlobalScope.launch {
				delay(aiDelay)
				performAction(player.requestAction(game.state))
			}
		}
	}

	fun end() {
		gridDisplay.end()
	}
}

class Player {

}

interface AIPlayer<S, A> {
	fun requestAction(state: S): A
	fun endGame(state: S, won: Boolean)
}

class RandomAIPlayer<S: BoardGameState<*, A, *>, A>() : AIPlayer<S, A> {
	override fun requestAction(state: S): A {
		val actions = state.possibleActions()
		return actions[(0 until actions.size).random()]
	}

	override fun endGame(state: S, won: Boolean) { }
}
