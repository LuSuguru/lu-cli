import { useReducer, useCallback } from 'react'

export type StatesHook<State> = [State, (action: Action<State> | ActionFunction<State>) => void, () => void]


type Action<State> = { [key in keyof State]?: State[key] }
type ActionFunction<State> = (state: State) => Action<State>


function stateReducer<State>(state: State, newState: Action<State> | ActionFunction<State>): State | {} {
  if (typeof newState === 'function') {
    newState = newState(state)
  }

  return { ...state, ...newState }
}

export default function <State> (initialState: State, reducer = stateReducer): StatesHook<State> {
  const [state, setState] = useReducer(reducer, initialState)

  const onReset = useCallback(() => {
    setState(initialState)
  }, [])

  return [state as State, setState, onReset]
}
