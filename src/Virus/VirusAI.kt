class SimpleVirusAIType : PlayerType<VirusState, VirusAction>("CPU - Medium") {
	override fun isOfType(player: Player<VirusState, VirusAction>): Boolean = player.controller is SimpleAIController
	override fun getController() = SimpleAIController(::virusUtility)
}

private fun virusUtility(state: VirusState, action: VirusAction): Int {
	val currentDifference = state.board.fields.filter { it == state.currentPlayer }.size
	- state.board.fields.filter { it != state.currentPlayer  && it != 0}.size
	val nextState = Virus(state).nextState(action).onFailure { return 0 }
	val nextDifference = nextState.board.fields.filter { it == state.currentPlayer }.size
	- nextState.board.fields.filter { it != state.currentPlayer  && it != 0}.size
	return nextDifference - currentDifference
}
