import org.w3c.dom.*

class AlysDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameArea: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, playerArea, gameArea) {
	override var game = Alys()

	var sourcePosition: Position? = null
	//var selectedArea = listOf<Position>()

	override val getColor = getColor@ { _: AlysField?, x: Int, y: Int ->
		val source = sourcePosition
		if(source != null && source.x == x && source.y == y)
			return@getColor "darkgrey"
		val piece = game.state.board[x,y] ?: return@getColor "transparent"
		//if(Position(x,y) in selectedArea)
		//	return@getColor "red"
		return@getColor when(piece.player){
			1 -> "yellow"
			2 -> "green"
			3 -> "lightgreen"
			4 -> "orange"
			else -> "white"
		}
	}

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, piece: AlysField?, _: Int, _: Int ->
		if(piece == null)
			return@draw
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		if(piece.treasury != null)
			context.fillText(piece.treasury.toString(), 0.0, 0.0)
		else if(piece.piece?.type == AlysType.Fort)
			context.fillText("F", 0.0, 0.0)
		else if(piece.piece?.type == AlysType.Soldier)
			context.fillText("S", 0.0, 0.0)
	}

	init {
		game.players[1] = "Player 1"
		players["Player 1"] = Player()
		game.players[2] = "Player 2"
		players["Player 2"] = Player()
		game.players[3] = "Player 3"
		players["Player 3"] = Player()
		game.players[4] = "Player 4"
		players["Player 4"] = Player()
		game.state = game.state.newGame()
		gridDisplay.gridColor = "blue"
		gridDisplay.fieldSize = 39.0
		gridDisplay.showHexagons()

		updateDisplay(null)

		gridDisplay.onClick = click@{
			if (players[game.currentPlayer()] is Player && game.state.board.isWithinBounds(it)) {
				val source = sourcePosition
				if (source == null) {
					sourcePosition = it
					//selectedArea = game.state.connectedPositions(it)
					updateDisplay(game.winner)
				} else {
					sourcePosition = null
					val sourceField = game.state.board[source] ?: return@click
					if(sourceField.player != game.state.currentPlayer)
						return@click
					if(sourceField.piece != null)
						performAction(AlysMoveAction(source, it))
					else
						performAction(AlysCreateAction(AlysType.Soldier, source, it))
				}
			}
		}
	}
}