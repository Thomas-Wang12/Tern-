import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.random.Random

class AlysDisplay(canvas: HTMLCanvasElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvas, playerArea, gameAreaTop, gameAreaRight) {
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
		val player = game.players[piece.player]
		if(player != null)
			return@getColor player.color
		return@getColor "white"
	}

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, field: AlysField?, _: Int, _: Int ->
		if (field == null)
			return@draw
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
		if (image != null)
			context.drawImage(images[image], 0.0, 0.0, fieldSize, fieldSize)
	}

	fun soldierImage(piece: AlysPiece, showReady: Boolean): String {
		val flag = if (piece.hasMoved || !showReady) "" else "R"
		return when (piece.strength) {
			1 -> "S1$flag"
			2 -> "S2$flag"
			3 -> "S3$flag"
			4 -> "S4$flag"
			else -> "S1$flag"
		}
	}

	fun addImage(name: String) {
		images[name] = document.createElement("img") as HTMLImageElement
		images[name]?.src = "assets/$name.png"
	}

	fun resize() {
		val scale = window.devicePixelRatio
		val size = (((canvas.width / scale - gridDisplay.outerBorder * 2) / game.state.width) - 1).toInt()
		gridDisplay.fieldSize = (if (size % 2 == 0) size - 1 else size).toDouble()
		gridDisplay.showHexagons()
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
			updateDisplay()
		}
		aiDelay = 0
		gridDisplay.gridColor = "#7df"
		gridDisplay.outerBorder = 50.0

		gameAreaTop.appendChild(undoButton)
		gameAreaTop.appendChild(soldierButton)
		gameAreaTop.appendChild(fortButton)
		gameAreaRight.appendChild(statusArea)
		gameAreaRight.appendChild(endTurnButton)
		statusArea.className = "status-area"
		statusArea.textContent = "Nothing selected"
		fortButton.textContent = "Build fort (15)"
		soldierButton.textContent = "Hire soldier (10)"
		undoButton.textContent = "Undo"
		endTurnButton.textContent = "End turn"
		fortButton.addEventListener("click", ::buildFort)
		soldierButton.addEventListener("click", ::hireSoldier)
		undoButton.addEventListener("click", ::undo)
		endTurnButton.addEventListener("click", ::endTurn)

		playerTypes.add(RandomAIPlayerType<AlysState, AlysAction>())
		players.add(HumanPlayer("Player 1", "#0b9"))
		players.add(RandomAIPlayer<AlysState, AlysAction>("Player 2", "green"))
		players.add(RandomAIPlayer<AlysState, AlysAction>("Player 3", "yellowgreen"))
		players.add(RandomAIPlayer<AlysState, AlysAction>("Player 4", "yellow"))
		players.add(RandomAIPlayer<AlysState, AlysAction>("Player 5", "orange"))

		startNewGame()

		gridDisplay.onClick = click@{
			if (game.currentPlayer() is Player && game.state.board.isWithinBounds(it)) {
				val origin = originPosition
				if (origin == null) {
					val selectedField = game.state.board[it] ?: return@click
					if (selectedField.player != game.state.currentPlayer)
						return@click
					if (selectedField.piece?.type == AlysType.Soldier) {
						if (selectedField.piece.hasMoved)
							return@click
						originPosition = it
						updateDisplay()
						return@click
					}
					val selectedArea = AlysState.connectedPositions(it, game.state.board)
					originPosition = selectedArea.find { it.field.treasury != null }?.position
					updateDisplay()
				} else {
					if (origin == it){
						buildType = null
						originPosition = null
						updateDisplay()
						return@click
					}
					val sourceField = game.state.board[origin]
					val type = buildType
					var success = false
					if (sourceField?.piece?.type == AlysType.Soldier)
						success = performAction(AlysMoveAction(origin, it))
					else if (type != null)
						success = performAction(AlysCreateAction(type, origin, it))
					else if(sourceField?.treasury != 0){
						val destination =game.state.board[it]
						if(destination?.player == game.state.currentPlayer && destination.treasury != null){
							originPosition = it
							updateDisplay()
							return@click
						}
					}
					if(success){
						buildType = null
						originPosition = null
					}
					updateDisplay()
				}
			}
		}
	}

	override fun startNewGame(){
		game.players.clear()
		for(i in 1..players.size)
			game.players[i] = players[i-1]
		game.newGame(seed = (0..100000).random())
		resize()
		updateDisplay()
	}

	override fun updateDisplay() {
		val winner = game.winner
		if (winner != null)
			messageLine.textContent = winner.name + " has won!"
		else
			turnLine.textContent = "Current player: " + game.currentPlayer()?.name
		val origin = originPosition
		val selectedField = if (origin != null) game.state.board[origin] else null
		if (selectedField?.treasury != null) {
			statusArea.textContent = "Treasury: " + selectedField.treasury +
					"\nExpected income: " + game.state.incomeFor(origin as Position) +
					"\nUpkeep: " + AlysState.connectedPositions(origin, game.state.board)
					.mapNotNull { it.field.piece }
					.sumBy { game.state.upkeepFor(it) }
		}
		else {
			statusArea.textContent = "No base selected"
		}
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
		updateButtons()
	}

	private fun updateButtons() {
		val source = originPosition
		val base = if(source!= null) game.state.board[source] else null
		if (base?.treasury != null) {
			fortButton.disabled = buildType == AlysType.Fort || base.treasury < 15
			soldierButton.disabled = buildType == AlysType.Soldier || base.treasury < 10
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