import kotlinx.coroutines.*
import org.w3c.dom.*
import kotlin.browser.document

abstract class GameDisplay<G : BoardGame<S, T, A, P>, S : BoardGameState<T, A, P>, T, A, P>(
		val canvas: HTMLCanvasElement,
		val playerArea: HTMLElement,
		val gameArea: HTMLElement
) {
	abstract var game: G
	val gridDisplay = GridDisplay(canvas)
	var aiDelay = 200L
	val players: MutableMap<String, Any> = mutableMapOf()
	val playerList = document.createElement("div") as HTMLDivElement
	val turnLine = document.createElement("div") as HTMLDivElement
	val messageLine = document.createElement("div") as HTMLDivElement

	abstract val getColor: ((T, x: Int, y: Int) -> String)?
	abstract val draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)?

	init {
		playerArea.innerHTML = ""
		gameArea.innerHTML = ""
		turnLine.className = "message-line"
		messageLine.className = "message-line"
		playerArea.appendChild(playerList)
		playerArea.appendChild(turnLine)
		playerArea.appendChild(messageLine)
	}

	fun performAction(action: A): Boolean {
		game.performAction(action).onFailure {
			messageLine.textContent = it.error
			updateDisplay(game.winner)
			return false
		}
		updateDisplay(game.winner)
		if (game.winner != null || game.state.possibleActions().isEmpty())
			return true
		awaitActionFrom(players[game.currentPlayer()])
		return true
	}

	open fun updateDisplay(winner: String?) {
		if (winner != null)
			messageLine.textContent = winner + " has won!"
		else
			turnLine.textContent = "Current player: " + game.currentPlayer()
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
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

	fun updatePlayerList(){
		playerList.innerHTML = ""
		for(player in players.keys){
			val playerElement = document.createElement("div") as HTMLDivElement
			playerElement.className = "player"
			playerElement.textContent = player
			playerList.appendChild(playerElement)
		}
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
