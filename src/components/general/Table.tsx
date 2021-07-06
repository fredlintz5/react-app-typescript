import { useEffect, useState, useCallback, FunctionComponent } from 'react'
import debounce from 'lodash/debounce'

import './Table.css'

export interface TableProps {
  id?: string
  show?: boolean
  loading?: boolean
  hasSearch?: boolean
  rows: Array<Object>
  columns: Array<Column>
}

export interface Column {
  label: string
  field: string
  sortable?: boolean
  thClass?: string
  clickAction?: Function
}

interface SortMap {
  field?: string | undefined
  direction?: Sort | undefined
}

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
  NONE = 'NONE',
}

export const Table: FunctionComponent<TableProps> = (props: TableProps) => {
  // props
  const { show, rows, columns, id: tableId, hasSearch, loading = false } = props;

  // data
  const [localRows, setLocalRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortMap, setSortMap] = useState<SortMap>({ direction: Sort.NONE });
  const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

  // hooks
  useEffect(() => setLocalRows([...rows]), [rows])
  useEffect(() => setShowEmptyState(!localRows?.length), [localRows])

  const debouncedFilter = useCallback(debounce(search => filterRows(search), 1000), []);
  
  // methods
  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    const newValue = value?.trim().toLowerCase()
    setSearchText(newValue)
    // filterRows(newValue)
    debouncedFilter(newValue)
  }

  const currentSortDirection = (sortField: string): Sort => {
    const { field, direction } = sortMap;

    if (field === sortField) {
      if (direction === Sort.ASC) {
        return Sort.ASC
      }
      if (direction === Sort.DESC) {
        return Sort.DESC
      }
    }
    return Sort.NONE
  }
  
  const changeSortDirection = (sortField: string): void => {
    const { field, direction } = sortMap;
    let newDirection = Sort.ASC;

    if (sortField === field) {
      if (direction === Sort.DESC) {
        newDirection = Sort.NONE
      }
      if (direction === Sort.ASC) {
        newDirection = Sort.DESC
      }
    }
    setSortMap({ field: sortField, direction: newDirection })
    sortRows()
  }

  function filterRows (search: string) {
    const filteredRows = !!search.length
      ? [...rows].filter(r => !!Object.values(r).filter(v => `${v}`?.toLowerCase().includes(search)).length)
      : [...rows];

    setLocalRows(filteredRows)
  }

  const sortRows = () => {
    const { field, direction } = sortMap

    const sortedRows = field && direction !== Sort.NONE
      ? [...localRows].sort((a: any, b: any) => direction === Sort.ASC
        ? (b[field] > a[field]) ? -1 : 1
        : (b[field] < a[field]) ? -1 : 1)
      : [...localRows];

    setLocalRows(sortedRows)
  }

  return (
    <div>
      {show ?
        <div>
          {loading
            ? <div className="loading"><div className="loader"></div></div>
            : <div>
                {hasSearch &&
                  <input
                    type="text"
                    placeholder="Search..."
                    style={{width: '100%', boxSizing: 'border-box', padding: '0.65rem'}}
                    value={searchText} onChange={e => handleSearchEvent(e)}/>}
                <table className={`table ${showEmptyState && 'empty-state'}`}>
                  <thead>
                    <tr>
                      {!showEmptyState && columns.map(({ label, thClass, sortable, field }) => (
                        <th
                          className={`${thClass || ''} ${sortable ? 'sort' : ''}`}
                          key={`${tableId}-th-${label}-${Date.now()}`}
                          onClick={() => changeSortDirection(field)}>
                            <label>{label}</label>
                            {sortable &&
                              <label className={`sort-direction ${currentSortDirection(field)}`}></label>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {showEmptyState
                      ? <tr><td>No Results Found.</td></tr>
                      : localRows.map(lr => (
                      <tr key={`${tableId}-tr-${lr?.id || Date.now}`}>{columns.map(({ field, clickAction }) => (
                        <td key={`${field}-${lr.id}`}>
                          {clickAction
                            ? <button className="anchor" onClick={() => clickAction(lr)}>{lr[field]}</button>
                            : <div>{lr[field]}</div>}
                        </td>))}
                      </tr>))}
                  </tbody>
                </table>
              </div>
          }
        </div>
        : ''
      }
    </div> 
  )
}

Table.defaultProps = {
  show: true,
  loading: false,
  hasSearch: false,
  id: `unnamed-table-${Date.now()}`
};