import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.MouseEvent
import kotlin.browser.document
import kotlin.browser.window

fun main(args: Array<String>) {
    val getTicTacToeColor = { field: TicTacToeField ->
        when (field) {
            TicTacToeField.Cross -> "green"
            TicTacToeField.Circle -> "blue"
            TicTacToeField.Empty -> "white"
        }
    }
    val display = SquareGridDisplay(getOrCreateCanvas())

    var ticTacToe = TicTacToeState()
    display.display(ticTacToe.board, getTicTacToeColor)

    display.registerOnClick {
        println( it.x.toString() + " " + it.y.toString())
        if(it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
            val action = TicTacToeAction(ticTacToe.currentPlayer, it.x, it.y)
            val newTicTacToe = ticTacToe.nextState(action)
            if (newTicTacToe != null)
                ticTacToe = newTicTacToe
            display.display(ticTacToe.board, getTicTacToeColor)
            val winner = ticTacToe.findWinner()
            if(winner != null)
                println(winner.toString() + " has won!")
        }
    }

    /*display.display(ticTacToe.board, getTicTacToeColor)

    val newTicTacToe = ticTacToe.nextState(TicTacToeAction(TicTacToeField.Cross, 1, 1))
    if (newTicTacToe != null)
        ticTacToe = newTicTacToe

    display.display(ticTacToe.board, getTicTacToeColor)*/
}

var canvas: HTMLCanvasElement? = null
fun getOrCreateCanvas(): HTMLCanvasElement {
    val c = canvas
    if (c != null)
        return c
    val c2 = initializeCanvas()
    canvas = c2
    return c2
}

fun initializeCanvas(): HTMLCanvasElement {
    val canvas = document.createElement("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    context.canvas.width = window.innerWidth
    context.canvas.height = window.innerHeight
    document.body!!.appendChild(canvas)
    return canvas
}

class SquareGridDisplay(val canvas: HTMLCanvasElement) {
    val context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D
    var fieldSize = 40.0
    var gridThickness = 1

    fun <T> display(grid: SquareGrid<T>,
                    fillStyle: (T) -> String,
                    draw: ((context: CanvasRenderingContext2D, fieldSize: Double, field: T, x: Int, y: Int) -> Unit)? = null ) {
        context.fillStyle = "black"
        if (gridThickness > 0)
            context.fillRect(0.0, 0.0,
                    grid.height * (fieldSize + gridThickness) + gridThickness,
                    grid.width * (fieldSize + gridThickness) + gridThickness)
        for (y in 0 until grid.height) {
            for (x in 0 until grid.width) {
                context.fillStyle = fillStyle(grid[x, y])
                context.fillRect(
                        gridThickness + x.toDouble() * (fieldSize + gridThickness),
                        gridThickness + y.toDouble() * (fieldSize + gridThickness),
                        fieldSize, fieldSize)
                if(draw != null){
                    context.save()
                    context.translate(
                            gridThickness + x.toDouble() * (fieldSize + gridThickness),
                            gridThickness + y.toDouble() * (fieldSize + gridThickness))
                    draw(context, fieldSize, grid[x, y], x, y)
                    context.restore()
                }
            }
        }
    }

    fun registerOnClick(onClick: (Position)-> Unit){
        canvas.addEventListener("click", {
            val bla = it as MouseEvent
            val gridPosition = gridCoordsAt(bla.offsetX.toInt(), bla.offsetY.toInt())
            if(gridPosition != null)
                onClick(gridPosition)
        })
    }

    fun gridCoordsAt(canvasX: Int, canvasY: Int): Position? {
        val localX = canvasX %(fieldSize + gridThickness)
        val localY = canvasY %(fieldSize + gridThickness)
        if(localX < gridThickness || localY < gridThickness)
            return null
        val gridX = (canvasX/(fieldSize + gridThickness)).toInt()
        val gridY = (canvasY/(fieldSize + gridThickness)).toInt()
        return Position(gridX, gridY)
    }
}

data class Position(val x: Int, val y: Int)
