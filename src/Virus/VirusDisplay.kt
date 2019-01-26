import org.w3c.dom.*

class VirusDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Virus, VirusState, Int, VirusAction, Int>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Virus()

	var originPosition: Position? = null

	override val getColor = getColor@{ piece: Int, _: Int, _: Int ->
		val player = game.players[piece]
		if (player != null)
			return@getColor player.color
		return@getColor "white"
	}
	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, field: Int, x: Int, y: Int ->
		val origin = originPosition
		if (origin == null || !(origin.x == x && origin.y == y))
			return@draw
		// context.lineWidth = 2.0
		context.fillStyle = "white"
		context.fillRect(fieldSize/4, fieldSize/4, fieldSize/2, fieldSize/2)
	}

	init {
		playerTypes.add(RandomAIPlayerType<VirusState, VirusAction>())
		playerTypes.add(SimpleVirusAIPlayerType())
		players.add(HumanPlayer("Player 1", "yellow"))
		players.add(RandomAIPlayer<VirusState, VirusAction>("Player 2", "red"))
		maxPlayers = 4

		startNewGame()

		gridDisplay.onClick = {
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < game.state.width && it.y < game.state.height) {
				val origin = originPosition
				if (origin == null) {
					originPosition = Position(it.x, it.y)
					updateDisplay()
				} else {
					originPosition = null
					performAction(VirusAction(origin, Position(it.x, it.y)))
				}
			}
		}
	}

	override fun startNewGame(){
		game.players.clear()
		for(i in 1..players.size)
			game.players[i] = players[i-1]
		game.state = VirusState(8, 8, players.size)
		awaitActionFrom(game.currentPlayer())
		updateDisplay()
	}
}

class SimpleVirusAIPlayerType : PlayerType("CPU - Medium") {
	override fun isOfType(player: Player): Boolean = player is SimpleAIPlayer<*, *>
	override fun getNew(name: String, color: String) = SimpleAIPlayer(name, color, ::virusUtility)
}

private fun virusUtility(state: VirusState, action: VirusAction): Int {
	val currentDifference = state.board.fields.filter { it == state.currentPlayer }.size
	- state.board.fields.filter { it != state.currentPlayer  && it != 0}.size
	val nextState = state.nextState(action)
	val nextDifference = nextState.board.fields.filter { it == state.currentPlayer }.size
	- nextState.board.fields.filter { it != state.currentPlayer  && it != 0}.size
	return nextDifference - currentDifference
}
