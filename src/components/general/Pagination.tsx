import { useEffect, useState } from 'react'

export interface PaginationProps {
  perPage?: number
  currentPage?: number
  pageOptions?: number[]
  total: number
  id: string
  setPerPage: Function
  setCurrentPage: Function
}

export const Pagination = (props: PaginationProps) => {
  const {
    total,
    setPerPage,
    setCurrentPage,
    perPage = 5,
    currentPage = 0,
    pageOptions = [5, 10, 20],
    id: paginationId = `pagination-${Date.now()}`
  } = props
  
  // state
  const [lowerIndex, setLowerIndex] = useState(currentPage * perPage)
  const [upperIndex, setUpperIndex] = useState(currentPage * perPage + perPage)

  // hooks
  useEffect(() => setPerPage(perPage), [perPage, setPerPage])
  useEffect(() => {
    setCurrentPage(currentPage)
    setLowerIndex(currentPage * perPage)
    setUpperIndex(currentPage * perPage + perPage)
  }, [currentPage, setCurrentPage, perPage])

  // methods
  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = e;
    setPerPage(Number(value));
    setCurrentPage(0);
  }
  const handleCurrentPageChange = (index: number) => {
    setCurrentPage(index);
  }

  return (
    <div className="pagination is-flex m-1 has-aligned-items-center">
      <div className="buttons">
        <button
          className="button"
          disabled={currentPage === 0}
          onClick={() => handleCurrentPageChange(currentPage - 1)}>&#60;</button>
        <button
          className="button"
          disabled={(currentPage + 1) * perPage >= total}
          onClick={() => handleCurrentPageChange(currentPage + 1)}>&#62;</button>
      </div>
      <div>Showing {lowerIndex + 1} - {upperIndex > total ? total : upperIndex}</div>
      <div className="ml-auto">
        <select className="p-1" value={perPage} onChange={(e) => handlePageChange(e)}>
          {pageOptions?.map(po => (
            <option value={po} key={`${paginationId}-${po}`}>{po} Per Page</option>
          ))}
        </select>
      </div>
    </div>
  )
}
