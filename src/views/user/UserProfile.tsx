import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { RouteParams as UserRouteParams } from "../../routes/users"
import UserService, { User } from "../../services/UserService"

import { Loader } from '../../components/general/Loader'
import { PageHeader, PageHeaderProps } from '../../components/general/PageHeader'

import './UserProfile.css'

export function UserProfile() {
  let { userGuid } = useParams<UserRouteParams>()

  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [user, setUser] = useState<User>()
  const [pageHeaderProps] = useState<PageHeaderProps>({
    title: 'Profile',
    heading: 'User Profile',
    breadCrumbs: [{ name: 'Users', path: '/users'}, { name: 'Profile', path: `/users/${userGuid}`}]
  })
  
  // hooks
  useEffect(() => { fetchUserByGuid(userGuid) }, [userGuid])

  // methods
  async function fetchUserByGuid(guid: string) {
    try {
      setLoadingUser(true);
      const fetchedUser = await UserService.getUser(guid);
      setUser(fetchedUser);
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoadingUser(false);
    } 
  } 

  return (
    <div className="user-profile">
      <Loader isLoading={loadingUser}/>
      <PageHeader {...pageHeaderProps} />
      {user && <pre>{JSON.stringify(user, null, 4)}</pre>}
    </div>
  )
}