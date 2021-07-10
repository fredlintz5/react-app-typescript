import { useEffect, useState } from 'react';

import { listUsers, User } from '../services/UserService';

import { Table, TableProps } from './../components/general/Table';

export const UserList = () => {
  // state
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [tableData, setTableProps] = useState<TableProps>({
    rows: [],
    columns: [
      { label: 'Name', field: 'name', sortable: true, clickAction: tableDataClickAction },
      { label: 'Email', field: 'email', sortable: true },
      { label: 'Phone', field: 'phone', sortable: true },
      { label: 'Address', field: 'address' },
      { label: 'Company', field: 'company', sortable: true },
    ],
    id: 'user-list-table',
    placeholder: 'Search Users...',
    hasSearch: true,
  })

  // hooks
  useEffect(() => { getUsers(); }, [])
  
  useEffect(() => {
    setTableProps(previousData => ({ ...previousData, loading: loadingUsers, rows: users }))
  }, [loadingUsers, users])

  // methods
  async function getUsers() {
    try {
      setLoadingUsers(true);
      const fetchedUsers = await listUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      console.log('Error', err);
    } finally {
      setLoadingUsers(false);
    }
  }

  function tableDataClickAction(row: User): void {
    console.log('tableDataClicked', row);
  }

  return (
    <div>
      <div className="is-flex mb-3">
        <h2 className="m-0">Users List</h2>
        <button className="button ml-auto" onClick={getUsers}>Refresh List</button>
      </div>
      <Table {...tableData}/>
    </div>
  )
}