data class Position(val x: Int, val y: Int) {
	fun add(i: Int, j: Int): Position {
		return Position(x + i, y + j)
	}

	fun adjacentHexes(): List<Position> {
		return listOf(hexNW(), hexNE(), hexW(), hexE(), hexSW(), hexSE())
	}

	fun hexNW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y - distance)
	fun hexNE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y - distance)
	fun hexW(distance: Int = 1) = Position(x - distance, y)
	fun hexE(distance: Int = 1) = Position(x + distance, y)
	fun hexSW(distance: Int = 1) = Position(x - distance/2 + if((y+distance)%2==0) -1 else 0, y + distance)
	fun hexSE(distance: Int = 1) = Position(x + distance/2 + if((y+distance)%2==0) 0 else 1, y + distance)
}
