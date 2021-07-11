import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import UserService, { User } from '../../services/UserService';

import { Table, TableProps } from '../../components/general/Table';
import { PageHeader, PageHeaderProps } from '../../components/general/PageHeader'

export function UserList() {
  const history = useHistory();

  // state
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [tableData, setTableProps] = useState<TableProps>({
    rows: [],
    columns: [
      { label: 'Name', field: 'name', sortable: true, clickAction: ({ guid }: User) => history.push(`/users/${guid}`) },
      { label: 'Email', field: 'email', sortable: true },
      { label: 'Phone', field: 'phone', sortable: true },
      { label: 'Address', field: 'address' },
      { label: 'Company', field: 'company', sortable: true },
    ],
    id: 'user-list-table',
    placeholder: 'Search Users...',
    hasSearch: true,
  })
  const [pageHeaderProps] = useState<PageHeaderProps>({
    title: 'Users',
    heading: 'Users List',
    buttons: [{ label: 'Refresh List', id: 'users-list-refresh-button', onClick: () => getUsers() }],
    breadCrumbs: [{ name: 'Users', path: '/users'}]
  })

  // hooks
  useEffect(() => { getUsers() }, [])
  
  useEffect(() => {
    setTableProps(previousData => ({ ...previousData, loading: loadingUsers, rows: users }))
  }, [loadingUsers, users])

  // methods
  async function getUsers() {
    try {
      setLoadingUsers(true);
      const fetchedUsers = await UserService.listUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoadingUsers(false);
    }
  }

  return (
    <div className="users-list">
      <PageHeader {...pageHeaderProps} />
      <Table {...tableData}/>
    </div>
  )
}
