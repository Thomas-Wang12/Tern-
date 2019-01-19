import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document

class AlysDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameArea: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, playerArea, gameArea) {
	override var game = Alys()

	var sourcePosition: Position? = null
	var buildType: AlysType? = null
	//var selectedArea = listOf<Position>()
	private val fortButton = document.createElement("button") as HTMLButtonElement
	private val soldierButton = document.createElement("button") as HTMLButtonElement
	private val undoButton = document.createElement("button") as HTMLButtonElement
	private val endTurnButton = document.createElement("button") as HTMLButtonElement
	private val statusArea = document.createElement("div") as HTMLDivElement

	override val getColor = getColor@{ _: AlysField?, x: Int, y: Int ->
		val source = sourcePosition
		if (source != null && source.x == x && source.y == y)
			return@getColor "darkgrey"
		val piece = game.state.board[x, y] ?: return@getColor "transparent"
		//if(Position(x,y) in selectedArea)
		//	return@getColor "red"
		return@getColor when (piece.player) {
			1 -> "yellow"
			2 -> "green"
			3 -> "lightgreen"
			4 -> "orange"
			else -> "white"
		}
	}

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, piece: AlysField?, _: Int, _: Int ->
		if (piece == null)
			return@draw
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		if (piece.treasury != null)
			context.fillText(piece.treasury.toString(), 0.0, 0.0)
		else if (piece.piece?.type == AlysType.Fort)
			context.fillText("F", 0.0, 0.0)
		else if (piece.piece?.type == AlysType.Soldier)
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
		gridDisplay.outerBorder = 50.0
		gridDisplay.showHexagons()

		gameArea.appendChild(fortButton)
		gameArea.appendChild(soldierButton)
		gameArea.appendChild(undoButton)
		gameArea.appendChild(endTurnButton)
		gameArea.appendChild(statusArea)
		fortButton.textContent = "Build fort"
		soldierButton.textContent = "Hire soldier"
		undoButton.textContent = "Undo"
		endTurnButton.textContent = "End turn"
		fortButton.addEventListener("click", ::buildFort)
		soldierButton.addEventListener("click", ::hireSoldier)
		undoButton.addEventListener("click", ::undo)
		endTurnButton.addEventListener("click", ::endTurn)

		updateDisplay(null)

		gridDisplay.onClick = click@{
			if (players[game.currentPlayer()] is Player && game.state.board.isWithinBounds(it)) {
				val source = sourcePosition
				if (source == null) {
					val selectedField = game.state.board[it] ?: return@click
					if (selectedField.player != game.state.currentPlayer)
						return@click
					if (selectedField.piece?.type == AlysType.Soldier) {
						if (selectedField.piece.hasMoved)
							return@click
						sourcePosition = it
						updateDisplay(game.winner)
						return@click
					}
					val selectedArea = game.state.connectedPositions(it)
					sourcePosition = selectedArea[selectedArea.indexOfFirst { game.state.board[it]?.treasury != null }]
					updateDisplay(game.winner)
				} else {
					sourcePosition = null
					val sourceField = game.state.board[source] ?: return@click
					if (source == it){
						updateDisplay(game.winner)
						return@click
					}
					if (sourceField.player != game.state.currentPlayer){
						updateDisplay(game.winner)
						return@click
					}
					val type = buildType
					buildType = null
					if (sourceField.piece?.type == AlysType.Soldier)
						performAction(AlysMoveAction(source, it))
					else if (type != null)
						performAction(AlysCreateAction(type, source, it))
				}
			}
		}
	}

	override fun updateDisplay(winner: String?) {
		if (winner != null)
			messageLine.textContent = winner + " has won!"
		else
			messageLine.textContent = "Current player: " + game.currentPlayer()
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
		updateButtons()
	}

	private fun updateButtons(){
		val source = sourcePosition
		if(source != null && game.state.board[source]?.treasury != null){
			fortButton.disabled = buildType == AlysType.Fort
			soldierButton.disabled = buildType == AlysType.Soldier
		} else {
			fortButton.disabled = true
			soldierButton.disabled = true
		}
		undoButton.disabled = true
	}

	private fun hireSoldier(event: Event) {
		buildType = AlysType.Soldier
		updateButtons()
	}

	private fun buildFort(event: Event) {
		buildType = AlysType.Fort
		updateButtons()
	}

	private fun undo(event: Event) {

	}

	private fun endTurn(event: Event) {
		performAction(AlysEndTurnAction())
	}
}