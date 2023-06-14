import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useImperativeHandle, useFlexLayout, useExpanded } from 'react-table'
// import { COLUMNS } from './ColumnsDecks'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'
// import DecksService from '../services/Decks'
// import DeckEdit from '../DeckEdit'
// import DecksList from '../DecksList'
// import MainDecksList from '../MainDecksList'

/////////////
//
// Tämä on ollut luultavimmin HARJOITUSTIEDOSTO expandablea varten.
//
// Tämän voi luultavimmin poistaa.
// (Vastaavat koodit pitäisi löytyä mm. -> TableDecks.js)
//
/////////////

export const TableDecksExpandable = ({ setDeckName, setQuery, showDecks, setShowDecks, edit, setEdit, create, setCreate, editDeck, deck, updateDeck, deleteDeck, tbodyData }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    // const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.

    const [aDeck, setADeck] = useState([]) // Tämä lisätty, todennäköisesti ei tarvitse.
    
    // const [rowData, setRowData] = useState(data) // Rividatan päivitykseen

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })

    // Tätä ei todennäköisesti tarvitse. (Checkboxin tai rivin klikkaamisessa asetetaan ko. rivi stateen.)
    const setRowToADeck = (deck) => {
        setADeck(deck)
        // console.log("setADeck:", aDeck)
      }

    // const onChangeInput = (e, deckId) => {
    //     const { name, value } = e.target

    //     const editData = rowData.map((item) =>
    //         item.deckId === deckId && name ? { ...item, [name]: value } : item
    //     )

    //     setRowData(editData)
    // }

    // Tämä oli alunperin ColumnsDecks.js:ssä
    const columns = useMemo(
        () => [
        {
            maxWidth: 60,
            minWidth: 40,
            width: 40,
            // Expander column
            id: 'expander', // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
            <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? 'V' : '>'}
            </span>
            ),
            Cell: ({ row }) =>
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            row.canExpand ? (
                <span
                {...row.getToggleRowExpandedProps({
                    style: {
                    // We can even use the row.depth property
                    // and paddingLeft to indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 1}rem`,
                    },
                })}
                >
                {row.isExpanded ? 'V' : '>'}
                </span>
            ) : null,
        },
        {
            id: 'deckId', // luultavimmin voi poistaa
            Header: 'deckId',
            Footer: 'deckId',
            accessor: 'deckId',
            // Filter: ColumnFilter,
            // disableFilters: true
            maxWidth: 80,
            minWidth: 40,
            width: 80,
        },
        {
            Header: 'Deck',
            Footer: 'Deck',
            accessor: 'name',
            maxWidth: 300,
            minWidth: 80,
            width: 250,
        },
        {
            Header: 'Format',
            Footer: 'Format',
            accessor: 'format',
            maxWidth: 200,
            minWidth: 80,
            width: 150,
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
            maxWidth: 120,
            minWidth: 40,
            width: 115,
            Header: ('Action'),
            // accessor: 'action',
            Cell: row => (
            <div>
               <button onClick={e=> handleEdit(row.row.original)}>Edit</button>{' '}
               <button onClick={e=> handleDelete(row.row.original)}>Delete</button>
            </div>
            ),
          },
    ], [] )

    // Käsittelee ko. riviltä painetun Edit-nappulan pyynnön & asettaa ko. rivin originaali datan parentin updateDeck-funktioon
    function handleEdit(row) {
        updateDeck(row)        
    }

    // Käsittelee ko. riviltä painetun Deletee-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    function handleDelete(row) {
        deleteDeck(row)
    }

    function handleShowDeck(row) {
        setDeckName(row.name)
        setQuery(row.deckId)
        setShowDecks(showDecks => !showDecks) // Vaihtaa boolean-arvoa & näyttää/ei näytä MainDecksListiä
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // footerGroups,
        rows, // Korvattu page:lla alla (mahdollistaa sivuttamisen)
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state: { expanded }, // expandable
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
        useExpanded, // useExpanded plugin hook must be placed after the useSortBy plugin hook!
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
                Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} onClick={() => setRowToADeck(row.original)}/>
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
                    // console.log("row:", row.original.deckId)
                    return (                        
                        <tr key={row.original.deckId} {...row.getRowProps()} onClick={() => handleShowDeck(row.original)}>
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
                {[10, 25, 50, 1].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
        <pre>
        <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
        </pre>

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