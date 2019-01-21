import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.random.Random

class AlysDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameArea: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, playerArea, gameArea) {
	override var game = Alys()

	var originPosition: Position? = null
	var buildType: AlysType? = null
	//var selectedArea = listOf<Position>()
	private val fortButton = document.createElement("button") as HTMLButtonElement
	private val soldierButton = document.createElement("button") as HTMLButtonElement
	private val undoButton = document.createElement("button") as HTMLButtonElement
	private val endTurnButton = document.createElement("button") as HTMLButtonElement
	private val statusArea = document.createElement("div") as HTMLDivElement

	val images = mutableMapOf<String, HTMLImageElement>()

	override val getColor = getColor@{ _: AlysField?, x: Int, y: Int ->
		val origin = originPosition
		if (origin != null && origin.x == x && origin.y == y)
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

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, field: AlysField?, _: Int, _: Int ->
		if (field == null)
			return@draw
		context.fillStyle = "black"
		context.font = fieldSize.toString() + "px arial"
		context.textBaseline = CanvasTextBaseline.TOP
		val image = when (field.piece?.type) {
			AlysType.Fort -> "F"
			AlysType.Soldier -> soldierImage(field.piece, field.player == game.state.currentPlayer)
			AlysType.Tree -> "T"
			AlysType.CoastTree -> "C"
			AlysType.Grave -> "G"
			else -> if (field.treasury != null && field.treasury >= 10 && field.player == game.state.currentPlayer) "BR"
			else if (field.treasury != null) "B"
			else null
		}
		if(image != null)
			context.drawImage(images[image], 0.0, 0.0, fieldSize, fieldSize)
	}

	fun soldierImage(piece: AlysPiece, showReady: Boolean): String {
		val flag = if(piece.hasMoved || !showReady) "" else "R"
		return when(piece.strength){
			1 -> "S1$flag"
			2 -> "S2$flag"
			3 -> "S3$flag"
			4 -> "S4$flag"
			else -> "S1$flag"
		}
	}

	fun addImage(name: String){
		images[name] = document.createElement("img") as HTMLImageElement
		images[name]?.src = "assets/$name.png"
	}

	init {
		val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
		context.imageSmoothingEnabled = false
		addImage("S1")
		addImage("S1R")
		addImage("S2")
		addImage("S2R")
		addImage("S3")
		addImage("S3R")
		addImage("S4")
		addImage("S4R")
		addImage("B")
		addImage("BR")
		addImage("F")
		addImage("T")
		addImage("C")
		addImage("G")
		GlobalScope.launch {
			delay(500)
			updateDisplay(null)
		}
		game.players[1] = "Player 1"
		players["Player 1"] = Player()
		game.players[2] = "Player 2"
		players["Player 2"] = RandomAIPlayer<AlysState, AlysAction>()
		game.players[3] = "Player 3"
		players["Player 3"] = RandomAIPlayer<AlysState, AlysAction>()
		game.players[4] = "Player 4"
		players["Player 4"] = RandomAIPlayer<AlysState, AlysAction>()
		game.newGame(seed = (0..100000).random())
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
				val origin = originPosition
				if (origin == null) {
					val selectedField = game.state.board[it] ?: return@click
					if (selectedField.player != game.state.currentPlayer)
						return@click
					if (selectedField.piece?.type == AlysType.Soldier) {
						//if (selectedField.piece.hasMoved)
						//	return@click
						originPosition = it
						updateDisplay(game.winner)
						return@click
					}
					val selectedArea = AlysState.connectedPositions(it, game.state.board)
					originPosition = selectedArea.find { it.field.treasury != null }?.position
					updateDisplay(game.winner)
				} else {
					originPosition = null
					val sourceField = game.state.board[origin]// ?: return@click
					//if (origin == it){
					//	updateDisplay(game.winner)
					//	return@click
					//}
					val type = buildType
					buildType = null
					if (sourceField?.piece?.type == AlysType.Soldier)
						performAction(AlysMoveAction(origin, it))
					else if (type != null)
						performAction(AlysCreateAction(type, origin, it))
					else {
						updateDisplay(game.winner)
					}
				}
			}
		}
	}

	override fun updateDisplay(winner: String?) {
		if (winner != null)
			messageLine.textContent = winner + " has won!"
		else
			turnLine.textContent = "Current player: " + game.currentPlayer()
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
		updateButtons()
	}

	private fun updateButtons() {
		val source = originPosition
		if (source != null && game.state.board[source]?.treasury != null) {
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