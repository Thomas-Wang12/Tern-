import kotlinx.coroutines.CompletableDeferred

interface AIPlayable<A> {
	fun possibleActions(): List<A>
}

class Player<S, A>(var name: String = "Player", var color: String = "blue", var controller: PlayerController<S, A>)

interface PlayerController<S, A> {
	suspend fun requestAction(state: S): A
	fun endGame(state: S, won: Boolean)
}

class HumanController<S, A> : PlayerController<S, A>{
	var deferred: CompletableDeferred<A> = CompletableDeferred()

	override suspend fun requestAction(state: S): A {
		deferred = CompletableDeferred()
		return deferred.await()
	}

	override fun endGame(state: S, won: Boolean) {}

	fun performAction(action: A){
		deferred.complete(action)
	}
}

class RandomAIController<S : AIPlayable<A>, A> : PlayerController<S, A> {
	override suspend fun requestAction(state: S): A {
		val actions = state.possibleActions()
		return actions.random()
	}

	override fun endGame(state: S, won: Boolean) {}
}

class SimpleAIController<S : AIPlayable<A>, A>(val utility: (S, A) -> Int = {_,_ -> 1}) : PlayerController<S, A> {
	override suspend fun requestAction(state: S): A {
		val actions = state.possibleActions()
		val utilities = actions.map { utility(state, it) }
		val max = utilities.max() ?: actions.random()
		return actions.filterIndexed { i, _ -> utilities[i] == max }.random()
	}

	override fun endGame(state: S, won: Boolean) {}
}


abstract class PlayerType<S, A>(val name: String) {
	abstract fun isOfType(player: Player<S, A>): Boolean
	abstract fun getController(): PlayerController<S, A>
}

class HumanType<S, A> : PlayerType<S, A>("Human") {
	override fun isOfType(player: Player<S, A>): Boolean = player.controller is HumanController
	override fun getController() = HumanController<S, A>()
}

class RandomAIType<S : AIPlayable<A>, A> : PlayerType<S, A>("CPU - Weak") {
	override fun isOfType(player: Player<S, A>): Boolean = player.controller is RandomAIController
	override fun getController() = RandomAIController<S, A>()
}