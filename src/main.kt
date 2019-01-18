import org.w3c.dom.*
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window
import kotlin.math.min

fun main(args: Array<String>) {
	val header = document.getElementById("header") as HTMLElement
	val navigation = document.getElementById("navigation") as HTMLElement
	val control = document.getElementById("control") as HTMLElement
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
			gameDisplay: (canvas: HTMLCanvasElement, infoArea: HTMLElement) -> GameDisplay<*,*,*,*,*>,
			name: String,
			navElement: HTMLElement
	) {
		val button = document.createElement("button") as HTMLButtonElement
		button.textContent = name
		navElement.appendChild(button)
		button.addEventListener("click", {
			game?.end()
			header.textContent = name
			game = gameDisplay(canvas, control)
		})
	}

	addButton(::AlysDisplay, "Alys", navigation)
	addButton(::ChessDisplay, "Chess", navigation)
	addButton(::VirusDisplay, "Virus", navigation)
	addButton(::TicTacToeDisplay, "Tic Tac Toe", navigation)
}


data class Position(val x: Int, val y: Int) {
	fun add(i: Int, j: Int): Position {
		return Position(x + i, y + j)
	}

	fun adjacentHexes(): List<Position> {
		return listOf(hexNW(), hexNE(), hexW(), hexE(), hexSW(), hexSE())
	}

	fun hexNW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y - distance)
	fun hexNE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y - distance)
	fun hexW(distance: Int = 1) = Position(x - distance, y)
	fun hexE(distance: Int = 1) = Position(x + distance, y)
	fun hexSW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y + distance)
	fun hexSE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y + distance)

}
