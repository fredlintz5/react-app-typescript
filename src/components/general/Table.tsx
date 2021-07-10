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
  thClass?: string
  sortable?: boolean
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
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [sortedFilteredRows, setSortedFilteredRows] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortMap, setSortMap] = useState<SortMap>({ direction: Sort.NONE });
  const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

  // hooks
  useEffect(() => setFilteredRows([...rows]), [rows])
  
  useEffect(() => {
    setSortedFilteredRows([...sortRows(sortMap, filteredRows)])
  }, [filteredRows, sortMap])
  
  useEffect(() => setShowEmptyState(!filteredRows?.length), [filteredRows])

  const debouncedFilter = useCallback(debounce(({ search, rows }) => setFilteredRows(filterRows(search, rows)), 1000), []);
  
  // methods
  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    const newValue = value?.trim().toLowerCase()
    setSearchText(newValue)
    debouncedFilter({ search: newValue, rows })
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
  }

  function filterRows (search: string, rows: Object[]) {
    return !!search.length
      ? rows.filter(r => !!Object.values(r).filter(v => `${v}`?.toLowerCase().includes(search)).length)
      : [...rows];
  }
  
  const sortRows = ({ field, direction }: SortMap, rowsToSort: Object[]) :Object[] => {
  
    return field && direction !== Sort.NONE
      ? [...rowsToSort].sort((a:any, b:any) => direction === Sort.ASC
        ? (b[field] > a[field]) ? -1 : 1
        : (b[field] < a[field]) ? -1 : 1)
      : [...rowsToSort];
  }
  
  const currentSortDirection = (sortField: string, sortMap: SortMap): Sort => {
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
                              <label className={`sort-direction ${currentSortDirection(field, sortMap)}`}></label>}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {showEmptyState
                      ? <tr><td>No Results Found.</td></tr>
                      : sortedFilteredRows.map(row => (
                      <tr key={`${tableId}-tr-${row?.id || Date.now}`}>{columns.map(({ field, clickAction }) => (
                        <td key={`${field}-${row.id}`}>
                          {clickAction
                            ? <button className="anchor" onClick={() => clickAction(row)}>{row[field]}</button>
                            : <div>{row[field]}</div>}
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
  id: `table-${Date.now()}`
};