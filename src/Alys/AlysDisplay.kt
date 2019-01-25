import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.random.Random

class AlysDisplay(canvasContainer: HTMLElement, playerArea: HTMLElement, gameAreaTop: HTMLElement, gameAreaRight: HTMLElement)
	: GameDisplay<Alys, AlysState, AlysField?, AlysAction, Int>(canvasContainer, playerArea, gameAreaTop, gameAreaRight) {
	override var game = Alys()

	var originPosition: Position? = null
	var buildType: AlysType? = null
	val previousStates = mutableListOf<AlysState>()
	var selectedArea = listOf<Position>()
	private val fortButton = document.createElement("button") as HTMLButtonElement
	private val soldierButton = document.createElement("button") as HTMLButtonElement
	private val undoButton = document.createElement("button") as HTMLButtonElement
	private val endTurnButton = document.createElement("button") as HTMLButtonElement
	private val statusArea = document.createElement("div") as HTMLDivElement

	val images = mutableMapOf<String, HTMLImageElement>()

	val ruleArea = RuleArea("""Alys is a game about conquering an island.
			|<img src="assets/B.png" /> <img src="assets/S1.png" />
			|You expand your territory by recruiting soldiers in town and using them to take new fields. Towns, forts and soldiers all protect the fields next to them, which means you need stronger soldiers to take them.
			|<img src="assets/F.png" /> <img src="assets/T.png" />
			|Towns collect money from the surrounding area every turn, and allow you to buy soldier and forts. Forts provide more protection than towns, so higher rank soldiers are needed to take them. Soldiers are upgraded by moving onto each other.
		""".trimMargin(),
			listOf(
					RuleSection("Towns", """<img src="assets/B.png" /> <img src="assets/BR.png" />
							|Towns are the centers of your areas. Each area consisting of at least two fields will have a town, which collects the money you gain from the area. You can see those details in the top right corner.
							|
							|Towns let you recruit soldiers and build forts (select a town and press the corresponding button above the map, and then press the field where you want the fort/soldier). The flag lets you know when there's enough money to buy something.
							|
							|At the beginning of every turn, the town gains one money(?) per field in its area, except those that are overgrown. Then the upkeep for soldiers in the area is paid. If there's not enough money to pay your soldiers, they'll die and leave a grave.
							|
							|When two areas with a town each are connected, the town with the smaller treasury transfers its money to the other and disappears.
							|
							|A town protects the fields you own next to it, so a soldier of at least Veteran rank is needed to take it. When a town is destroyed, its treasury is lost.
						""".trimMargin()),
					RuleSection("Soldiers", """<img src="assets/S1.png" /> <img src="assets/S2.png" /> <img src="assets/S3.png" /> <img src="assets/S4.png" />
							|Soldiers are used to conquer the enemies' fields. They can move to any field neighbouring the area they are in. Like towns, soldiers protect the fields around them. Soldiers come in four ranks. Stronger soldiers beat weaker soldiers, but cost more upkeep.
							|
							|Upgrade a soldier by moving another soldier onto it.
							|<img src="assets/S1.png" /> <img src="assets/S1R.png" />
							|Recruits (upkeep 2) are only able to take undefended fields.
							|<img src="assets/S2.png" /> <img src="assets/S2R.png" />
							|Veterans (upkeep 6) can take fields defended by towns and recruits.
							|<img src="assets/S3.png" /> <img src="assets/S3R.png" />
							|Elites (upkeep 18) can take fields defended by forts and lower rank soldiers.
							|<img src="assets/S4.png" /> <img src="assets/S4R.png" />
							|Generals (upkeep 54) can take any field.
							|
							|A flag by a soldier means that it is ready to perform an action. Soldiers can generally only do one thing per turn, but are able to move freely between your empty fields.
						""".trimMargin()),
					RuleSection("Other details", """<img src="assets/F.png" />
							|Fort defend and area and cost no upkeep. Only a soldier of at least Knight rank can destroy it.
							|<img src="assets/T.png" /> <img src="assets/C.png" />
							|Some fields are overgrown by trees or bushes. Overgrown fields provide no money to the town in the area, but can be removed by soldiers
							|
							|Whenever an empty field is adjacent to two trees, the trees will spread to that area. Bushes only grow on coastal fields, and spread to adjacent empty coastal fields. Try not to get overwhelmed.
							|<img src="assets/G.png" />
							|Graves are left by soldiers when their upkeep wasn't paid. The following turn they'll overgrow and turn into either trees or bushes, depending on whether they're near the coast or not.
							|
							|The game is won when there are no enemy towns left.
						""".trimMargin())
			))

	override val getColor = getColor@{ _: AlysField?, x: Int, y: Int ->
		val origin = originPosition
		if (origin != null && origin.x == x && origin.y == y)
			return@getColor "white"
		val piece = game.state.board[x, y] ?: return@getColor "transparent"
		//if(Position(x,y) in selectedArea)
		//	return@getColor "red"
		val player = game.players[piece.player]
		if (player != null)
			return@getColor player.color
		return@getColor "white"
	}

	override val draw = draw@{ context: CanvasRenderingContext2D, fieldSize: Double, field: AlysField?, x: Int, y: Int ->
		val origin = originPosition
		if (field == null)
			return@draw
		context.lineWidth = 2.0
		if (Position(x, y) in selectedArea) {
			context.strokeStyle = "white"
			context.stroke(gridDisplay.hexPathOffset)
		}
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

		aiDelay = 0
		gridDisplay.gridColor = "#7df"
		gridDisplay.outerBorder = 50.0
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
		playerTypes.add(SimpleAlysAIPlayerType())
		players.add(HumanPlayer("Player 1", "#0b9"))
		players.add(SimpleAIPlayer("Player 2", "green", ::alysUtility))
		players.add(SimpleAIPlayer("Player 3", "yellowgreen", ::alysUtility))
		players.add(SimpleAIPlayer("Player 4", "yellow", ::alysUtility))
		players.add(SimpleAIPlayer("Player 5", "orange", ::alysUtility))

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
						selectField(it)
						return@click
					}
					val selectedArea = AlysState.connectedPositions(it, game.state.board)
					selectField(selectedArea.find { it.field.treasury != null }?.position)
					updateDisplay()
				} else {
					if (origin == it) {
						selectField(null)
						return@click
					}
					val sourceField = game.state.board[origin]
					val type = buildType
					var success = false
					val destination = game.state.board[it]
					if (sourceField?.piece?.type == AlysType.Soldier && destination?.treasury != null && destination.player == sourceField.player) {
						selectField(it)
						return@click
					} else if (sourceField?.piece?.type == AlysType.Soldier)
						success = performAction(AlysMoveAction(origin, it))
					else if (type != null)
						success = performAction(AlysCreateAction(type, origin, it))
					else if (sourceField?.treasury != null) {
						if (destination?.player == game.state.currentPlayer &&
								(destination.treasury != null || destination.piece?.type == AlysType.Soldier)) {
							selectField(it)
							return@click
						}
					}
					if (success) {
						selectField(null)
						val state = previousState
						if (state != null)
							previousStates.add(state)
					}
				}
			}
		}
	}

	fun selectField(position: Position?) {
		originPosition = position
		if (position != null)
			selectedArea = AlysState.connectedPositions(position, game.state.board).map { it.position }
		else {
			selectedArea = listOf()
			buildType = null
		}
		updateDisplay()
	}

	override val onShowGame: (() -> Unit)? = {
		val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
		context.imageSmoothingEnabled = false
		gameAreaTop.appendChild(undoButton)
		gameAreaTop.appendChild(soldierButton)
		gameAreaTop.appendChild(fortButton)
		gameAreaRight.appendChild(statusArea)
		gameAreaRight.appendChild(endTurnButton)
		ruleArea.showRules(gameAreaRight)
		resize()
	}

	override fun startNewGame() {
		game.players.clear()
		for (i in 1..players.size)
			game.players[i] = players[i - 1]
		game.newGame(seed = (0..100000).random())
		awaitActionFrom(game.currentPlayer())
		messageLine.textContent = ""
		updateDisplay()
	}

	override fun updateDisplay() {
		val winner = game.winner
		if (winner != null) {
			messageLine.textContent = winner.name + " has won after " + game.state.round + " rounds!"
			messageLine.className = "message-line"
		} else {
			turnLine.textContent = "Current player: " + game.currentPlayer()?.name
		}
		val origin = originPosition
		val selectedField = if (origin != null) game.state.board[origin] else null
		if (selectedField?.treasury != null) {
			statusArea.textContent = "Treasury: " + selectedField.treasury +
					"\nExpected income: " + game.state.incomeFor(origin as Position) +
					"\nUpkeep: " + AlysState.connectedPositions(origin, game.state.board)
					.mapNotNull { it.field.piece }
					.sumBy { game.state.upkeepFor(it) }
			if (buildType == AlysType.Soldier)
				statusArea.textContent += "\nCurrently hiring soldier"
			if (buildType == AlysType.Fort)
				statusArea.textContent += "\nCurrently building fort"
		} else {
			statusArea.textContent = "No town selected"
		}
		gridDisplay.display(game.state.board, getColor, draw)
		updatePlayerList()
		updateButtons()
	}

	private fun updateButtons() {
		val source = originPosition
		val base = if (source != null) game.state.board[source] else null
		if (base?.treasury != null) {
			fortButton.disabled = buildType == AlysType.Fort || base.treasury < 15
			soldierButton.disabled = buildType == AlysType.Soldier || base.treasury < 10
		} else {
			fortButton.disabled = true
			soldierButton.disabled = true
		}
		if (previousState?.currentPlayer != game.state.currentPlayer)
			previousStates.clear()
		undoButton.disabled = previousStates.isEmpty()
	}

	private fun hireSoldier(event: Event) {
		buildType = AlysType.Soldier
		updateButtons()
		statusArea.textContent += "\nCurrently hiring soldier"
	}

	private fun buildFort(event: Event) {
		buildType = AlysType.Fort
		updateButtons()
		statusArea.textContent += "\nCurrently building fort"
	}

	private fun undo(event: Event) {
		game.state = previousStates.removeAt(previousStates.size - 1)
		updateDisplay()
	}

	private fun endTurn(event: Event) {
		performAction(AlysEndTurnAction())
	}
}

class SimpleAlysAIPlayerType : PlayerType("CPU - So-so") {
	override fun isOfType(player: Player): Boolean = player is SimpleAIPlayer<*, *>
	override fun getNew(name: String, color: String) = SimpleAIPlayer(name, color, ::alysUtility)
}

private fun alysUtility(state: AlysState, action: AlysAction): Int {
	if (action is AlysEndTurnAction)
		return 0
	if (action is AlysMoveAction)
		return utilityFor(state, action)
	if (action is AlysCreateAction)
		return utilityFor(state, action)
	return 1
}

private fun utilityFor(state: AlysState, action: AlysMoveAction): Int {
	val destination = state.board[action.destination] as AlysField
	if (destination.piece != null) {
		return if (destination.player == state.currentPlayer) {
			when (destination.piece.type) {
				AlysType.Soldier -> if (isUpgradeWanted(state, PositionedField(action.destination, destination))) 10 else -1
				AlysType.Tree -> 3
				AlysType.CoastTree -> 10
				else -> 1
			}
		} else when (destination.piece.type) {
			AlysType.Soldier -> 5
			AlysType.CoastTree -> 9
			AlysType.Fort -> 5
			else -> 1
		}
	}
	return 0
}

private fun isUpgradeWanted(state: AlysState, place: PositionedField<AlysField>): Boolean {
	val strength = place.field.piece?.strength ?: return false
	if (place.field.piece.hasMoved)
		return false
	val area = AlysState.connectedPositions(place.position, state.board)
	if (!canAffordUpgrade(state, area, strength))
		return false
	val smallestDefense = AlysState.neighbouringPositions(area, state.board).map { state.totalDefenseOf(it) }.min()
			?: return false
	if (strength <= smallestDefense)
		return true
	return false
}

private fun canAffordUpgrade(state: AlysState, area: List<PositionedField<AlysField>>, strength: Int): Boolean {
	val oldUpkeep = state.upkeepFor(strength)
	val newUpkeep = state.upkeepFor(strength + 1)
	val base = area.find { it.field.treasury != null } ?: return false
	val income = state.incomeFor(base.position)
	val totalUpkeep = newUpkeep - oldUpkeep - 2 + area
			.mapNotNull { it.field.piece }
			.sumBy { state.upkeepFor(it) }
	return income + (base.field.treasury ?: 0) >= totalUpkeep
}

private fun utilityFor(state: AlysState, action: AlysCreateAction): Int {
	if (action.type == AlysType.Soldier)
		return utilityFor(state, AlysMoveAction(action.origin, action.destination))
	val adjacents = AlysState.adjacentFields(action.destination, state.board)
	val fortNearby = adjacents
			.filter { it.field.player == state.currentPlayer }
			.any { it.field.piece?.type == AlysType.Fort }
	if (fortNearby)
		return -1
	val enemyNearby = adjacents.any { it.field.player != state.currentPlayer } ||
			AlysState.neighbouringPositions(adjacents, state.board).any { it.field.player != state.currentPlayer }
	return if (enemyNearby) 3 else -1
}
