// import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import { UserList } from '../views/user/UserList';
import { UserProfile } from '../views/user/UserProfile';

const userRoutes :RouteProps[] = [
  {
    path: "/users",
    component: UserList
  },
  {
    path: "/users/:userId",
    component: UserProfile
  },
];

export default userRoutes