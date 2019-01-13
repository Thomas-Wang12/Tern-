import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement

class TicTacToeDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) {
    var game = TicTacToeState()
    val squareDisplay = SquareGridDisplay(canvas)

    init {
        val getColor = { field: TicTacToeField ->
            when (field) {
                TicTacToeField.Cross -> "green"
                TicTacToeField.Circle -> "blue"
                TicTacToeField.Empty -> "white"
            }
        }
        squareDisplay.display(game.board, getColor)
        infoArea.textContent = "Current player: " + game.currentPlayer.toString()

        squareDisplay.registerOnClick {
            if(it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3) {
                val action = TicTacToeAction(game.currentPlayer, it.x, it.y)
                val newTicTacToe = game.nextState(action)
                if (newTicTacToe != null)
                    game = newTicTacToe
                squareDisplay.display(game.board, getColor)
                val winner = game.findWinner()
                if(winner != null)
                    infoArea.textContent = winner.toString() + " has won!"
                else
                    infoArea.textContent = "Current player: " + game.currentPlayer.toString()
            }
        }
    }
}
