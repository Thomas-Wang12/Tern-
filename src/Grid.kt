class Grid<T>(
		val width: Int,
		val height: Int,
		val init: (x: Int, y: Int) -> T,
		val fields: MutableList<T> = MutableList(width * height) { index -> init(index % width, index / width) }
) {

	operator fun get(x: Int, y: Int) = fields[x + width * y]
	operator fun get(position: Position) = fields[position.x + width * position.y]
	operator fun set(x: Int, y: Int, value: T) {
		fields[x + width * y] = value
	}

	operator fun set(position: Position, value: T) {
		fields[position.x + width * position.y] = value
	}

	fun copy(
			width: Int = this.width,
			height: Int  = this.height,
			init: (x: Int, y: Int) -> T = this.init,
			fields: MutableList<T> = this.fields.toMutableList()
	) : Grid<T> {
		return Grid(width, height, init, fields)
	}
}