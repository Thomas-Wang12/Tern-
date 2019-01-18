import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

fun main(args: Array<String>) {
	val header = document.getElementById("header") as HTMLElement
	val navigation = document.getElementById("navigation") as HTMLElement
	val playerArea = document.getElementById("player-area") as HTMLElement
	val gameArea = document.getElementById("game-area") as HTMLElement
	val canvas = document.getElementById("canvas") as HTMLCanvasElement

	val dpr = window.devicePixelRatio
	val element = canvas.parentElement as HTMLElement
	val styleSize = (min(element.clientWidth, window.innerHeight - navigation.clientHeight)* dpr).toInt()
	val size = (styleSize * dpr).toInt()
	canvas.style.width = styleSize.toString() + "px"
	canvas.style.height = styleSize.toString() + "px"
	canvas.width = size
	canvas.height = size
	val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
	context.scale(dpr, dpr)

	var game: GameDisplay<*, *, *, *, *>? = null

	fun addButton(
			gameDisplay: (HTMLCanvasElement, HTMLElement, HTMLElement) -> GameDisplay<*,*,*,*,*>,
			name: String,
			navElement: HTMLElement
	) {
		val button = document.createElement("button") as HTMLButtonElement
		button.textContent = name
		navElement.appendChild(button)
		button.addEventListener("click", {
			game?.end()
			header.textContent = name
			game = gameDisplay(canvas, playerArea, gameArea)
		})
	}

	addButton(::AlysDisplay, "Alys", navigation)
	addButton(::ChessDisplay, "Chess", navigation)
	addButton(::VirusDisplay, "Virus", navigation)
	addButton(::TicTacToeDisplay, "Tic Tac Toe", navigation)
}
