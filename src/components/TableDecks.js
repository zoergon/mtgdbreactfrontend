import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder } from 'react-table'
import { COLUMNS } from './ColumnsDecks'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'

export const TableDecks = ({ tbodyData }) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [])

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        // rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        selectedFlatRows,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        setGlobalFilter,
        setColumnOrder,
        allColumns,
        getToggleHideAllColumnsProps
      } = useTable(
        {
          columns,
          data,
          defaultColumn,
          initialState: { pageIndex : 0 }          
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useColumnOrder,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
                },
                ...columns
            ])
        }
      )

      const { globalFilter } = state
      const { pageIndex, pageSize } = state

      // Jos haluaa muuttaa kolumnien järjestystä.
      // Nämä ovat hard coodatut. Eikä buttoni muuta näitä takaisin alkuperäisiksi.
      const changeOrder = () => {
        setColumnOrder([
            'format',            
            'name',
            'deckId',          
            'loginId',
        ])
      }

    return (
        <>
        <button onClick={changeOrder}>Change column order</button>{' '}
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <div className='aligned'>
            <div>
            <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
            </div>
            {allColumns.map(column => (
            <div key={column.id}>
                <label>
                <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                {column.Header}
                </label>
            </div>
            ))}
            <br />
        </div>

        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                                <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>                      
                        ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}                
            </tbody>
            <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>

        <pre>
            <code>
            {JSON.stringify(
                {
                selectedFlatRows: selectedFlatRows.map(row => row.original)
                },
                null,
                2
            )}
            </code>
        </pre>

        <div>
            <span>
                Page {''}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>{' '}
            <span>
                | Go to page:{' '}
                <input
                    type='number'
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(pageNumber)
                    }}
                    style={{ width: '50px' }}
                />
            </span>{' '}
            <select
                value={pageSize}
                onChange={e => setPageSize(Number(e.target.value))}>
                {[10, 25, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
        </>
    )
}