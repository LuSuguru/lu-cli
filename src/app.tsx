import React, { Suspense, memo } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Route as IRoute } from './interface/route'
import { Loading } from '@/components'
import routes from './config/route'

function App() {
  function renderRoutes(routes: IRoute[], contextPath: string) {
    const children = []
    let redirect = null

    function renderRoute(item: IRoute, routeContextPath: string) {
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      if (item.component && item.childRoutes) {
        const childRoutes = renderRoutes(item.childRoutes, newContextPath)

        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props}>{childRoutes}</item.component>}
            path={newContextPath} />
        )
      } else if (item.component) {
        if (item.isIndex) {
          redirect = (
            <Redirect
              key={`${newContextPath}_index`}
              to={{ pathname: newContextPath }}
              path={routeContextPath} />
          )
        }

        children.push(
          <Route
            key={newContextPath}
            render={props => <item.component {...props} />}
            path={newContextPath}
            exact />
        )
      } else if (item.childRoutes) {
        item.childRoutes.forEach(r => renderRoute(r, newContextPath))
      }
    }

    routes.forEach(item => renderRoute(item, contextPath))

    if (redirect) {
      children.push(redirect)
    }

    return <Switch>{children}</Switch>
  }

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        {renderRoutes(routes, '/')}
      </Router>
    </Suspense>
  )
}

export default memo(App)
