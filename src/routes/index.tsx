import users from './users'
import general from './general'
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom'

const routes :RouteProps[] = [
  ...users,
  ...general
]

export const RouterSwitch = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route: RouteProps, i) => {
          return (<RouteWithSubRoutes key={i} {...route} />)
        })}
      </Switch>
    </Router>
  )
}

function RouteWithSubRoutes(route: RouteProps) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (<>{route.component && <route.component {...props}/>}</>)}
    />
  );
}
