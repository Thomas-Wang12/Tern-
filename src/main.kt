import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document
import kotlin.browser.window

fun main(args: Array<String>) {
    val getTicTacToeColor = { field: TicTacToeField ->
        when(field){
            TicTacToeField.Cross -> "green"
            TicTacToeField.Circle -> "blue"
            TicTacToeField.Empty -> "white"
        }
    }
    val display = SquareGridDisplay(getOrCreateCanvas().getContext("2d") as CanvasRenderingContext2D)

    var ticTacToe = TicTacToeState()

    display.display(ticTacToe.board, getTicTacToeColor)

    val newTicTacToe = ticTacToe.nextState(TicTacToeAction(TicTacToeField.Cross, 1,1))
    if(newTicTacToe != null)
        ticTacToe = newTicTacToe

    display.display(ticTacToe.board, getTicTacToeColor)
}

var canvas: HTMLCanvasElement? = null
fun getOrCreateCanvas(): HTMLCanvasElement {
    val c = canvas
    if(c != null)
        return c
    val c2 = initializeCanvas()
    canvas = c2
    return c2
}

fun initializeCanvas(): HTMLCanvasElement {
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.canvas.width  = window.innerWidth.toInt();
    context.canvas.height = window.innerHeight.toInt();
    document.body!!.appendChild(canvas)
    return canvas
}

class SquareGridDisplay(val context: CanvasRenderingContext2D) {
    var fieldSize = 10.0
    var showGridLines = false

    fun <T> display(grid: SquareGrid<T>, fillStyle: (T) -> String){
        for(y in 0 until grid.height) {
            for (x in 0 until grid.width){
                context.fillStyle = fillStyle(grid[x,y])
                context.fillRect(x.toDouble() * fieldSize, y.toDouble() * fieldSize, fieldSize, fieldSize)
            }
        }
    }
}
