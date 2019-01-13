import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLDivElement

class VirusDisplay(val canvas: HTMLCanvasElement, val infoArea: HTMLDivElement) {
    val players = mutableListOf("Player 1", "Player 2")
    var virus = VirusState()
    val squareDisplay = SquareGridDisplay(canvas)

    init {
        val getVirusColor = { field: Int ->
            when (field) {
                0 -> "white"
                1 -> "yellow"
                2 -> "red"
                else -> "green"
            }
        }
        squareDisplay.display(virus.board, getVirusColor)

        var sourcePosition: Position? = null

        squareDisplay.registerOnClick {
            if(it.x >= 0 && it.y >= 0 && it.x < virus.width && it.y < virus.height) {
                val source = sourcePosition
                if(source == null){
                    sourcePosition = Position(it.x, it.y)
                    println("source" + sourcePosition)
                }
                else {
                    sourcePosition = null
                    val action = VirusAction(source, Position(it.x, it.y))
                    println("destination" + Position(it.x, it.y))
                    val newState = virus.nextState(action)
                    if (newState != null)
                        virus = newState
                    squareDisplay.display(virus.board, getVirusColor)
                    val winner = virus.findWinner()
                    if(winner != null)
                        infoArea.textContent = players[winner - 1] + " has won!"
                    else
                        infoArea.textContent = "Current player: " + players[virus.currentPlayer -1 ]
                }
            }
        }
    }
}
