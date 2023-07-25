import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import OwnedCardsService from './services/OwnedCards'
import OneOwnedCardContents from './OneOwnedCardContents'
import { TableOwnedCards } from "./components/TableOwnedCards"
import { TableOwnedCardData } from "./components/TableOwnedCardData"

// Parent kaikkiin OwnedCards / oman kokoelman hallintaan liittyvään
//
// Aukeaa App.js:n navigointipalkin linkin kautta
//
//

const OwnedCardsList = ({ loggedInLoginId, accesslevelId, setIsPositive, setShowMessage, setMessage, setShowWelcome }) => {

// Komponentin tilan määritys
const [allCards, setAllCards] = useState([]) // Kaikki kortit allCards-taulusta
const [showAllCards, setShowAllCards] = useState(false)
const [reload, reloadNow] = useState(false)

// const [search, setSearch] = useState("")
const [query, setQuery] = useState('') // Bäckendille lähtevä hakusana

// Muuttujat kortin count-määrän muuttamiseen
var editCount = ''
var updateRow = ''

// useRef refresh-buttonille
const buttonRef = useRef(null)

// reload-staten kääntely
function clickHandler(event) {
  reloadNow(!reload)
}

useEffect(() => {
  setShowWelcome(false)

  const token = localStorage.getItem('token')
        OwnedCardsService
              .setToken(token)

  // OwnedCardsService.getAll()
  OwnedCardsService.getCardsByLoginId(loggedInLoginId)
  .then(data => {
    // console.log(data)
    setAllCards(data)
  })
  .catch(error => console.log(error))
},[reload]
)

// Kortin lukumäärän (count) kasvattamiseen funktio
const increaseCount = (row) => {
  updateRow = (row)
  editCount = parseInt(updateRow.count) + 1  
  updateCount(updateRow, editCount)
}

// Kortin lukumäärän (count) vähentämiseen funktio
const decreaseCount = (row) => {
  updateRow = (row)
  if (updateRow.count != 1) {    
    editCount = parseInt(updateRow.count) - 1
    updateCount(updateRow, editCount)
  }
}

// Varsinainen päivittävä toiminto kortin countin muuttamiseen
const updateCount = (updateRow, editCount) => {  
  // luodaan newCard-olio, joka poimii muuttujasta datan
  var newCard = {
      indexId: parseInt(updateRow.indexId),      
      id: updateRow.id,
      count: parseInt(editCount),
      loginId: parseInt(updateRow.loginId)
  }
  // Kortin update
  OwnedCardsService.update(newCard)
  .then(response => {
  if (response.status === 200) {      
      editCount = ''
      updateRow = ''      
      buttonRef.current.addEventListener('click', clickHandler) // eventListener clickHandler-funktioon
      buttonRef.current.click() // Käskee klikata refresh-buttonia
  }
  })
  .catch(error => {
  console.log(newCard)
  setMessage(error.message)
  setIsPositive(false)
  setShowMessage(true)

  setTimeout(() => {
      setShowMessage(false)
  }, 6000)
  })
}

// Delete-funktio kortille
const deleteCard = (card) => {
  let answer = window.confirm(`Are you sure you want to permanently delete the card: ${card.idNavigation.name}?`)

  if(answer === true) {
  
    OwnedCardsService.remove(card.indexId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully deleted the card: ${card.idNavigation.name}.`)
          buttonRef.current.addEventListener('click', clickHandler) // eventListener clickHandler-funktioon
          buttonRef.current.click() // Käskee klikata refresh-buttonia
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          // Ilmoituksen piilotus
          setTimeout(() => {
              setShowMessage(false)
            }, 2000)
            reloadNow(!reload)
      }
  })
  .catch(error => {
      setMessage(error)
      setIsPositive(false)
      setShowMessage(true)
      window.scrollBy(0, -10000) // Scrollaa ylös ruudun

      setTimeout(() => {
        setShowMessage(false)
      }, 6000)
    })

  } // Jos poisto perutaan, annetaan ilmoitus onnistuneesta perumisesta.
  else {
      setMessage('Canceled the deletion of the card.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 3000)
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
      <OneOwnedCardContents
        // query={row.original.id}
        // setQuery={setQuery}
        // columns={details}
        // data={row.original.groupDetails}
        query={row.original.id}
        imgUris={(JSON.parse(row.original.idNavigation.imageUris))}
        setIsPositive={setIsPositive}
        setMessage={setMessage}
        setShowMessage={setShowMessage}
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
  if (OneOwnedCardContents?.id) {
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
            onClick={() => setShowAllCards(!showAllCards)}>Collection</nobr>        
            </h3>
          
            {showAllCards &&
            <div className='table'>
                <button ref={buttonRef} className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>{' '}
                <TableOwnedCards tbodyData={allCards} setQuery={setQuery} deleteCard={deleteCard} increaseCount={increaseCount} decreaseCount={decreaseCount} accesslevelId={accesslevelId}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
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
}

export default OwnedCardsList