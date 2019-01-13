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

    val virus = VirusDisplay(canvas, infoArea)

    /* TicTacToe
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
    }*/
}

data class Position(val x: Int, val y: Int)
