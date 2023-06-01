import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useFlexLayout } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'
// import MainDecksService from '../services/MainDecks'
// import MainDeckEdit from '../MainDeckEdit'
// import MainDecksList from '../MainDecksList'

export const TableMainDecks = ({ deckName, edit, setEdit, create, setCreate, editCard, card, updateCard, deleteCard, tbodyData }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    // const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })   

    // Tämä oli alunperin ColumnsDecks.js:ssä
    const columns = useMemo(
        () => [
        {
            id: 'indexId', // luultavimmin voi poistaa
            Header: 'indexId',
            Footer: 'indexId',
            accessor: 'indexId',
            // Filter: ColumnFilter,
            // disableFilters: true
            maxWidth: 80,
            minWidth: 40,
            width: 70,
        },
        {
            Header: 'deckId',
            Footer: 'deckId',
            accessor: 'deckId',
            maxWidth: 60,
            minWidth: 40,
            width: 70,      
        },
        {
            Header: 'Deck',
            Footer: 'Deck',
            accessor: 'deck',
            maxWidth: 250,
            minWidth: 80,
            width: 200,
        },
        {
            Header: 'Card',
            Footer: 'Card',
            accessor: 'name',
            maxWidth: 250,
            minWidth: 40,
            width: 250,
        },
        {
            Header: 'Set',
            Footer: 'Set',
            accessor: 'setName',
            maxWidth: 250,
            minWidth: 40,
            width: 250,
        },
        {
            Header: 'id',
            Footer: 'id',
            accessor: 'id',
        },
        {
            Header: 'count',
            Footer: 'count',
            accessor: 'count',
            maxWidth: 60,
            minWidth: 40,
            width: 60,
        },
        {
            Header: 'loginId',
            Footer: 'loginId',
            accessor: 'loginId',
            maxWidth: 60,
            minWidth: 40,
            width: 60,
        },
        {            
            maxWidth: 100,
            minWidth: 60,
            width: 80,
            Header: ('Actions'),
            // accessor: 'action',
            Cell: row => (
            <div>
               <button onClick={e=> handleEdit(row.row.original)}>Edit</button>{' '}
               <button onClick={e=> handleDelete(row.row.original)}>Delete</button>
            </div>
            ),
          },
    ], [], )

    // Käsittelee ko. riviltä painetun Edit-nappulan pyynnön & asettaa ko. rivin originaali datan parentin updateDeck-funktioon
    function handleEdit(row) {
        // console.log(row)
        updateCard(row)        
    }

    // Käsittelee ko. riviltä painetun Deletee-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    function handleDelete(row) {
        // console.log(row)
        deleteCard(row)
    }

    function handleShowCard(row) {
        console.log(row)
        // showCard(row)        
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        // rows, // Korvattu page:lla alla (mahdollistaa sivuttamisen)
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
            'count',            
            'id',
            'deckId',
            'indexId',
            'loginId',
        ])
      }

    return (
        <>
        <label className="deckHeadlineStyles">Deck:</label><label className="deckNameStyles">{deckName}</label>{' '}
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />{' '}
        <button onClick={changeOrder}>Change column order</button>{' '}        

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
                    // console.log("row:", row.original.indexId)
                    return (                        
                        <tr key={row.original.indexId} {...row.getRowProps()} onClick={() => handleShowCard(row.original)}>
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