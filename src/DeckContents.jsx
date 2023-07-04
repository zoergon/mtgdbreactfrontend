import './App.css'
import React, { useState, useEffect } from 'react'
import CommandersService from './services/Commanders'
import CompanionsService from './services/Companions'
import MainDecksService from './services/MainDecks'
import MaybeboardsService from './services/Maybeboards'
import SideboardsService from './services/Sideboards'
import TokensService from './services/Tokens'
// import MainDeck from './MainDeck'
// import MainDeckAdd from './MainDeckAdd'
// import MainDeckEdit from './MainDeckEdit'
// import { TableMainDecks } from "./components/TableMainDecks"
import { TableDeckContents } from "./components/TableDeckContents"
import './components/modal.css'

import { Modal, Button, Form } from 'react-bootstrap'

// modal-ikkunana näytettävä yhden deckin koko sisältö
// deckin kaikkien osioiden muokkaus: add, edit, delete cards
// formin kautta submit
// add kaikissa osioissa erikseen
// edit jokaisen kortin kohdalla - kortin vaihto eri versioon tai korttiin
// delete jokaisen kortin kohdalla
// kontrollointi & aukeaminen tapahtuu: DeckList.jsx -> TableDecks.js -> edit-button rivillä

const AllDeckContents = ({ isShowEditDeck, invokeModalEditDeck, query }) => {

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompanion, setCardsCompanion] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens

const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state
// const [searchName, setSearchName] = useState("")
// const [searchFormat, setSearchFormat] = useState("")
// const [create, setCreate] = useState(false)
// const [edit, setEdit] = useState(false)
// const [editCard, setEditCard] = useState(false)
// const [loading, setLoading] = useState(true) // Mahdollinen loading-tekstin näyttö statella

const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
// const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (dropdowneja varten)

// modalin aukaisu ja sulkeminen
// const [isShow, invokeModal] = useState(false)
const initModal = () => {
    // return invokeModal(!false)
    return invokeModalEditDeck(!isShowEditDeck)
  }

// hakee kaikki commanderit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  CommandersService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsCommander(data)
})
  .catch(error => console.log(error))
},[reload]
)

// hakee kaikki companionit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  CompanionsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsCompanion(data)
})
  .catch(error => console.log(error))
},[reload]
)

// hakee kaikki main deckin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  MainDecksService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsMainDeck(data)
})
  .catch(error => console.log(error))
},[reload]
)

// hakee kaikki maybe boardin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  MaybeboardsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsMaybeboard(data)
})
  .catch(error => console.log(error))
},[reload]
)

// hakee kaikki side boardin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  SideboardsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsSideboard(data)
})
  .catch(error => console.log(error))
},[reload]
)

// hakee kaikki tokenit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  TokensService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsTokens(data)
})
  .catch(error => console.log(error))
},[reload]
)

// Edit-funktio
// const updateCard = (card) =>  {
//   setEditCard(card)
//   setEdit(true)
// }

// const deleteCard = (card) => {
//   let answer = window.confirm(`Are you sure you want to permanently delete the card: ${card.id}?`)

//   if(answer === true) {
      
//   MainDecksService.remove(card.indexId)
//   .then(res => {
//       if (res.status === 200) {
//           setMessage(`Succesfully removed the deck: ${card.id}.`)
//           setIsPositive(true)
//           setShowMessage(true)
//           window.scrollBy(0, -10000) // Scrollaa ylös ruudun

//           // Ilmoituksen piilotus
//           setTimeout(() => {
//               setShowMessage(false)
//             }, 5000)
//             reloadNow(!reload)
//       }
//   })
//   .catch(error => {
//       setMessage(error)
//       setIsPositive(false)
//       setShowMessage(true)
//       window.scrollBy(0, -10000) // Scrollaa ylös ruudun

//       setTimeout(() => {
//         setShowMessage(false)
//       }, 6000)
//     })

//   } // Jos poisto perutaan, annetaan ilmoitus onnistuneesta perumisesta.
//   else {
//       setMessage('Canceled the deletion of the card.')
//           setIsPositive(true)
//           setShowMessage(true)
//           window.scrollBy(0, -10000) // Scrollaa ylös ruudun

//           setTimeout(() => {
//               setShowMessage(false)
//             }, 5000)
//   }
// }

  return (
    <div id="edit" className='container'>
      <Modal
      size='xl'
      show={isShowEditDeck}>
        <Modal.Header className='modalHeader' closeButton onClick={initModal}>
          <Modal.Title>Deck edit</Modal.Title>
        </Modal.Header >
        <Modal.Body className='modalContent'>
            {cardsCommander.length > 0 ? (
            <div className='table'><br/>              
                <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Commander"} />
            </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>There is no commander for the deck.</em><br/>
                </span>
            )}

            {cardsCompanion.length > 0 ? (
                <div className='table'><br/>              
                    <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Companion"} />
                </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>There is no companion for the deck.</em><br/>
                </span>
            )}

            {cardsMainDeck.length > 0 ? (
                <div className='table'><br/>              
                    <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsMainDeck} deckPart={"Main deck"} />            
                </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>Main deck is empty.</em><br/>
                </span>
            )}

            {cardsSideboard.length > 0 ? (
                <div className='table'><br/>              
                    <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Sideboard"} />
                </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>Sideboard is empty.</em><br/>
                </span>
            )}

            {cardsMaybeboard.length > 0 ? (
                <div className='table'><br/>              
                    <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Maybeboard"} />
                </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>Maybeboard is empty.</em><br/>
                </span>
            )}

            {cardsTokens.length > 0 ? (
                <div className='table'><br/>              
                    <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Tokens"} />
                </div>
            ) : (
                <span>
                <em className='subRowDataInfo'>There are no tokens for the deck.</em>
                </span>
            )}
        </Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={initModal}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AllDeckContents