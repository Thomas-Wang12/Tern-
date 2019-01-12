data class SquareGrid<T>(val width: Int, val height: Int, val init: (x: Int, y: Int) -> T, val fields: MutableList<T> = MutableList(width * height) { index -> init(index%width, index/width) }){

    operator fun get(x: Int, y: Int) = fields[x + width*y]
    operator fun set(x: Int, y: Int, value: T) {
        fields[x + width*y] = value
    }
}