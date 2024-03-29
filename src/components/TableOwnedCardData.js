import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useFlexLayout, useResizeColumns } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { COLUMNS } from './ColumnsOwnedCardData'
// import { Checkbox } from './Checkbox'

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

// parent: OneOwnedCardContents.jsx
//
// Aukeaa TableOwnedCards.js:n subRow:na riviä laajentamalla
//
// Latautuu DecksList.jsx:n useEffectin backendille lähettämän HttpGet-pyynnön jälkeen: OwnedCardsService.getById(query)
// Palauttaa parentille klikatun rivin .imageUris.normal Scryfallin-urlin kuvalle

export const TableOwnedCardData = ({ tbodyData, imgId, imgUris, setIsPositive, setShowMessage, setMessage }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.
    const [img, setImg] = useState() // kortista kuva
    // const [imgId, setImgId] = useState("")

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    })

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
        console.log(row)
        // showCard(row)        
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

    var imageUri = ""

    try {
        imageUri = imgUris.normal    
    } catch (error) {
        setMessage("Image not found.", error)
        setIsPositive(false)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollaa ylös ruudun
  
        setTimeout(() => {
          setShowMessage(false)
        }, 2000)
    }
    
    useEffect(() => {        
        fetchImage()        
    }, [])

    // Hakee imageUrlin mukaisella linkillä kuvan Scryfallin apista
    const fetchImage = async () => {
        const res = await fetch(imageUri)        
        const imageBlob = await res.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImg(imageObjectURL)        
    }    

    // Alkuperäisen tbodyDatan eli kortin datarivienn key-avaimet.
    // subRow:ssa esitettävään taulukkoon mapataan tämän mukaisesti rivit
    const cols = Object.keys(data[0])

    // const header = () => {
    //     return cols.map(e => <th key={e} align="right">{e}</th>)
    // }

    return (
        <div className='subAligned'>

            <table className="subTableAllCards">
                <tbody>
                    {cols.map((e, i) =>
                        <tr key={i} >
                            <th key={i} align="left" style={{ maxWidth: 'auto' }} >{e}</th>
                            
                    {data.map(row =>            
                        // {cols.map(col =>
                            <td key={i} align="left" style={{ maxWidth: 'auto' }} >{JSON.stringify(row[e])}</td>
                        )}
                        </tr>)}
                    {/* {data.map(row =>  */}
                        {/* {cols.map(col => 
                            <tr>
                                <td key={col} align="right">{row[col]}</td>
                            </tr>)} */}
                    {/* )} */}
                </tbody>
            </table>            
            
            <img style={{ height: '40%', width: '40%', paddingLeft: '3rem', paddingTop: '0rem' }} src={img}></img>

        </div>
    )

        {/* <React.Fragment> */}
            {/* <label className="deckHeadlineStyles">Deck:</label> */}
            {/* <label className="deckParts">{deckPart}</label> */}
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

            {/* <table className="subTable" {...getTableProps()}>
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
                                        )} */}
                                        {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                                    {/* </th>
                                ))}

                                <td {...getTableBodyProps()}>
                                    {rows.map((row, i) => {
                                        prepareRow(row) */}                                        
                                        {/* return (
                                            <React.Fragment key={i + "_frag"}>
                                                <td key={row.original.id} {...row.getRowProps()} onClick={() => handleShowCard(row.original)}>
                                                    {row.cells.map((cell) => {
                                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                    })}
                                                </td>
                                            </React.Fragment>
                                        )
                                    })}           
                                </td>

                            </tr>
                        </React.Fragment>
                        ))}
                </thead> */}
                {/* <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {                                
                        prepareRow(row)
                        // console.log("row:", row.original.indexId)
                        return (
                            <React.Fragment key={i + "_frag"}>
                                <tr key={row.original.id} {...row.getRowProps()} onClick={() => handleShowCard(row.original)}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}                            
                                </tr>
                            </React.Fragment>
                        )
                    })}                
                </tbody> */}
                {/* <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps}>{column.render('Footer')}</td>
                            ))}
                        </tr>
                    ))}
                </tfoot> */}
            {/* </table> */}

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
        {/* </React.Fragment> */}
        // </>
    // )
}