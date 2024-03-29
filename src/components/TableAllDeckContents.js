import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useFlexLayout, useResizeColumns } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
// import { Checkbox } from './Checkbox'
// import MainDecksService from '../services/MainDecks'
// import MainDeckEdit from '../MainDeckEdit'
// import MainDecksList from '../MainDecksList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons'

// parent: AllDeckContents.jsx
//      parent: DecksList.jsx
//
// Aukeaa TableDecsk.js:n riviä/rivit laajentamalla
// Data tulee AllDeckContents.jsx:n useEffectin (x)Service.getByDeckId(query) jälkeen
//
// subRow/expandable -taulukko TableDecks.js:lle
// Näyttää yhden deckin koko sisällön laajennetussa alirivissä TableDecks.js:n taulukossa:
// Commanders, Companions, MainDecks, Maybeboards, Sideboards, Tokens
//
// Palauttaa parentille klikatun rivin .imageUris.normal Scryfallin-urlin kuvalle

export const TableAllDeckContents = ({ deckPart, card, tbodyData, imgUris, imageUri, setImg, setIsPositive, setShowMessage, setMessage }) => {
    
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
        // {
        //     id: 'indexId', // luultavimmin voi poistaa
        //     Header: 'indexId',
        //     Footer: 'indexId',
        //     accessor: 'indexId',
        //     // Filter: ColumnFilter,
        //     // disableFilters: true
        //     maxWidth: 120,
        //     minWidth: 40,
        //     width: 70,
        // },
        // {
        //     Header: 'deckId',
        //     Footer: 'deckId',
        //     accessor: 'deckId',
        //     maxWidth: 120,
        //     minWidth: 40,
        //     width: 70,      
        // },
        {
            Header: 'count',
            Footer: 'count',
            accessor: 'count',
            maxWidth: 120,
            minWidth: 40,
            width: 60,
        },
        {
            Header: () => (
                <div style={{ textAlign: "left" }}>Card</div>
              ),
            Footer: 'Card',
            accessor: 'name',
            maxWidth: 400,
            minWidth: 40,
            width: 350,
            Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
        },
        // {
        //     Header: 'Set',
        //     Footer: 'Set',
        //     accessor: 'setName',
        //     maxWidth: 400,
        //     minWidth: 40,
        //     width: 250,
        // },
        // {
        //     Header: 'id',
        //     Footer: 'id',
        //     accessor: 'id',
        // },
        // {
        //     Header: 'loginId',
        //     Footer: 'loginId',
        //     accessor: 'loginId',
        //     maxWidth: 120,
        //     minWidth: 40,
        //     width: 60,
        // },
        // {            
        //     maxWidth: 150,
        //     minWidth: 60,
        //     width: 80,
        //     Header: ('Actions'),
        //     // accessor: 'action',
        //     Cell: row => (
        //     <div>
        //        <button onClick={e=> handleEdit(row.row.original)}>Edit</button>{' '}
        //        <button onClick={e=> handleDelete(row.row.original)}>Delete</button>
        //     </div>
        //     ),
        //   },
    ], [], )

    // Käsittelee ko. riviltä painetun Edit-nappulan pyynnön & asettaa ko. rivin originaali datan parentin updateDeck-funktioon
    // function handleEdit(row) {
    //     // console.log(row)
    //     updateCard(row)        
    // }

    // Käsittelee ko. riviltä painetun Deletee-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    // function handleDelete(row) {
    //     // console.log(row)
    //     deleteCard(row)
    // }

    function handleShowCard(row) {
        try {
            // console.log(row)        
            imgUris = JSON.parse(row.imageUris)
            // console.log("imgUris", imgUris)
            imageUri = imgUris.normal
            fetchImage()
        } catch (error) {
            setMessage("Image not found.", error)
            setIsPositive(false)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollaa ylös ruudun
      
            setTimeout(() => {
              setShowMessage(false)
            }, 2000)
          }
        }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows, // Korvattu page:lla alla (mahdollistaa sivuttamisen)
        // page,
        // nextPage,
        // previousPage,
        // canNextPage,
        // canPreviousPage,
        prepareRow,
        selectedFlatRows,
        // state: { selectedRowIds }, // Tämä lisätty
        // pageOptions,
        // gotoPage,
        // pageCount,
        // setPageSize,
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
        //   initialState: { pageIndex : 0 }
        },
        useFlexLayout,
        useFilters,
        useGlobalFilter,
        useSortBy,
        useResizeColumns,
        // usePagination,
        useColumnOrder,
        useRowSelect,
        // hooks => {
        //     hooks.visibleColumns.push(columns => [
        //         {
        //         id: 'selection',
        //         width: 40,
        //         Header: ({ getToggleAllRowsSelectedProps }) => (
        //             <Checkbox {...getToggleAllRowsSelectedProps()} />
        //         ),
        //         Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        //         },
        //         ...columns
        //     ])
        // }
      )

      const { globalFilter } = state
    //   const { pageIndex, pageSize } = state

      // Jos haluaa muuttaa kolumnien järjestystä.
      // Nämä ovat hard coodatut. Eikä buttoni muuta näitä takaisin alkuperäisiksi.
    //   const changeOrder = () => {
    //     setColumnOrder([
    //         'count',            
    //         'id',
    //         'deckId',
    //         'indexId',
    //         'loginId',
    //     ])
    //   }

    // // Hakee imageUrlin mukaisella linkillä kuvan Scryfallin apista
    const fetchImage = async () => {
        // console.log("imageUrl", imageUrl)
        // console.log("imageUri", imageUri)
        try {
            const res = await fetch(imageUri)
            const imageBlob = await res.blob()
            const imageObjectURL = URL.createObjectURL(imageBlob)
            setImg(imageObjectURL)
        } catch (error) {console.error(error)}
    }

    // useEffect(() => {        
    //     fetchImage()
    // }, [])

    return (
        <>
        <React.Fragment>
            {/* <label className="deckHeadlineStyles">Deck:</label> */}
            <label className="deckParts">{deckPart}</label>
            {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />{' '}
            <button onClick={changeOrder}>Change column order</button>{' '}         */}

            {/* <div className='aligned'>
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
            </div> */}            
            <table className="subTableDeck" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <React.Fragment key={headerGroup.headers.length + "_hfrag"}>
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (                            
                                    <th {...column.getHeaderProps()}>                                
                                        <span {...column.getSortByToggleProps()}>
                                            {column.render('Header')}
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
                                        {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                    </th>                      
                                ))}
                            </tr>
                        </React.Fragment>
                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {                                
                        prepareRow(row)
                        // console.log("row:", row.original.indexId)
                        return (
                            <React.Fragment key={i + "_frag"}>
                                <tr key={row.original.indexId} {...row.getRowProps()} onClick={() => handleShowCard(row.original)}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}                            
                                </tr>
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

            {/* <div>
                <span>
                    Page {''}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}><FontAwesomeIcon icon={faAngleLeft} /></button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}><FontAwesomeIcon icon={faAngleRight} /></button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>{' '}
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
            </div> */}

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