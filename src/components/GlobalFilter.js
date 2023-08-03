import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 500) // Kuinka pitkä viive on haun toteuttamiseen viimeisen muutoksen jälkeen
  return (
    <span>
      Search from all instances:{' '}
      <input
        className='input'      
        value={value || ''}
        placeholder='Type for the search...'
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      />
    </span>
  )
}