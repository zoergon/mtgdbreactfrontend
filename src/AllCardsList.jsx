import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import AllCardsService from './services/AllCards'
import OwnedCardsService from './services/OwnedCards'
import AllCard from './AllCard'
import OneCardContents from './OneCardContents'
import OwnedCardsList from './OwnedCardsList'
import { TableAllCards } from "./components/TableAllCards"
import { TableAllCardData } from "./components/TableAllCardData"

// 

const AllCardsList = ({ setIsPositive, setShowMessage, setMessage }) => {

// Komponentin tilan määritys
const [allCards, setAllCards] = useState([]) // Kaikki kortit allCards-taulusta
const [showAllCards, setShowAllCards] = useState(false)
const [reload, reloadNow] = useState(false)
// const [search, setSearch] = useState("")
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana

const [newId, setNewId] = useState('') // haetun kortin id
const [newCount, setNewCount] = useState(1) // vaihdettava lukumäärä
const [newLoginId, setNewLoginId] = useState(1) // käyttäjätunnuksen id

var addId = ''
// var checkId = ''
// var checkSame = ''

// useRef refresh-buttonille
const buttonRef = useRef(null)

// reload-staten kääntely
function clickHandler(event) {
  reloadNow(!reload)
}

useEffect(() => {

  const token = localStorage.getItem('token')
        AllCardsService
              .setToken(token)

    AllCardsService.getAll()
  .then(data => {
    console.log(data)
    setAllCards(data)
  })
  .catch(error => console.log(error))
},[reload]
)

const addToCollection = (event) => {  
    // console.log("submit", event.id)
    var newCard = {    
    id: event.id,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

  // Tarkistaa löytyykö OwnedCardsista vastaavuutta
  // Asettaa .id:t checkId & checkSame -muuttujiin
  // Ongelmana toinen on alunperin objekti ja toinen array= !==  
  // if (event !== "") // Ei hae tyhjällä stringillä
  //   OwnedCardsService.getById(event.id)
  //   .then(data => {      
  //     // console.log("data", data)
  //     checkId = (event.id)      
  //     checkId = JSON.stringify(event.id)
  //     checkSame = (data.map(e => e.id))
  //     checkSame = JSON.stringify(checkSame)      
  //     console.log("event.id", checkId)
  //     console.log("data.id", checkSame)
  //   })
  //   .catch(error => console.log(error))

  // Antaa virheilmoituksen, mikäli koittaa lisätä jo olemassa olevalla id:llä korttia
  // if (checkId === checkSame) {
  //   setMessage("There is already a: " + event.name + " | " + event.setName)      
  //   setIsPositive(false)
  //   setShowMessage(true)

  //   setTimeout(() => {
  //     setShowMessage(false)
  //   }, 2000)
  // }
  // console.log("checkId", checkId)
  // console.log("checkSame", checkSame)

  // if (event !== "" && checkId !== "" && checkSame !== "" && checkId !== checkSame) {
  if (event !== "") {
    console.log("POST:", event)

    const token = localStorage.getItem('token')
        OwnedCardsService
              .setToken(token)

    OwnedCardsService.create(newCard)
    .then(response => {
      if (response.status === 200) {
        // buttonRef.current.addEventListener('click', clickHandler) // eventListener clickHandler-funktioon
        // buttonRef.current.click() // Käskee klikata refresh-buttonia
        setMessage("Added a new Card: " + newCard.id)      
        setIsPositive(true)
        setShowMessage(true)
  
        setTimeout(() => {
          setShowMessage(false)
        }, 1000)  
      }
    })
    .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)
  
      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
    })
  }
}

// Nämä Expandable-mallista
// XXX - tästä saakka
const details = React.useMemo(
  () => [
    {
      Header: "id",
      accessor: "id",
      width: 150
    },
    // {
    //   Header: "Card",
    //   accessor: "name",
    //   width: 125
    // },
    // {
    //   Header: 'Count',
    //   accessor: 'count',
    //   width: 80,
    // },
    // {
    //   // Header: "Sample Group Details",
    //   Header: "deck_id",
    //   // accessor: "groupDetails",
    //   accessor: "deckId",
    //   width: 100
    // },
  //   {
  //     // samaa tasoa kuin MainDecks muut rivit, viimeisen kahden rivin tiedot alkuperäisessä yhdistetty tällä tavoin yhteen
  //     Header: "System",
  //     accessor: (d) => {
  //       return d.systemNumber + " " + d.systemName;
  //     },
  //     width: 200
  //   }
  ],
  []
);

// alkuperäisessä row.original.groupDetails = aktuaalinen subRow datassa
// TableDecksin expandable subRowiin lähetetään tämä = renderRowSubComponent={subTable}
// TableDecksin mappaaman row-datan mukaisesti = row.original.mainDecks = Entity Frameworkin fk:n mukaisesti mappaama taulu tietokannassa
// ts. jos kyseisellä rivillä eli deckillä on kortteja = .length > 0
// -> <                       Contents tekee queryn mukaisen haun backendistä ja taulun niistä, details-muuttujassa määritettyjen headereitten ja accessorien mukaisesti
const subTable = React.useCallback(  
  ({ row }) =>
    // row.original.groupDetails.length > 0 ? (
    // row.original.id.length > 0 ? (
      (      
      // <TableDeckContents
      <OneCardContents
        // query={row.original.id}
        // setQuery={setQuery}
        // columns={details}
        // data={row.original.groupDetails}
        query={row.original.id}
        imgUris={(JSON.parse(row.original.imageUris))}
        // setQuery={setQuery}
      />
      ),
    // ) : (
    //   "No Data"
    // ),
  [details]
)

// Alkuperäisessä: export const data = { data: { getGroupedSamplingStationBySystemId: [{ systemId: 1289, jne....}]}}
const expandedRows = React.useMemo(() => {
  // if (data?.data) {
  // if (MainDecksList?.decks) {
  if (OneCardContents?.id) {
    let arr
    let c = allCards
    if (c.id.length > 0) {
      arr = c.id.map((id, ind) => {
        return { [ind]: true }
      })
    }
    return arr
  }
}, [])
// XXX - tänne saakka Expandable-mallista

// if (allCards.length > 0) {
  return (
    <>
        {allCards.length > 0 ? (
          <div>
            <h3><nobr style={{ cursor: 'pointer'}}
            onClick={() => setShowAllCards(!showAllCards)}>Database</nobr>        
            </h3>
          
            {showAllCards &&
            <div className='table'>
                <button ref={buttonRef} className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>{' '}
                <TableAllCards tbodyData={allCards} addToCollection={addToCollection} addId={addId}
                renderRowSubComponent={subTable} expandRows expandedRowObj={expandedRows} />
            </div>}
          </div>
        ) : (
          <span>
            <em>...searching for the data...</em>
          </span>
        )}

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        {/* <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowAllCards(!showAllCards)}>All cards</nobr>
        </h1> */}

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}
        {/* {
          <input placeholder="Search cards by name" value={search} onChange={handleSearchInputChange} />
        } */}

        {/* {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          showAllCards && allCards && allCards.map(c => 
            {
              const lowerCaseName = c.name.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(
                <AllCard key={c.id} allCard={c} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                />
            )
              }
            }
            )
        } */}

    </>
  )
// } else {
//   return (
//     <div>      
//       <p>*** now loading ***</p>
//     </div>
//   )
// }
}

export default AllCardsList