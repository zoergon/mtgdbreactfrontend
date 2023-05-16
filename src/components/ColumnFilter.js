import React from 'react'

export const ColumnFilter = ({ column }) => {
    // Tässä puretaan columnista filterValue!
  const { filterValue, setFilter } = column
  return (
    <span>
      {' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}