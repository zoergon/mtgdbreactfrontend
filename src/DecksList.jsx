import './App.css'
import React, { useState, useEffect, useMemo } from 'react'
import DecksService from './services/Decks'
import Deck from './Deck'
import ModalDeckAdd from './DeckAdd'
import ModalDeckEdit from './DeckEdit'
import ModalDeckContents from './DeckContents.jsx'
import MainDecksList from './MainDecksList'
import MainDecksListDeckId from './MainDecksListDeckId'
import Table from "./Table"
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

const DecksList = ({ setIsPositive, setShowMessage, setMessage }) => {

// Komponentin tilan määritys
const [aDeck, setADeck] = useState([]) // Tätä ei luultavasti tarvitse

const [decks, setDecks] = useState([]) // Backendiltä tuleva data
const [showDeck, setShowDeck] = useState(false) // Deckin sisällön näyttämistä varten
const [showDecks, setShowDecks] = useState(false) // MainDeckien näyttämistä varten. (Nimeä paremmin muiden osioiden myötä.) Tämä näyttää siis vain MainDeckin tablena alla nyt.
const [reload, reloadNow] = useState(false) // State reloadia varten
const [searchName, setSearchName] = useState("") // Vanha hakukenttä
const [searchFormat, setSearchFormat] = useState("") // Vanha hakukenttä
const [create, setCreate] = useState(false) // Create-tilan määritys (Add)
const [edit, setEdit] = useState(false) // Edit-tilan määritys
const [editDeck, setEditDeck] = useState("")
const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (deckId) MainDecksien hakuun
const [deckName, setDeckName] = useState("") // Deckin nimi child-taulukoille näytettäväksi

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
    DecksService.getAll()
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
        {decks.length > 0 ? (
          <div className='table'>            
              {!create && <button className="button" onClick={addDeck}>Create a new deck</button>}{' '}
              <button className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>
              {/* {!edit && <button className="button" onClick={() => setEdit(true)}>Edit the selected deck</button>}{' '} */}
              <TableDecks edit={edit} setEdit={setEdit} create={create} setCreate={setCreate} editDeck={editDeck} setEditDeck={setEditDeck} deck={aDeck} reloadNow={reloadNow} reload={reload}
                      setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
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

        {create && <ModalDeckAdd isShowAddDeck={isShowAddDeck} invokeModalAddDeck={invokeModalAddDeck} setCreate={setCreate}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} reload={reload} reloadNow={reloadNow}
        />}

        {edit && <ModalDeckEdit isShowDeckSettings={isShowDeckSettings} invokeModalDeckSettings={invokeModalDeckSettings} setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editDeck={editDeck}
        />}

        {/* {showDecks && <MainDecksListDeckId query={query} setQuery={setQuery} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} deckName={deckName} columns={details} />} */}

        {showDeck && <ModalDeckContents isShowEditDeck={isShowEditDeck} invokeModalEditDeck={invokeModalEditDeck}
        query={query} setQuery={setQuery} editDeck={editDeck} setEditDeck={setEditDeck}
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