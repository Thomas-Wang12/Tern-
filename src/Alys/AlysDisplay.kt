import org.w3c.dom.*

class AlysDisplay(canvas: HTMLCanvasElement, infoArea: HTMLDivElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, infoArea) {
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
		game.players[1] = "White"
		players["White"] = Player()
		game.players[2] = "Black"
		players["Black"] = RandomAIPlayer<AlysState, AlysAction>()
		game.state = game.state.newGame()
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