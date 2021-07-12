import users from './users'
import general from './general'
import { BrowserRouter as Router, Route, RouteProps, Switch } from 'react-router-dom'
export interface CustomRouteProps extends RouteProps {
  name?: string
}

const routes :CustomRouteProps[] = [
  ...users,
  ...general
]

export const RouterSwitch = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route: CustomRouteProps, i) => {
          return <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            render={props => (<>{route.component && <route.component {...props}/>}</>)}
          />
        })}
      </Switch>
    </Router>
  )
}
