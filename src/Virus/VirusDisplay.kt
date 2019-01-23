import org.w3c.dom.*

class VirusDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Virus, VirusState, Int, VirusAction, Int>(canvas, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Virus()

	override val getColor = getColor@{ piece: Int, _: Int, _: Int ->
		val player = game.players[piece]
		if (player != null)
			return@getColor player.color
		return@getColor "white"
	}
	override val draw = null

	init {
		playerTypes.add(RandomAIPlayerType<VirusState, VirusAction>())
		players.add(HumanPlayer("Player 1", "yellow"))
		players.add(RandomAIPlayer<VirusState, VirusAction>("Player 2", "red"))
		maxPlayers = 4

		startNewGame()

		var sourcePosition: Position? = null

		gridDisplay.onClick = {
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < game.state.width && it.y < game.state.height) {
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

	override fun startNewGame(){
		game.players.clear()
		for(i in 1..players.size)
			game.players[i] = players[i-1]
		game.state = VirusState(8, 8, players.size)
		updateDisplay()
	}
}