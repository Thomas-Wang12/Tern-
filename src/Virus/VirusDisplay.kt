import org.w3c.dom.*

class VirusDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Virus, VirusState, Int, VirusAction, Int>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Virus()
	override val playerTypes = listOf<PlayerType<VirusState, VirusAction>>(HumanType(), RandomAIType(), SimpleVirusAIType())

	var originPosition: Position? = null

	override val getColor = getColor@{ piece: Int, _: Int, _: Int ->
		val player = game.players[piece]
		if (player != null)
			return@getColor player.color
		return@getColor "white"
	}
	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, _: Int, x: Int, y: Int ->
		val origin = originPosition
		if (origin == null || !(origin.x == x && origin.y == y))
			return@draw
		// context.lineWidth = 2.0
		context.fillStyle = "white"
		context.fillRect(fieldSize/4, fieldSize/4, fieldSize/2, fieldSize/2)
	}

	init {
		players.add(Player("Player 1", "yellow", HumanController()))
		players.add(Player("Player 2", "red", RandomAIController()))
		maxPlayers = 4

		startNewGame()

		gridDisplay.onClick = onClick@{
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < game.state.width && it.y < game.state.height) {
				val origin = originPosition
				if (origin == null) {
					originPosition = Position(it.x, it.y)
					updateDisplay()
				} else {
					originPosition = null
					val playerController = game.currentPlayer()?.controller as? HumanController ?: return@onClick
					playerController.performAction(VirusAction(origin, Position(it.x, it.y)))
				}
			}
		}
	}

	override fun startNewGame(){
		game = Virus()
		for(i in 1..players.size)
			game.players[i] = players[i-1]
		game.state = VirusState(8, 8, players.size)
	}
}
