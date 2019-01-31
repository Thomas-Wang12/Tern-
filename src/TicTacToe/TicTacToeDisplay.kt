import org.w3c.dom.*

class TicTacToeDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<TicTacToe, TicTacToeState, TicTacToePiece?, TicTacToeAction, TicTacToePiece>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = TicTacToe()
	override val playerTypes = listOf<PlayerType<TicTacToeState, TicTacToeAction>>(HumanType(), RandomAIType())

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
		players.add(Player("Cross", controller = HumanController()))
		players.add(Player("Circle", controller = RandomAIController()))
		gridDisplay.outerBorder = 0.0
		maxPlayers = 2
		newPlayerButton.disabled = true

		startNewGame()

		gridDisplay.onClick = onClick@{
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3){
				val playerController = game.currentPlayer()?.controller as? HumanController ?: return@onClick
				playerController.performAction(TicTacToeAction(game.state.currentPlayer, it.x, it.y))
			}
		}
	}

	override fun startNewGame() {
		game = TicTacToe()
		game.players[TicTacToePiece.Cross] = players[0]
		game.players[TicTacToePiece.Circle] = players[1]
	}
}
