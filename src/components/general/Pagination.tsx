import { FunctionComponent, useEffect, useState } from 'react'

export interface PaginationProps {
  perPage?: number
  currentPage?: number
  pageOptions?: number[]
  total: number
  id: string
  setPerPage: Function
}

export const Pagination: FunctionComponent<PaginationProps> = (props: PaginationProps) => {
  const { perPage, pageOptions, setPerPage } = props
  
  // state
  const [localPerPage, setLocalPerPage] = useState(perPage)

  // hooks
  useEffect(() => setPerPage(localPerPage), [localPerPage, setPerPage])

  // methods
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = e;
    setLocalPerPage(Number(value));
  }

  
  return (
    <div>
      <select className="is-block ml-auto p-1 mt-1" value={localPerPage} onChange={(e) => handlePageChange(e)}>
        {pageOptions?.map(po => (
          <option value={po} key={po}>{po}</option>
        ))}
      </select>
    </div>
  )
}

Pagination.defaultProps = {
  perPage: 5,
  currentPage: 0,
  pageOptions: [5, 10, 20],
  id: `pagination-${Date.now()}`
};