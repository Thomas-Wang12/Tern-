import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement

class VirusDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) : GameDisplay {
	val players = mutableListOf("Player 1", "Player 2")
	var game = VirusState()
	val squareDisplay = SquareGridDisplay(canvas)

	init {
		val getColor = { piece: Int, _: Int, _: Int ->
			when (piece) {
				0 -> "white"
				1 -> "yellow"
				2 -> "red"
				else -> "green"
			}
		}
		squareDisplay.display(game.board, getColor)
		infoArea.textContent = "Current player: " + players[game.currentPlayer - 1]

		var sourcePosition: Position? = null

		squareDisplay.onClick = {
			if (it.x >= 0 && it.y >= 0 && it.x < game.width && it.y < game.height) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
					println("source" + sourcePosition)
				} else {
					sourcePosition = null
					val action = VirusAction(source, Position(it.x, it.y))
					println("destination" + Position(it.x, it.y))
					val newState = game.nextState(action)
					if (newState != null)
						game = newState
					squareDisplay.display(game.board, getColor)
					val winner = game.findWinner()
					if (winner != null)
						infoArea.textContent = players[winner - 1] + " has won!"
					else
						infoArea.textContent = "Current player: " + players[game.currentPlayer - 1]
				}
			}
		}
	}

	override fun end() {
		squareDisplay.end()
	}
}
