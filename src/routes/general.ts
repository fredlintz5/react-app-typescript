import { CustomRouteProps } from './index'

import Home from '../views/Home';
import FourOhFour from '../views/FourOhFour';

const generalRoutes :CustomRouteProps[] = [
  {
    name: 'Home',
    path: "/",
    exact: true,
    component: Home
  },
  {
    name: '404',
    path: "*",
    component: FourOhFour
  },
];

export default generalRoutes