import { useState, useCallback, MouseEvent, Dispatch, SetStateAction } from 'react'

// 开关Hook
export default function (initialState: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [state, setState] = useState(initialState)

  const toggle = useCallback((e?: MouseEvent<HTMLElement>) => {
    if (e && e.stopPropagation) {
      e.stopPropagation()
    }

    setState(state => !state)
  }, [])

  return [state, toggle, setState]
}
