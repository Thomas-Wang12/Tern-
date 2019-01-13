import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.events.MouseEvent

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
