import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLButtonElement
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement
import org.w3c.dom.events.Event
import kotlin.browser.document
import kotlin.browser.window

fun main(args: Array<String>) {
    val ticTacToeButton = document.createElement("button") as HTMLButtonElement
    ticTacToeButton.textContent = "Tic Tac Toe"
    document.body!!.appendChild(ticTacToeButton)

    val virusButton = document.createElement("button") as HTMLButtonElement
    virusButton.textContent = "Virus"
    document.body!!.appendChild(virusButton)

    val chessButton = document.createElement("button") as HTMLButtonElement
    chessButton.textContent = "Chess"
    document.body!!.appendChild(chessButton)

    val infoArea = document.createElement("div") as HTMLDivElement
    document.body!!.appendChild(infoArea)
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.canvas.width = window.innerWidth
    context.canvas.height = window.innerHeight
    document.body!!.appendChild(canvas)

    var game: GameDisplay? = null
    ticTacToeButton.addEventListener("click", {
        game?.end()
        game = TicTacToeDisplay(canvas, infoArea)
    })
    virusButton.addEventListener("click", {
        game?.end()
        game = VirusDisplay(canvas, infoArea)
    })
    chessButton.addEventListener("click", {
        game?.end()
        game = ChessDisplay(canvas, infoArea)
    })

}

interface GameDisplay {
    fun end()
}

data class Position(val x: Int, val y: Int)
