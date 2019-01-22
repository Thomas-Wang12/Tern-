import org.w3c.dom.*

class VirusDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Virus, VirusState, Int, VirusAction, Int>(canvas, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Virus()

	override val getColor = { piece: Int, _: Int, _: Int ->
		when (piece) {
			0 -> "white"
			1 -> "yellow"
			2 -> "red"
			else -> "green"
		}
	}
	override val draw = null

	init {
		game.players[1] = "Player 1"
		players["Player 1"] = Player()
		game.players[2] = "Player 2"
		players["Player 2"] = RandomAIPlayer<VirusState, VirusAction>()

		updateDisplay(null)

		var sourcePosition: Position? = null

		gridDisplay.onClick = {
			if (players[game.currentPlayer()] is Player && it.x >= 0 && it.y >= 0 && it.x < game.state.width && it.y < game.state.height) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
				} else {
					sourcePosition = null
					performAction(VirusAction(source, Position(it.x, it.y)))
				}
			}
		}
	}
}