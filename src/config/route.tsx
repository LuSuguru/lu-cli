import { lazy } from 'react'

const Main = lazy(() => import('@/pages/main'))

export default [
  {
    path: '/',
    component: Main
  }
]
