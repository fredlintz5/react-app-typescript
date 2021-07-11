import { RouteProps } from 'react-router-dom'

import Home from '../views/Home';
import FourOhFour from '../views/FourOhFour';

const generalRoutes :RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "*",
    component: FourOhFour
  },
];

export default generalRoutes