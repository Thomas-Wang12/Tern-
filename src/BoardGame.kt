abstract class BoardGame<S : BoardGameState<T, A, P>, T, A, P> {
	abstract var state: S
	val players: MutableMap<P, Player> = mutableMapOf()
	var winner: Player? = null

	open fun performAction(action: A): Result<*> {
		state.confirmLegality(action).onFailure { return it }
		state = state.nextState(action) as S
		winner = players[state.findWinner()]
		return Result.success()
	}

	abstract fun copyState(): S

	fun currentPlayer(): Player? = players[state.currentPlayer]
}

interface BoardGameState<T, A, P> {
	val board: Grid<T>
	var currentPlayer: P
	val players: List<P>

	fun confirmLegality(action: A): Result<Any?>
	fun possibleActions(): List<A>
	fun nextState(action: A): BoardGameState<T, A, P>
	fun findWinner(): P?
}

abstract class Result<T> {
	companion object {
		fun success(): Success<Any?>{
			return Success(null)
		}
		fun <F> failure(error: String): Failure<F>{
			return Failure(error)
		}
	}

	inline fun onFailure(callback: (result: Failure<T>)-> T): T {
		return if(this is Failure)
			callback(this)
		else
			(this as Success).value
	}
}
class Success<T>(val value: T) : Result<T>()
class Failure<T>(val error: String) : Result<T>()

class Rule<S, A>(val description: String, val isLegal: (action: A, state: S) -> Boolean)
