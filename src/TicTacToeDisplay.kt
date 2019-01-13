import org.w3c.dom.*

class TicTacToeDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) : GameDisplay {
    var game = TicTacToeState()
    val squareDisplay = SquareGridDisplay(canvas)

    init {
        val getColor = { field: TicTacToeField ->
            "white"
        }
        val draw = { context: CanvasRenderingContext2D, fieldSize: Double, field: TicTacToeField, x: Int, y: Int ->
            context.fillStyle = "black"
            context.font = fieldSize.toString() + "px arial"
            context.textBaseline = CanvasTextBaseline.TOP
            when (field) {
                TicTacToeField.Cross -> context.fillText("X", 0.0, 0.0)
                TicTacToeField.Circle -> context.fillText("O", 0.0, 0.0)
            }
        }
        squareDisplay.display(game.board, getColor, draw)
        infoArea.textContent = "Current player: " + game.currentPlayer.toString()

        squareDisplay.onClick = {
            if (it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
                val action = TicTacToeAction(game.currentPlayer, it.x, it.y)
                val newTicTacToe = game.nextState(action)
                if (newTicTacToe != null)
                    game = newTicTacToe
                squareDisplay.display(game.board, getColor, draw)
                val winner = game.findWinner()
                if (winner != null)
                    infoArea.textContent = winner.toString() + " has won!"
                else
                    infoArea.textContent = "Current player: " + game.currentPlayer.toString()
            }
        }
    }

    override fun end() {
        squareDisplay.end()
    }
}
