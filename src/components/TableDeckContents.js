import React, { useMemo, useEffect, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useFlexLayout, useResizeColumns } from 'react-table'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'
// import MainDecksService from '../services/MainDecks'
// import MainDeckEdit from '../MainDeckEdit'
// import MainDecksList from '../MainDecksList'
import Dropdown from "./Dropdown.js"

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

// Taulu eckin osioiden sisällön näyttämiseen
// Parent DeckContents.jsx

export const TableDeckContents = ({ deckName, edit, setEdit, create, setCreate, editCard, card, 
    // queryCompanion, setQueryCompanion,
    // newId, setNewId, newName, setNewName, selected, setSelected, optionListCompanion, setOptionListCompanion, options, handleAdd, 
    servicerChild, servicerX, updateCard, deleteCard, increaseCount, decreaseCount, deckPart, tbodyData,
    setIsPositive, setShowMessage, setMessage, accesslevelId,
    imgUris, imageUri, setImg, setEditableDeckPart }) => {
    
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
            Header: 'Card',
            Footer: 'Card',
            accessor: 'name',
            maxWidth: 400,
            minWidth: 40,
            width: 250,
        },
        {
            Header: 'Set',
            Footer: 'Set',
            accessor: 'setName',
            maxWidth: 400,
            minWidth: 40,
            width: 250,
        },
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
        {            
            maxWidth: 300,
            minWidth: 60,
            width: 290,
            Header: ('Actions'),
            // accessor: 'action',
            Cell: row => (
            <div>
               <button className='button' onClick={e=> handlePlus(row.row.original)}>+</button>
               <button className='button' onClick={e=> handleMinus(row.row.original)}> - </button>
               <button className='button' onClick={e=> handleEdit(row.row.original)}>Edit</button>
               <button className='button' onClick={e=> handleDelete(row.row.original)}>Delete</button>
            </div>
            ),
          },
    ], [], )

    // Käsittelee ko. riviltä painetun Add-nappulan pyynnön & asettaa ko. rivin originaali datan parentin handleAddX-funktiolle
    // function handleAddCard(e) {        
    //     servicerChild = servicerX // Sijoitetaan parentilta tuleva oikea XService
    //     console.log("servicerChild:", servicerChild)        
    //     handleAdd(e, servicerChild) // Palautetaan oieka XService servicerChildina varsinaisen datan kera
    // }

    function handlePlus(row) {        
        if (accesslevelId < 3) {
            servicerChild = servicerX // Sijoitetaan parentilta tuleva oikea XService
            increaseCount(row, servicerChild)
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

    function handleMinus(row) {        
        if (accesslevelId < 3) {
            servicerChild = servicerX // Sijoitetaan parentilta tuleva oikea XService        
            decreaseCount(row, servicerChild)
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

    // Käsittelee ko. riviltä painetun Edit-nappulan pyynnön & asettaa ko. rivin originaali datan parentin updateDeck-funktioon
    function handleEdit(row) {        
        setEditableDeckPart(deckPart) // Asetetaan mistä deckin osiosta on kyse, niin saadaan asetettua oikea service CardEdit.jsx:ssä
        updateCard(row)        
    }

    // Käsittelee ko. riviltä painetun Delete-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    function handleDelete(row) {        
        if (accesslevelId < 3) {
            servicerChild = servicerX // Sijoitetaan parentilta tuleva oikea XService
            // console.log("servicerChild:", servicerChild)        
            deleteCard(row, servicerChild) // Palautetaan oieka XService servicerChildina varsinaisen datan kera
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

    // Kortin kuvan näyttämiseen funktio
    function handleShowCard(row) {
        try {
            // console.log(row)
            imgUris = JSON.parse(row.imageUris) // Parseroidaan row.original.imageUris
            // console.log("imgUris", imgUris.normal)
            imageUri = imgUris.normal // Parseroidusta imageUrista valitaan normal-kuvalinkki
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
        rows,
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
    //   const { pageIndex, pageSize } = state

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

    

    // Hakee imageUrlin mukaisella linkillä kuvan Scryfallin apista
    const fetchImage = async () => {
            // console.log("imageUrl", imageUrl)
            // console.log("imageUri", imageUri)
            const res = await fetch(imageUri)
            const imageBlob = await res.blob()
            const imageObjectURL = URL.createObjectURL(imageBlob)
            setImg(imageObjectURL)
    }

    // useEffect(() => {        
    //     fetchImage()
    // }, [])



    return (
        <>
        <React.Fragment>
            <br/>
            <label className="deckParts">{deckPart}</label>
            {/* <label className="deckHeadlineStyles">Deck:</label><label className="deckNameStyles">{deckName}</label>{' '} */}            
            {/* <div> */}
                {/* <button className='button' style={{ marginRight: "auto" }} onClick={(e) => {handleAddCard(e)}}>Add a card</button>{' '}
                <input type='text' value={queryCompanion} onChange={(e) => {setQueryCompanion(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryCompanion} options={optionListCompanion} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} style={{ marginLeft: "auto" }}/>{' '} */}
            {/* </div> */}
            {/* <button className='button' onClick={changeOrder}>Change column order</button>{' '}         */}

            {/* <div className='aligned'>
                <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {allColumns.map(column => (
                    <div key={column.id}>
                        <label style={{background: 'transparent', color: 'orange'}} className='label'>
                            <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
                            {column.Header}
                        </label>
                    </div>
                ))}
                <br />
            </div> */}

            <table {...getTableProps()}>
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
                    | Navigate : {' '}
                </span>
                <button className='button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleDoubleLeft} />
                </button>{' '}
                <button className='button' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FontAwesomeIcon style={{backgroundColor: "#242121", color: "orange"}} icon={faAngleLeft} />
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