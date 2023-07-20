import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect, useColumnOrder, useImperativeHandle, useFlexLayout, useBlockLayout, useAbsoluteLayout, useResizeColumns, useExpanded } from 'react-table'
import './table.css'
import { COLUMNS } from './ColumnsOwnedCards'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
import { Checkbox } from './Checkbox'

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

export const TableOwnedCards = ({ increaseCount, decreaseCount, deleteCard, tbodyData,
    setIsPositive, setShowMessage, setMessage, accesslevelId,
    renderRowSubComponent, expandRows, expandedRowObj }) => {
    
    // Tämä oli käytössä, ennen kuin siirsin columnit tänne. ColumnsDecks.js alkuperäinen componentti.
    // const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => tbodyData, [tbodyData]) // tbodyData={decks}, eli deckit tietokannasta. , [tbodyData]) = useMemo päivittyy aina tbodyDatan päivittyessä.

    const defaultColumn = useMemo(() => {        
        // () => ({
        //     width: columnWidth > 0 ? columnWidth : 150,
        //   }),
        //   [columnWidth]
        return {            
            Filter: ColumnFilter
        }
    })

    const columns = useMemo(
        () => [
            {
                Header: 'Count',
                Footer: 'count',
                accessor: 'count',     
                maxWidth: 80,
                minWidth: 50,
                width: 60,   
            },
            {
                Header: 'Name',
                Footer: 'name',
                accessor: 'idNavigation.name',
                maxWidth: 350,
                minWidth: 100,
                width: 120,
            },
            {
                Header: 'Rarity',
                Footer: 'rarity',
                accessor: 'idNavigation.rarity',
                maxWidth: 120,
                minWidth: 10,
                width: 70,
            },
            {
                Header: 'Set',
                Footer: 'set_name',
                accessor: 'idNavigation.setName',
                maxWidth: 200,
                minWidth: 50,
                width: 120,
            },
            {
                Header: 'Set code',
                Footer: '[set]',
                accessor: 'idNavigation.set',  
                maxWidth: 100,
                minWidth: 10,
                width: 50,      
            },
            {
                Header: 'Lang',
                Footer: 'lang',
                accessor: 'idNavigation.lang',
                maxWidth: 100,
                minWidth: 10,
                width: 50,
            },
            {
                Header: 'Mana cost',
                Footer: 'mana_cost',
                accessor: 'idNavigation.manaCost',
                maxWidth: 200,
                minWidth: 10,
                width: 70,
            },
            {
                Header: 'Type line',
                Footer: 'type_line',
                accessor: 'idNavigation.typeLine',
                maxWidth: 250,
                minWidth: 100,
                width: 250,
            },
            {
                Header: 'Oracle text',
                Footer: 'oracle_text',
                accessor: 'idNavigation.oracleText',
                maxWidth: 600,
                minWidth: 100,
                width: 400,
                // padding: 10,
            },
            {
                Header: 'Power',
                Footer: 'power',
                accessor: 'idNavigation.power',
                maxWidth: 60,
                minWidth: 10,
                width: 40,
            },
            {
                Header: 'Toughness',
                Footer: 'toughness',
                accessor: 'idNavigation.toughness',
                maxWidth: 60,
                minWidth: 10,
                width: 40,
            },
            // {
            //   id: 'id', // luultavimmin voi poistaa
            //   Header: 'id',
            //   Footer: 'id',
            //   accessor: 'id',
            //   // Filter: ColumnFilter,
            //   // disableFilters: true
            // },
            {
                Header: 'Border color',
                Footer: 'border_color',
                accessor: 'idNavigation.borderColor',
                maxWidth: 110,
                minWidth: 10,
                width: 40,
            },
            {
                Header: 'Object',
                Footer: 'object',
                accessor: 'idNavigation.object',
                maxWidth: 100,
                minWidth: 10,
                width: 40,
            },
            {
              width: 90,
              Header: ('Add'),
              // accessor: 'action',
              Cell: row => (
              <div>
                <button className='button' onClick={e=> handlePlus(row.row.original)}>+</button>
               <button className='button' onClick={e=> handleMinus(row.row.original)}> - </button>               
               <button className='button' onClick={e=> handleDelete(row.row.original)}>Delete</button>
              </div>
              ),
            },
          ], [], )
    
    function handleShowDetails(row) {
        // console.log(row)
        // setQuery(row.deckId)
        // setShowDecks(showDecks => !showDecks) // Vaihtaa boolean-arvoa & näyttää/ei näytä MainDecksListiä
    }

    function handlePlus(row) {        
        if (accesslevelId < 3) {
            increaseCount(row)
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
            decreaseCount(row)
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

    // Käsittelee ko. riviltä painetun Deletee-nappulan pyynnön & asettaa ko. rivin originaali datan parentin deleteDeck-funktioon
    function handleDelete(row) {        
        if (accesslevelId < 3) {
            // console.log("row.id", row.id)
            deleteCard(row)
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
        state: { expanded },
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
        useResizeColumns,
        useExpanded,
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
                {                    
                    maxWidth: 60,
                    minWidth: 10,
                    width: 30,
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
    //         'set',
    //         'id',
    //         'name',
    //         'rarity',
    //         'setName',
    //         'manaCost',
    //         'typeLine',          
    //         'oracleText',
    //         'power',
    //         'toughness',
    //         'lang',
    //         'borderColor',
    //         'object',
    //     ])
    //   }

    return (
        <>
        <React.Fragment>
            {/* <button className='button' onClick={changeOrder}>Change column order</button>{' '} */}
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <div className='aligned'>
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
            </div>

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
                        // console.log("row:", row.original.id)
                        return (                  
                            <React.Fragment key={i + "_frag"}>
                                <tr key={row.original.id} {...row.getRowProps()} onClick={() => handleShowDetails(row.original)}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}                            
                                </tr>
                                {row.isExpanded ? (
                                    <tr>
                                    {/* <td onClick={() => handleShowDeck(row.original)}></td> */}
                                    <td >
                                        <span className="subTableAllCards">
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
                    {[10, 25, 50, 100, 1].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>Showing {pageSize} results of {rows.length} rows total</div>
            <pre></pre>
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