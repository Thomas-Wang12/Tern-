import kotlin.math.min
import kotlin.random.Random

class AlysBoardCreator(width: Int, height: Int, val seed: Int) {
	val board: Grid<AlysField?> = Grid(width, height, { _, _ -> null })
	var numberOfCenters: Int = 3
	var landFraction: Double = 0.7

	fun generateLand() {
		val random = Random(seed)
		val remainingPositions = board.positions().toMutableList()
		val centers = generateCenters(remainingPositions, random)
		val createdFields = centers.toMutableList()
		val fieldsToCreate = (board.fields.size * landFraction).toInt()
		while(createdFields.size < fieldsToCreate) {
			val position = remainingPositions.random(random)
			if(position.adjacentHexes().any { createdFields.contains(it) }){
				createdFields.add(position)
				remainingPositions.remove(position)
			}
		}
		for(position in createdFields)
			board[position] = AlysField(0)
	}

	private fun generateCenters(remainingPositions: MutableList<Position>, random: Random): List<Position>{
		val centers = mutableListOf<Position>()
		for(i in 1..numberOfCenters){
			val index = (0 until remainingPositions.size).random(random)
			centers.add(remainingPositions.removeAt(index))
		}
		return centers
	}

	fun fillBoard(playerCount: Int) {
		val random = Random(seed)
		val remainingPositions = board.positionedFields().filter{ it.field != null }.map{it.position}.toMutableList()
		val averageFields = 1 + remainingPositions.size / playerCount
		var count = 0
		while(remainingPositions.size>0){
			for(player in 1..playerCount){
				if(count > 0.7 * (averageFields + averageFields * player.toDouble()/playerCount.toDouble()))
					continue
				if(remainingPositions.size == 0)
					break
				val index = (0 until remainingPositions.size).random(random)
				board[remainingPositions.removeAt(index)] = AlysField(player)
			}
			count++
		}

		val examinedArea = mutableListOf<PositionedField<AlysField>>()
		for (position in board.positions()) {
			if (examinedArea.any { it.position == position })
				continue
			val area = AlysState.connectedPositions(position, board)
			examinedArea.addAll(area)
			if (area.size < 2)
				continue
			val base = area.random(random)
			board[base.position] = base.field.copy(treasury = area.filter { it.field.piece == null }.size * 5)
		}

		val freeFields = board.positionedFields()
				.filter { it.field != null && it.field.piece == null && it.field.treasury == null}
				.map { PositionedField(it.position, it.field as AlysField) }
				.toMutableList()
		val trees = freeFields.size/10
		for(i in 1..trees){
			val bla = freeFields.random(random)
			freeFields.remove(bla)
			val piece = if(AlysState.adjacentFields(bla.position, board).size < 5)
				AlysPiece(AlysType.CoastTree)
			else
				AlysPiece(AlysType.Tree)
			board[bla.position] = bla.field.copy(piece = piece)
		}
	}
}
