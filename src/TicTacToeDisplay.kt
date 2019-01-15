import org.w3c.dom.*

class TicTacToeDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) : GameDisplay {
    var game = TicTacToe()
    val squareDisplay = SquareGridDisplay(canvas)

    init {
        game.players[TicTacToeField.Cross] = "Cross"
        game.players[TicTacToeField.Circle] = "Circle"
        val getColor = { _: TicTacToeField, _: Int, _: Int ->
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
        squareDisplay.display(game.state.board, getColor, draw)
        infoArea.textContent = "Current player: " + game.players[game.state.currentPlayer]

        squareDisplay.onClick = {
            if (it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
                val action = TicTacToeAction(game.state.currentPlayer, it.x, it.y)

                val succeeded = game.performAction(action)
                val winner: String? = game.players[game.winner]
                if(winner != null)
                    infoArea.textContent = winner + " has won!"
                else
                    infoArea.textContent = "Current player: " + game.players[game.state.currentPlayer]
                squareDisplay.display(game.state.board, getColor, draw)
            }
        }
    }

    override fun end() {
        squareDisplay.end()
    }
}
