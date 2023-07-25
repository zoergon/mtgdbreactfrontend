import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useImperativeHandle, useFlexLayout, useExpanded, useResizeColumns, } from 'react-table'
// import { COLUMNS } from './ColumnsDecks'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'
// import DecksService from '../services/Decks'
// import DeckEdit from '../DeckEdit'
// import DecksList from '../DecksList'
// import MainDecksList from '../MainDecksList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faAngleUp
} from '@fortawesome/free-solid-svg-icons'

// parent: DecksList.jsx
//
// Latautuu DecksList.jsx:n useEffectin backendille lähettämän HttpGet-pyynnön jälkeen: DecksService.getDecksByLoginId(loggedInLoginId)
//
// Taulukko, joka näyttää kaikki käyttäjän deckit
// subRow/expandable -taulukko: TableAllDeckContents.js

export const TableDecks = ({ editDeckContents, setDeckName, setQuery, showDeck, setShowDeck, showDecks, setShowDecks,
    setIsPositive, setShowMessage, setMessage, accesslevelId,
    edit, setEdit, create, setCreate, editDeck, setEditDeck, deck, updateDeck, deleteDeck, tbodyData, renderRowSubComponent, expandRows,
    expandedRowObj }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    // const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.

    // const [rowData, setRowData] = useState(data) // Rividatan päivitykseen

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })

    // Tätä ei todennäköisesti tarvitse. (Checkboxin tai rivin klikkaamisessa asetetaan ko. rivi stateen.)
    const setRowToADeck = (deck) => {
        
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
        
        // {
        //     id: 'deckId', // luultavimmin voi poistaa
        //     Header: 'deckId',
        //     Footer: 'deckId',
        //     accessor: 'deckId',
        //     // Filter: ColumnFilter,
        //     // disableFilters: true
        //     maxWidth: 100,
        //     minWidth: 40,
        //     width: 80,
        // },
        {
            Header: 'Deck',
            Footer: 'Deck',
            accessor: 'name',
            maxWidth: 400,
            minWidth: 80,
            width: 250,
        },
        {
            Header: 'Format',
            Footer: 'Format',
            accessor: 'format.formatName',
            maxWidth: 350,
            minWidth: 80,
            width: 150,
        },
        // {
        //     Header: 'loginId',
        //     Footer: 'loginId',
        //     accessor: 'loginId',
        //     maxWidth: 100,
        //     minWidth: 40,
        //     width: 60,
        // },
        {
            maxWidth: 180,
            minWidth: 40,
            width: 140,
            Header: ('Actions'),
            // accessor: 'action',
            Cell: row => (
            <div>
                <button className='button' onClick={e=> handleEditDeckContents(row.row.original)}>Edit</button>
                <button className='button' onClick={e=> handleSettings(row.row.original)}>Settings</button>
                <button className='button' onClick={e=> handleDelete(row.row.original)}>Delete</button>
            </div>
            ),
          },
    ], [], )    

    // Käsittelee ko. riviltä painetun Edit-buttonin pyynnön & asettaa ko. rivin originaali datana parentin editDeckContents-funktioon    
    function handleEditDeckContents(row) {        
        setDeckName(row.name) // Deckin nimen näyttäminen
        setQuery(row.deckId) // query backendille deckId:llä
        // console.log("setQuery:", query)
        // setShowDeck(showDeck => !showDeck) // Vaihtaa boolean-arvoa & näyttää/ei näytä deckin sisältöä
        // setEditDeck(row)
        editDeckContents(row)
    }

    // Käsittelee ko. riviltä painetun Settings-nappulan pyynnön & asettaa ko. rivin originaali datan parentin updateDeck-funktioon
    function handleSettings(row) {
        // setEditDeck(row)
        updateDeck(row) // DecksList.jsx (parent)       
    }

    // Käsittelee ko. riviltä painetun Delete-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    function handleDelete(row) {        
        if (accesslevelId < 3) {
            deleteDeck(row) // DecksList.jsx (parent)
        } else {
            setMessage("Not allowed for the guests.")
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollaa ylös ruudun
      
            setTimeout(() => {
              setShowMessage(false)
            }, 2000)
        }   
    }   

    // rivin painalluksesta aukaisee deckin sisällön tablena alle <MainDecksListDeckId
    function handleShowDecks(row) {
        // console.log("row:", row)
        // setDeckName(row.name) // Deckin nimen näyttäminen tablessa
        // setQuery(row.deckId) // query backendille deckId:llä
        // setShowDecks(showDecks => !showDecks) // Vaihtaa boolean-arvoa & näyttää/ei näytä MainDecksListiä
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // footerGroups,
        rows, // Rivien laskemiseen taulukossa. Muu toiminta korvattu page:lla.
        page, // Mahdollistaa sivuttamisen. Esimerkissä rows korvattiin tällä.
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
          initialState: { pageIndex : 0 },          
        },
        useFlexLayout,
        useFilters,
        useGlobalFilter,
        useSortBy,
        useResizeColumns,
        useExpanded, // useExpanded plugin hook must be placed after the useSortBy plugin hook!
        usePagination,
        useColumnOrder,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // {
                // id: 'selection',
                // width: 40,
                // Header: ({ getToggleAllRowsSelectedProps }) => (
                //     <Checkbox {...getToggleAllRowsSelectedProps()} />
                // ),
                // Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} onClick={() => setRowToADeck(row.original)}/>
                // },
                {                    
                    maxWidth: 60,
                    minWidth: 40,
                    width: 40,
                    // Expander column
                    id: 'expander', // Make sure it has an ID
                    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? (<FontAwesomeIcon className="ms-3" icon={faAngleDown}/>) : (<FontAwesomeIcon className="ms-3" icon={faAngleRight}/>)}
                    </span>
                    ),                    
                    Cell: ({ row }) =>
                    // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                    // to build the toggle for expanding a row
                    // row.canExpand ? (
                        <span
                        {...row.getToggleRowExpandedProps({
                            style: {
                            // We can even use the row.depth property
                            // and paddingLeft to indicate the depth
                            // of the row
                            paddingLeft: `${row.depth * 2}rem`,
                            },
                        })}
                        >
                        {row.isExpanded ? (<FontAwesomeIcon className="ms-3" icon={faAngleDown}/>) : (<FontAwesomeIcon className="ms-3" icon={faAngleRight}/>)}                        
                        </span>
                    // ) : null,
                },
                ...columns
            ])
        }
      )

      const { globalFilter } = state
      const { pageIndex, pageSize } = state

      // Jos haluaa muuttaa kolumnien järjestystä.
      // Nämä ovat hard coodatut. Eikä buttoni muuta näitä takaisin alkuperäisiksi.
    //   const changeOrder = () => {
    //     setColumnOrder([
    //         'format',            
    //         'name',
    //         'deckId',          
    //         'loginId',
    //     ])
    //   }

    return (
        <>
        <React.Fragment>
            {/* <button className='button' onClick={changeOrder}>Change the column order</button>{' '} */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <div className='aligned'>
                {/* <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div> */}
                {allColumns.map(column => (
                    <div key={column.id}>
                        <label style={{background: 'transparent', color: 'orange'}} className='label'>
                            <input className='checkbox' type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                            {column.Header}
                        </label>
                    </div>
                ))}
                <br />
            </div>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <React.Fragment key={headerGroup.headers.length + "_hfrag"}>
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (                            
                                    // <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <th key={column.id} {...column.getHeaderProps()}>
                                        {/* {column.render('Header')}                                 */}
                                        <span {...column.getSortByToggleProps()}>
                                            {column.render('Header')}
                                            {/* {column.isSorted ? (column.isSortedDesc ? (<FontAwesomeIcon className="ms-3" icon={faAngleDown}/>) : (<FontAwesomeIcon className="ms-3" icon={faAngleUp}/>)) : ''} */}
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                        <div
                                            {...column.getResizerProps()}
                                            className="resizer"
                                        />
                                        {column.canResize && (
                                            <div
                                            {...column.getResizerProps()}
                                            className={`resizer ${
                                                column.isResizing ? "isResizing" : ""
                                            }`}
                                            />
                                        )}
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </th>                      
                                ))}
                            </tr>
                        </React.Fragment>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {                                
                        prepareRow(row)
                        // console.log("row:", row.original.deckId)
                        return (
                            <React.Fragment key={i + "_frag"}>
                                <tr key={row.original.deckId} {...row.getRowProps()} onClick={() => handleShowDecks(row.original)}>
                                {/* <tr key={row.original.deckId} {...row.getRowProps()}> */}
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                    <td onClick={() => handleShowDecks(row.original)}>
                                        <span className="subTableDecks">
                                        {renderRowSubComponent({ row })}                                        
                                        </span>
                                    </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
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
                    | Navigate : {' '}
                </span>
                <button className='button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleDoubleLeft} />
                </button>{' '}
                <button className='button' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleLeft}/>
                </button>{' '}
                <button className='button' onClick={() => nextPage()} disabled={!canNextPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleRight} />
                </button>{' '}
                <button className='button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleDoubleRight} />
                </button>{' '}
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
                    {' '} | Rows on page: {' '}
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
            {/* <pre>
            <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
            </pre> */}

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
        </React.Fragment>
        </>
    )
}