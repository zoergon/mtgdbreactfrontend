import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useImperativeHandle, useFlexLayout, useBlockLayout, useAbsoluteLayout } from 'react-table'
import './table.css'
import { COLUMNS } from './ColumnsAllCards'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'

export const TableAllCards = ({ tbodyData }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })
    
    function handleShowDetails(row) {
        console.log(row)
    }

    // Käsittelee ko. riviltä painetun Deletee-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    // function handleDelete(row) {
    //     deleteDeck(row)
    // }

    // function handleShowDeck(row) {
    //     setQuery(row.deckId)
    //     setShowDecks(showDecks => !showDecks) // Vaihtaa boolean-arvoa & näyttää/ei näytä MainDecksListiä
    // }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, // Korvattu page:lla alla (mahdollistaa sivuttamisen)
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        selectedFlatRows,
        // state: { selectedRowIds }, // Tämä lisätty
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
        // useBlockLayout,
        // useAbsoluteLayout,
        useFlexLayout,
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
                width: 40,
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} onClick={() => console.log(row.original)}/>
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
            'set',
            'id',
            'name',
            'rarity',
            'setName',
            'manaCost',
            'typeLine',          
            'oracleText',
            'power',
            'toughness',
            'lang',
            'borderColor',
            'object',
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
                    <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (                            
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                    // console.log("row:", row.original.id)
                    return (                        
                        <tr key={row.original.id} {...row.getRowProps()} onClick={() => console.log(row.original)}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}                            
                        </tr>
                    )
                })}                
            </tbody>
            {/* <tfoot>
                {footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map(column => (
                            <td {...column.getFooterProps}>{column.render('Footer')}</td>
                        ))}
                    </tr>
                ))}
            </tfoot> */}
        </table>
        {/* <br /> */}
        <div>Showing {pageSize} results of {rows.length} rows total</div>
        <pre></pre>

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
                {[10, 25, 50, 100, 1].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
            </select>
        </div>

        {/* näyttää checkboxilla valittujen rivien flatrow-datan */}
        {/* <pre>
            <code>
            {JSON.stringify(
                {
                selectedFlatRows: selectedFlatRows.map(row => row.original)
                },
                null,
                2
            )}
            </code>
        </pre> */}

        </>
    )
}