import React from 'react'

export const ColumnFilter = ({ column }) => {
    // Tässä puretaan columnista filterValue!
  const { filterValue, setFilter } = column
  return (
    <span>
      {' '}
      <input
        className='input'
        size="5"
        placeholder='Search...'
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}