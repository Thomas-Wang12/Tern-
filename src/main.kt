import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement
import kotlin.browser.document
import kotlin.browser.window

fun main(args: Array<String>) {
    val infoArea = document.createElement("div") as HTMLDivElement
    document.body!!.appendChild(infoArea)
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.canvas.width = window.innerWidth
    context.canvas.height = window.innerHeight
    document.body!!.appendChild(canvas)

    // VirusDisplay(canvas, infoArea)
    TicTacToeDisplay(canvas, infoArea)

}

data class Position(val x: Int, val y: Int)
