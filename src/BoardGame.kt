abstract class BoardGame<S : BoardGameState<T, A, P>, T, A, P> {
	abstract var state: S
	abstract val actionTypes: List<ActionType<S, A, *>>
	val players: MutableMap<P, Player<S, A>> = mutableMapOf()
	var winner: Player<S, A>? = null

	fun performAction(action: A): Result<*> {
		state = nextState(action).onFailure { return it }
		winner = players[state.findWinner()]
		return Result.success()
	}

	fun nextState(action: A): Result<S> {
		val actionType = (actionTypes.find { it.shouldPerform(state, action) }
				?: return Result.failure("Couldn't recognise action")) as ActionType<S, A, StateActionState<S>>
		val newState = copyState()
		val sas = actionType.readyAction(state, action, newState).onFailure {
			return Result.failure("Couldn't ${actionType.description} - ${it.error}")
		}
		actionType.perform(sas).onFailure {
			return Result.failure("Couldn't ${actionType.description} - ${it.error}")
		}
		return Success(newState)
	}

	abstract fun copyState(): S

	fun currentPlayer() = players[state.currentPlayer]
}

interface BoardGameState<T, A, P> {
	val board: Grid<T>
	var currentPlayer: P
	val players: List<P>

	fun findWinner(): P?
}

open class StateActionState<S>(val oldState: S, val newState: S)

open class StandardStateActionState<S, A>(oldState: S, val action: A, newState: S) : StateActionState<S>(oldState, newState)

typealias ActionStep<T> = T.() -> Result<Any?>

class ActionType<S, A, T : StateActionState<S>>(
		val description: String,
		val shouldPerform: (state: S, action: A) -> Boolean,
		val readyAction: (state: S, action: A, newState: S) -> Result<T>,
		val updateSteps: List<ActionStep<T>>
) {
	fun perform(sas: T): Result<Any?> {
		for (step in updateSteps)
			sas.step().onFailure { return it }
		return Result.success()
	}
}

abstract class Result<T> {
	companion object {
		fun success(): Success<Any?>{
			return Success(null)
		}
		fun <F> failure(error: String): Failure<F>{
			return Failure(error)
		}
		fun check(error: String, result: Boolean): Result<Any?> {
			if(result)
				return Success(null)
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
