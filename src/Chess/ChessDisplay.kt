import org.w3c.dom.*

class ChessDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Chess, ChessState, ChessPiece?, ChessAction, ChessPlayer>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Chess()

	var sourcePosition: Position? = null

	override val getColor = getColor@ { _: ChessPiece?, x: Int, y: Int ->
		val source = sourcePosition
		if(source != null && source.x == x && source.y == y){
			return@getColor "darkgrey"
		}
		if (if (x % 2 == 0) y % 2 == 0 else y % 2 == 1)
			return@getColor "white"
		else
			return@getColor "grey"
	}

	override val draw = { context: CanvasRenderingContext2D, fieldSize: Double, piece: ChessPiece?, _: Int, _: Int ->
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		val isBlack = piece?.player == ChessPlayer.Black
		when (piece?.type) {
			ChessPieceType.King -> context.fillText(if (isBlack) "♚" else "♔", 0.0, 0.0)
			ChessPieceType.Queen -> context.fillText(if (isBlack) "♛" else "♕", 0.0, 0.0)
			ChessPieceType.Knight -> context.fillText(if (isBlack) "♞" else "♘", 0.0, 0.0)
			ChessPieceType.Rook -> context.fillText(if (isBlack) "♜" else "♖", 0.0, 0.0)
			ChessPieceType.Bishop -> context.fillText(if (isBlack) "♝" else "♗", 0.0, 0.0)
			ChessPieceType.Pawn -> context.fillText(if (isBlack) "♟" else "♙", 0.0, 0.0)
		}
	}

	init {
		playerTypes.add(RandomAIPlayerType<ChessState, ChessAction>())
		players.add(HumanPlayer("White", "white"))
		players.add(RandomAIPlayer<ChessState, ChessAction>("Black", "black"))
		maxPlayers = 2
		newPlayerButton.disabled = true

		startNewGame()

		gridDisplay.onClick = {
			if (game.currentPlayer() is Player && it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = Position(it.x, it.y)
					updateDisplay()
				} else {
					sourcePosition = null
					performAction(ChessAction(source, Position(it.x, it.y)))
				}
			}
		}
	}

	override fun startNewGame(){
		game = Chess()
		game.players[ChessPlayer.White] = players[0]
		game.players[ChessPlayer.Black] = players[1]
		awaitActionFrom(game.currentPlayer())
		updateDisplay()
	}
}