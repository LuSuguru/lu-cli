import { lazy } from 'react'

const Main = lazy(() => import(/* webpackChunkName:"main" */'@/pages/main'))

export default [
  {
    path: '/',
    component: Main
  }
]
