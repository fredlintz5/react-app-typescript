import { CustomRouteProps } from './index'

import { UserList } from '../views/user/UserList';
import { UserProfile } from '../views/user/UserProfile';

export type RouteParams = {
  userGuid: string
}

const userRoutes :CustomRouteProps[] = [
  {
    name: 'UserList',
    exact: true,
    path: "/users",
    component: UserList
  },
  {
    name: 'UserProfile',
    exact: true,
    path: "/users/:userGuid",
    component: UserProfile
  },
];

export default userRoutes