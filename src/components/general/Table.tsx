import { useEffect, useState, useMemo, useRef } from 'react'
import debounce from 'lodash/debounce'

import { Pagination, PaginationProps } from './Pagination'
import { Loader } from '../../components/general/Loader'

import './Table.css'

export interface TableProps {
  id?: string
  show?: boolean
  loading?: boolean
  hasSearch?: boolean
  placeholder?: string
  rows: Array<Object>
  columns: Array<Column>
  hasPagination?: boolean
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

export const Table = (props: TableProps) => {
  // props
  const {
    rows,
    columns,
    show = true,
    loading = false,
    hasSearch = false,
    placeholder = 'Search...',
    id: tableId = 'table',
    hasPagination = true,
  } = props;

  // data
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [sortedFilteredPaginatedRows, setSortedFilteredPaginatedRows] = useState<any[]>([]);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState<string>('');
  const [sortMap, setSortMap] = useState<SortMap>({ direction: Sort.NONE });
  const [showEmptyState, setShowEmptyState] = useState<boolean>(false);
  const [paginationProps, setPaginationProps] = useState<PaginationProps>({
    perPage,
    total: 0,
    id: 'user-list-table-pagination',
    currentPage: 0,
    setPerPage,
    setCurrentPage,
  })

  // hooks
  const searchRef = useRef<HTMLInputElement>(null)
  const debouncedFilter = useMemo(() => {
    return debounce(({ search, rows }) => {
      setFilteredRows(filterRows(search, rows))
      setCurrentPage(0)
    }, 600)
  }, []);
  
  useEffect(() => searchRef.current?.focus(), [searchRef, hasSearch, loading])
  useEffect(() => {
    setFilteredRows([...rows])
    setPaginationProps(p => ({ ...p, total: rows.length }))
  }, [rows])
  
  useEffect(() => {
    const lowerIndex = currentPage * perPage
    const upperIndex = lowerIndex + perPage
    const updatedRows = [...sortRows(sortMap, filteredRows)]
    const paginatedRows = updatedRows.filter((_, index) => index >= lowerIndex && index < upperIndex)
    
    setSortedFilteredPaginatedRows(paginatedRows)
    setPaginationProps(p => ({ ...p, total: updatedRows.length, currentPage, perPage }))
  }, [filteredRows, sortMap, perPage, currentPage])
  
  useEffect(() => setShowEmptyState(!filteredRows?.length), [filteredRows])
  
  // methods
  const handleSearchEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    const newValue = value?.trim().toLowerCase()
    setSearchText(newValue)
    debouncedFilter({ search: newValue, rows })
  }
  
  const changeSortDirection = (isSortable: boolean | undefined, sortField: string): void => {
    if (!isSortable) return;

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

  const filterRows = (search: string, rows: Object[]) => {
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

  const currentSortDirection = (sortField: string, sortMap: SortMap): Sort  => {
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
    <div className="table">
      {show ?
        <div>
          <Loader isLoading={loading}/>
          {hasSearch &&
            <input
              type="text"
              ref={searchRef}
              placeholder={placeholder}
              style={{width: '100%', boxSizing: 'border-box', padding: '0.65rem'}}
              value={searchText} onChange={e => handleSearchEvent(e)}/>}
          <table className={`table ${showEmptyState && 'empty-state'}`}>
            <thead>
              <tr>
                {!showEmptyState && columns.map(({ label, thClass, sortable, field }) => (
                  <th
                    className={`${thClass || ''} ${sortable ? 'sort' : ''}`}
                    key={`${tableId}-th-${label}`}
                    onClick={() => changeSortDirection(sortable, field)}>
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
                : sortedFilteredPaginatedRows.map(row => (
                <tr key={`${tableId}-tr-${row?.id}`}>{columns.map(({ field, clickAction }) => (
                  <td key={`${field}-${row.id}`}>
                    {clickAction
                      ? <button className="anchor" onClick={() => clickAction(row)}>{row[field]}</button>
                      : <div>{row[field]}</div>}
                  </td>))}
                </tr>))}
            </tbody>
          </table>
          {hasPagination && <Pagination {...paginationProps}/>}
        </div>
        : ''
      }
    </div> 
  )
}
