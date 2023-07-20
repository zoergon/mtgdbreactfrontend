import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import DecksService from './services/Decks'
import CommandersService from './services/Commanders'
import CompanionsService from './services/Companions'
import MainDecksService from './services/MainDecks'
import MaybeboardsService from './services/Maybeboards'
import SideboardsService from './services/Sideboards'
import TokensService from './services/Tokens'
import ModalDeckAdd from './DeckAdd'
import ModalDeckEdit from './DeckEdit'
import ModalDeckContents from './DeckContents.jsx'
import MainDecksList from './MainDecksList'
import MainDecksListDeckId from './MainDecksListDeckId'
import { TableDecks } from "./components/TableDecks"
import { TableAllDeckContents } from "./components/TableAllDeckContents"
import AllDeckContents from './AllDeckContents'

// import styles from "./components/modal.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// Parent kaikkeen deckeihin liittyvään
// DecksList.jsx -> TableDecks.js | deckien listaus taulukkona
// subRow -> AllDeckContents.jsx -> TableAllDeckContents.js | deckin koko sisältö subRow:na taulukossa

// DeckAdd.jsx -> deckin lisääminen ModalDeckAdd
// DeckEdit.jsx -> deckin settings-buttonin ModalDeckEdit
// DeckContents.jsx -> deckin koko sisällön hallinta ModalDeckContents

const DecksList = ({ loggedInLoginId, newLoginId, accesslevelId, setIsPositive, setShowMessage, setMessage }) => {

const [decks, setDecks] = useState([]) // Backendiltä tuleva data
const [showDeck, setShowDeck] = useState(false) // Deckin sisällön näyttämistä varten
const [showDecks, setShowDecks] = useState(false) // MainDeckien näyttämistä varten. (Nimeä paremmin muiden osioiden myötä.) Tämä näyttää siis vain MainDeckin tablena alla nyt.
const [reload, reloadNow] = useState(false) // State reloadia varten
// const [searchName, setSearchName] = useState("") // Vanha hakukenttä
// const [searchFormat, setSearchFormat] = useState("") // Vanha hakukenttä
const [create, setCreate] = useState(false) // Create-tilan määritys (Add)
const [edit, setEdit] = useState(false) // Edit-tilan määritys
const [editDeck, setEditDeck] = useState("")
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (deckId) MainDecksien hakuun
const [deckName, setDeckName] = useState("") // Deckin nimi child-taulukoille näytettäväksi

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompanion, setCardsCompanion] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens

const [isShowAddDeck, invokeModalAddDeck] = useState(false) // ModalDeckAdd aukaiseminen ja sulkeminen
const [isShowDeckSettings, invokeModalDeckSettings] = useState(false) // ModalDeckEdit (deck's settings) aukaiseminen ja sulkeminen
const [isShowEditDeck, invokeModalEditDeck] = useState(false) // ModalDeckContents-modalin (edit deck) aukaiseminen ja sulkeminen
// const initModal = () => {
//   // return invokeModal(!false)
//   return invokeModalDeckSettings(!isShowDeckSettings)
// }
// const [isOpen, setIsOpen] = useState(false) // modalformin state

// UseEffect ajetaan aina alussa kerran
useEffect(() => {

  const token = localStorage.getItem('token')
        DecksService
              .setToken(token)

  DecksService.getDecksByLoginId(loggedInLoginId)
  // DecksService.getAll()
  .then(data => {
    console.log(data)
    setDecks(data)
  })
  .catch(error => console.log(error))
},[create, edit, reload]
// kun lisäystila muuttuu, haetaan bäkendistä päivittynyt data
)

// Nimi-hakukentän funktio
// const handleSearchNameInputChange = (event) => {
//     setShowDecks(true)
//     setSearchName(event.target.value.toLowerCase())
// }

// Format-hakukentän funktio
// const handleSearchFormatInputChange = (event) => {
//   setShowDecks(true)
//   setSearchFormat(event.target.value.toLowerCase())
// }

const addDeck = () => {
  setCreate(true)
  invokeModalAddDeck(!isShowAddDeck) // avaa/sulkee ko. modal-ikkunan
}

// TableDecks.js (child) Edit-buttonin kautta tuleva käskytys
// Muokattavan deckinId tulee queryna, jota käytetään kaikkien korttien hakemiseenkin
const editDeckContents = (deck) =>  {
  // setEditDeck(deck) // käsiteltävän deckin data
  // console.log("editDeck:", editDeck)
  // console.log("setQuery:", query)
  setShowDeck(true) // == true, jotta voi avata DeckContents.jsx modal-ikkunan 
  invokeModalEditDeck(!isShowEditDeck) // avaa/sulkee ko. modal-ikkunan
}

// TableDecks.js (child) Settings-buttonin kautta tuleva käskytys
const updateDeck = (deck) =>  {
  setEditDeck(deck) // päivitettävän deckin data (editDeck)
  // console.log("updateDeck:", editDeck)
  setEdit(true) // edit == true, vaaditaan, jotta voi avata editointi-formin | tarvitaanko tämä varmasti vielä?
  invokeModalDeckSettings(!isShowDeckSettings) // avaa/sulkee ko. modal-ikkunan
}

// Tämä on ollut alunperin vain Deck.jsx:ssä. En tiedä tarvitaanko sitä vastaisuudessa, joten käytännöllisempi se olisi tässä.
const deleteDeck = (deck) => {
  let answer = window.confirm(`Are you sure you want to permanently remove the deck: ${deck.name}?`)

  if(answer === true) {
      
  // Haetaan ensiksi deckin kaikki sisältö osio osiolta ja sijoitetaan ne omiin stateihinsa
  // Hakee kaikki commanderit deckId:n mukaisesti
  // const token = localStorage.getItem('token')
  //       CommandersService
  //             .setToken(token)
  //       CompanionsService
  //             .setToken(token)
  //       MainDecksService
  //             .setToken(token)
  //       MaybeboardsService
  //             .setToken(token)
  //       SideboardsService
  //             .setToken(token)
  //       TokensService
  //             .setToken(token)

  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   CommandersService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsCommander(data)

  //     let cardsCommanders = (data)
  //     console.log("cardsCommanders", cardsCommanders)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois
  //     if (cardsCommanders.length > 0) {
  //       cardsCommanders.forEach(e => {
  //         CommandersService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success commanders")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }

  // })
  //   .catch(error => console.log(error))

  // // Hakee kaikki companionit deckId:n mukaisesti
  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   CompanionsService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsCompanion(data)
  //     let cardsCompanions = (data)
  //     console.log("cardsCompanions", cardsCompanions)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois
  //     if (cardsCompanions.length > 0) {
  //       cardsCompanions.forEach(e => {
  //         CompanionsService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success companions")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }
  // })
  //   .catch(error => console.log(error))

  // // Hakee kaikki main deckin kortit deckId:n mukaisesti
  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   MainDecksService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsMainDeck(data)
  //     let cardsMainDecks = (data)
  //     console.log("cardsMainDecks", cardsMainDecks)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois
  //     if (cardsMainDecks.length > 0) {
  //       cardsMainDecks.forEach(e => {
  //         MainDecksService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success maindecks")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }
  // })
  //   .catch(error => console.log(error))

  // // Hakee kaikki maybe boardin kortit deckId:n mukaisesti
  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   MaybeboardsService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsMaybeboard(data)
  //     let cardsMaybeboards = (data)
  //     console.log("cardsMayabeboards", cardsMaybeboards)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois
  //     if (cardsMaybeboards.length > 0) {
  //       cardsMaybeboards.forEach(e => {
  //         MaybeboardsService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success maybeboards")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }
  // })
  //   .catch(error => console.log(error))

  // // Hakee kaikki side boardin kortit deckId:n mukaisesti
  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   SideboardsService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsSideboard(data)
  //     let cardsSideboards = (data)
  //     console.log("cardsSideboards", cardsSideboards)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois
  //     if (cardsSideboards.length > 0) {
  //       cardsSideboards.forEach(e => {
  //         SideboardsService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success sideboards")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }
  // })
  //   .catch(error => console.log(error))

  // // Hakee kaikki tokenit deckId:n mukaisesti
  // if (deck.deckId !== "") // Ei hae tyhjällä stringillä
  //   TokensService.getByDeckId(deck.deckId)
  //   .then(data => {
  //     // setCardsTokens(data)
  //     let cardsTokens = (data)
  //     console.log("cardsTokens", cardsTokens)

  //     // Jos array.length > 0, poistetaan kortti kortilta kaikki pois      
  //     if (cardsTokens.length > 0) {
  //       cardsTokens.forEach(e => {
  //         TokensService.remove(e.indexId)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 console.log("success tokens")
  //             }
  //         })
  //         .catch(error => {
  //             setMessage(error)
  //             setIsPositive(false)
  //             setShowMessage(true)
  //             window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //             setTimeout(() => {
  //               setShowMessage(false)
  //             }, 6000)
  //           })
  //       });        
  //     }
  // })
  //   .catch(error => console.log(error))  

  // Varsinainen deckin poisto
  DecksService.remove(deck.deckId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed the deck: ${deck.name}.`)
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          // Ilmoituksen piilotus
          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
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
      setMessage('Canceled the deletion of the deck.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
  }
}

// Nämä Expandable-mallista
// XXX - tästä saakka
const details = React.useMemo(
  () => [
    {
      Header: "index_id",
      accessor: "indexId",
      width: 50
    },
    {
      Header: "Card",
      accessor: "name",
      width: 125
    },
    {
      Header: 'Count',
      accessor: 'count',
      width: 80,
    },
    {
      // Header: "Sample Group Details",
      Header: "deck_id",
      // accessor: "groupDetails",
      accessor: "deckId",
      width: 100
    },
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
// -> <AllDeckContents tekee queryn mukaisen haun backendistä ja taulun niistä, details-muuttujassa määritettyjen headereitten ja accessorien mukaisesti
const subTable = React.useCallback(
  ({ row }) =>
    // row.original.groupDetails.length > 0 ? (
    // row.original.mainDecks.length > 0 ? (
      (
      // <TableDeckContents
      <AllDeckContents
        query={row.original.deckId}
        setQuery={setQuery}
        setIsPositive={setIsPositive}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
        // columns={details}
        // data={row.original.groupDetails}
        // data={row.original.deckId}
        // headerColor="grey"
      />
      ),
    // ) : (
    //   "No Data"
    // ),
  [details]
);

// Alkuperäisessä: export const data = { data: { getGroupedSamplingStationBySystemId: [{ systemId: 1289, jne....}]}}
const expandedRows = React.useMemo(() => {
  // if (data?.data) {
  // if (MainDecksList?.decks) {
  if (AllDeckContents?.cardsMainDeck) {
    let arr
    let d = decks
    if (d.deckId.length > 0) {
      arr = d.deckId.map((sid, ind) => {
        return { [ind]: true }
      })
    }
    return arr
  }
}, [])
// XXX - tänne saakka Expandable-mallista


// Tarkistaa onko data haettu backendistä decks-stateen.
// Jollei ole, antaa sillä välin 'now loading' -paragrafin ilmoitukseksi.
// if (decks.length > 0) {
  return (
    <>
      <div>
        <h3><nobr style={{ cursor: 'pointer'}}
          onClick={() => setShowDecks(!showDecks)}>Decks</nobr>
          {!create && <button className="button" onClick={addDeck}>Create a new deck</button>}
        </h3>
      </div>
        {decks.length > 0 ? (
          <div className='table'>              
              <button className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>{' '}
              {/* {!edit && <button className="button" onClick={() => setEdit(true)}>Edit the selected deck</button>}{' '} */}
              <TableDecks edit={edit} setEdit={setEdit} create={create} setCreate={setCreate} editDeck={editDeck} setEditDeck={setEditDeck} reloadNow={reloadNow} reload={reload}
                      setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} accesslevelId={accesslevelId}
                      updateDeck={updateDeck} deleteDeck={deleteDeck} tbodyData={decks} showDeck={showDeck} setShowDeck={setShowDeck} editDeckContents={editDeckContents}
                      showDecks={showDecks} setShowDecks={setShowDecks} setQuery={setQuery} setDeckName={setDeckName}
                      renderRowSubComponent={subTable} expandRows expandedRowObj={expandedRows} />              
              {/* {!create && !edit && showDecks && decks &&
              <TableDecks deck={deck} reloadNow={reloadNow} reload={reload}
                        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                        updateDeck={updateDeck} tbodyData={decks}/>
              } */}
          </div>
        ) : (
          <span>
            <em>...searching for the data...</em>
          </span>
        )}

        {/* <h2 onClick={() => setShowAllCards(!showAllCards)}>All cards</h2> */}
        {/* <h1><nobr style={{ cursor: 'pointer'}}
        onClick={() => setShowDecks(!showDecks)}>Decks</nobr>         */}
        
        {/* jos create = false */}
        {/* {!create && <button className="button" onClick={() => setCreate(true)}>Add new</button>}
        </h1> */}

        {/* hakukenttä */}
        {/* onChange viittaus omaan hakukentän funktioon yllä */}        
        {/* {!create && !edit &&
          <input placeholder="Search decks by name" value={searchName} onChange={handleSearchNameInputChange} />
        }     
        {!create && !edit &&
          <input placeholder="Search decks by format" value={searchFormat} onChange={handleSearchFormatInputChange} />
        } */}

        {create && <ModalDeckAdd isShowAddDeck={isShowAddDeck} invokeModalAddDeck={invokeModalAddDeck} setCreate={setCreate} newLoginId={newLoginId} accesslevelId={accesslevelId}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} reload={reload} reloadNow={reloadNow}
        />}

        {edit && <ModalDeckEdit isShowDeckSettings={isShowDeckSettings} invokeModalDeckSettings={invokeModalDeckSettings} setEdit={setEdit} newLoginId={newLoginId} accesslevelId={accesslevelId}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editDeck={editDeck}
        />}

        {/* {showDecks && <MainDecksListDeckId query={query} setQuery={setQuery} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} deckName={deckName} columns={details} />} */}

        {showDeck && <ModalDeckContents isShowEditDeck={isShowEditDeck} invokeModalEditDeck={invokeModalEditDeck} newLoginId={newLoginId}
        query={query} setQuery={setQuery} editDeck={editDeck} setEditDeck={setEditDeck} accesslevelId={accesslevelId}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} deckName={deckName} columns={details} />}

        {/* {
          // Viimeisen && jälkeen se mitä tehdään
          // Kaikki sitä edeltävät ovat ehtoja -ja -ja -ja
          // Ensimmäiset !create && !edit && - poistavat listauksen näkyvistä alta lisäystilassa(?)
          // {}-jälkeen hakutoimintoihin liittyvät asiat
          !create && !edit && showDecks && decks && decks.map(d => 
            {
              const lowerCaseName = d.name.toLowerCase()
              const lowerCaseFormat = d.format.toLowerCase()
              if ((lowerCaseName.indexOf(searchName) > -1) && (lowerCaseFormat.indexOf(searchFormat) > -1) ) {
                return(
                <Deck key={d.deckId} deck={d} reloadNow={reloadNow} reload={reload}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                updateDeck={updateDeck}
                />
            )
              }
            }
            )
        } */}

    </>
  )
}

export default DecksList