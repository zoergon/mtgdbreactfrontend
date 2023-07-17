import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import AllCardsService from './services/AllCards'
import CommandersService from './services/Commanders'
import CompanionsService from './services/Companions'
import MainDecksService from './services/MainDecks'
import MaybeboardsService from './services/Maybeboards'
import SideboardsService from './services/Sideboards'
import TokensService from './services/Tokens'
import DeckPartsService from './services/DeckParts'
import Dropdown from "./components/Dropdown.js"
import DropdownDeckParts from "./components/DropdownDeckParts.js"
import ModalCardEdit from './CardEdit.jsx'
import { TableDeckContents } from "./components/TableDeckContents"
import './components/modal.css'

import { Modal, Button } from 'react-bootstrap'

// modal-ikkunana näytettävä yhden deckin koko sisältö
// deckin kaikkien osioiden muokkaus: add, edit, delete cards
// formin kautta submit
// add kaikissa osioissa erikseen
// edit jokaisen kortin kohdalla - kortin vaihto eri versioon tai korttiin
// delete jokaisen kortin kohdalla
// kontrollointi & aukeaminen tapahtuu: DeckList.jsx -> TableDecks.js -> edit-button rivillä

const ModalDeckContents = ({ isShowEditDeck, invokeModalEditDeck, query, editDeck, setEditDeck, setIsPositive, setShowMessage, setMessage }) => {

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompanion, setCardsCompanion] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens

const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false) // Editointitila päälle/pois
const [editCard, setEditCard] = useState(false) // Editoitavan kortin data
const [isShowModalCardEdit, invokeModalCardEdit] = useState(false) // ModalCardEdit-modalin (CardEdit.jsx) aukaiseminen ja sulkeminen
// const [loading, setLoading] = useState(true) // Mahdollinen loading-tekstin näyttö statella
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state

const [img, setImg] = useState() // Kortin kuvalinkki

// const [newDeckId, setNewDeckId] = useState(query) // haetun deckin id
const [newId, setNewId] = useState('') // haetun kortin id
const [newName, setNewName] = useState('') // haetun kortin nimi
const [newCount, setNewCount] = useState(1) // vaihdettava lukumäärä
const [newLoginId, setNewLoginId] = useState(1) // käyttäjätunnuksen id

const [newDeckPartId, setNewDeckPartId] = useState('') // haetun kortin id
const [newDeckPartName, setNewDeckPartName] = useState('') // haetun kortin nimi

const [optionListCards, setOptionListCards] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListDeckParts, setOptionListDeckParts] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)

const [selected, setSelected] = useState([]) //
const [selectedDeckPart, setSelectedDeckPart] = useState([]) //
const [editableDeckPart, setEditableDeckPart] = useState([]) // Editoitavan kortin deckPart oikean servicen valintaan

const [queryCards, setQueryCards] = useState('') // Backendille lähtevä hakusana - dropdowniin
const [queryDeckParts, setQueryDeckParts] = useState('') // Backendille lähtevä hakusana - dropdowniin

const [service, setService] = useState('') // Oikean servicen valintaan - add-buttonin kautta sijoitus

var servicer = '' // Oikean servicen valintaan - add-buttonin kautta sijoitus handleAddX-functioiden kautta
var servicerChild = ''
var servicerCommander = CommandersService
var servicerCompanion = CompanionsService
var servicerMainDeck = MainDecksService
var servicerSideboard = SideboardsService
var servicerMaybeboard = MaybeboardsService
var servicerTokens = TokensService

// Kuvan asettamiseen tarvittavat
const imgUris = ''
var imageUri = ''

// Muuttujat kortin count-määrän muuttamiseen
var editCount = ''
var updateRow = ''


// Modal-ikkunan aukaiseminen ja sulkeminen
const initModal = () => {
    return invokeModalEditDeck(!isShowEditDeck)
  }

// useRef refresh-buttonille
const buttonRef = useRef(null)

// reload-staten kääntely
function clickHandler(event) {
  reloadNow(!reload)
}

// Hakee kaikki commanderit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  CommandersService.getByDeckId(query)
  .then(data => {
    setCardsCommander(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Hakee kaikki companionit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  CompanionsService.getByDeckId(query)
  .then(data => {
    setCardsCompanion(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Hakee kaikki main deckin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  MainDecksService.getByDeckId(query)
  .then(data => {
    setCardsMainDeck(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Hakee kaikki maybe boardin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  MaybeboardsService.getByDeckId(query)
  .then(data => {
    setCardsMaybeboard(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Hakee kaikki side boardin kortit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  SideboardsService.getByDeckId(query)
  .then(data => {
    setCardsSideboard(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Hakee kaikki tokenit deckId:n mukaisesti
useEffect(() => {
  if (query !== "") // Ei hae tyhjällä stringillä
  TokensService.getByDeckId(query)
  .then(data => {
    setCardsTokens(data)
})
  .catch(error => console.log(error))
},[query, reload]
)

// Add-funktion oikean servicen valintaan
const handleAdd = (e, servicer) => {
  if (newDeckPartId !== "") {
    if (newDeckPartId === 1) {servicer = CommandersService}
  if (newDeckPartId === 2) {servicer = CompanionsService}
  if (newDeckPartId === 3) {servicer = MainDecksService}
  if (newDeckPartId === 4) {servicer = SideboardsService}
  if (newDeckPartId === 5) {servicer = MaybeboardsService}
  if (newDeckPartId === 6) {servicer = TokensService}
  handleSubmit(e, servicer)
  }
}

// Kortin lisäämiseen luodaan kortti-olio, johon sijoitetaan stateista oikeat tiedot
const handleSubmit = (event, servicer) => {
  event.preventDefault()
    var newCard = {
    deckId: parseInt(query),
    id: newId,
    count: parseInt(newCount),
    loginId: parseInt(newLoginId)
  }

// Kortin lisääminen. Tämän olisi tarkoitus toimia muuttuvalla service-statella, riippuen mitä add-buttonia painetaan
  if (newId !== "") {
    // console.log("POST:", newId);
    // console.log("SERVICE:", servicer);
  servicer.create(newCard)
  .then(response => {
    if (response.status === 200) {
      buttonRef.current.addEventListener('click', clickHandler) // eventListener clickHandler-funktioon
      buttonRef.current.click() // Käskee klikata refresh-buttonia
      setMessage("Added a new Card: " + newCard.id)      
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setCreate(false)
      // Yllä oleva pois, jos setTimeoutin kautta määritellään setCreate falseksi
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

// Edit-funktio kortille
const updateCard = (card) =>  {  
  setEditCard(card) // Editoitava kortti (row)
  setEdit(true) // Editointitila päälle
  invokeModalCardEdit(!isShowModalCardEdit) // Avaa/sulkee ko. modal-ikkunan
}

// Delete-funktio kortille
const deleteCard = (card, servicer) => {
  let answer = window.confirm(`Are you sure you want to permanently delete the card: ${card.name}?`)

  if(answer === true) {

  // console.log("DELETE CARD:", servicer)
  servicer.remove(card.indexId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed the deck: ${card.id}.`)
          buttonRef.current.addEventListener('click', clickHandler) // eventListener clickHandler-funktioon
          buttonRef.current.click() // Käskee klikata refresh-buttonia
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
      setMessage('Canceled the deletion of the card.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
  }
}

// Kortit dropdown-valikkoon, data nimen perusteella queryCards => .getPartialName
useEffect(() => {
  if (queryCards !== "" && queryCards.length >= 3) // Ei hae tyhjällä stringillä
    AllCardsService.getPartialName(queryCards)
  .then(data => {
    // console.log("getName", data)
    setOptionListCards(data)
  },)
  .catch(error => console.log(error))
},[queryCards, reload]
)

// DeckParts dropdown-valikkoon data => .getAll
useEffect(() => {
  // if (queryCommander !== "" && queryCommander.length >= 3) // Ei hae tyhjällä stringillä
  DeckPartsService.getAll()
  .then(data => {    
    setOptionListDeckParts(data)
  },)
  .catch(error => console.log(error))
},[reload]
)

// Kortin lukumäärän (count) kasvattamiseen funktio
const increaseCount = (row, servicer) => {
  updateRow = (row)
  editCount = parseInt(updateRow.count) + 1  
  updateCount(updateRow, editCount, servicer)
}

// Kortin lukumäärän (count) vähentämiseen funktio
const decreaseCount = (row, servicer) => {
  updateRow = (row)
  if (updateRow.count != 1) {    
    editCount = parseInt(updateRow.count) - 1
    updateCount(updateRow, editCount, servicer)
  }
}

// Varsinainen päivittävä toiminto kortin countin muuttamiseen
const updateCount = (updateRow, editCount, servicer) => {  
  if (servicer !== "")
  // luodaan newCard-olio, joka poimii muuttujasta datan
  var newCard = {
      indexId: parseInt(updateRow.indexId),
      deckId: parseInt(updateRow.deckId),
      id: updateRow.id,
      count: parseInt(editCount),
      loginId: parseInt(updateRow.loginId)
  }
  // Kortin update
  servicer.update(newCard)
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

// Modalin sulkeminen ja mahdollinen pakotettu refresh stateihin
const refreshAndClose = () => {
  // setEditDeck("")
  // console.log("editDeck", editDeck)
  initModal()
}

  return (
    <div id="edit" className='container'>
      <Modal
      size='xl'
      show={isShowEditDeck}>
        <Modal.Header className='modalHeader' closeButton onClick={initModal}>
          <Modal.Title>Deck edit</Modal.Title>
        </Modal.Header >
        <Modal.Body className='modalContent'>
            <div style={{ display: "flex" }}>            
              <input placeholder='Search for cards...' type='text' value={queryCards} onChange={(e) => {setQueryCards(e.target.value)}} style={{ marginLeft: "0rem" }}/>
              <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected}
              isSearchable isMulti placeHolder={queryCards} options={optionListCards} onChange={(value) => value.map((option) => (setNewId(option.id)))} />
              <DropdownDeckParts newId={newDeckPartId} setNewId={setNewDeckPartId} newDeckPartName={newDeckPartName} setNewDeckPartName={setNewDeckPartName} 
              selected={selectedDeckPart} setSelected={setSelectedDeckPart} isSearchable isMulti placeHolder={queryDeckParts}
              options={optionListDeckParts} onChange={(value) => value.map((option) => (setNewDeckPartId(option.partId)))} />
              <button className='button' onClick={(e) => {handleAdd(e)}} >Add a card</button>
              <button ref={buttonRef} className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>
            </div>

            <div className='floatContainer'>        
              <div className="floatChildEditDeckTable">

                {cardsCommander.length > 0 ? (
                <div className='tableEditDeck'>
                    <TableDeckContents servicerChild={servicerChild} servicerX={servicerCommander} deleteCard={deleteCard} updateCard={updateCard}
                    reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Commander"}
                    imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>There is no commander for the deck.</em><br/>
                    </span>
                )}

                {cardsCompanion.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerCompanion} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsCompanion} deckPart={"Companion"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>There is no companion for the deck.</em>
                    </span>
                )}

                {cardsMainDeck.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerMainDeck} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsMainDeck} deckPart={"Main deck"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>Main deck is empty.</em><br/>                      
                    </span>
                )}

                {cardsSideboard.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerSideboard} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsSideboard} deckPart={"Sideboard"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>Sideboard is empty.</em><br/>                      
                    </span>
                )}

                {cardsMaybeboard.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerMaybeboard} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsMaybeboard} deckPart={"Maybeboard"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>Maybeboard is empty.</em><br/>                      
                    </span>
                )}

                {cardsTokens.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerTokens} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsTokens} deckPart={"Tokens"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} setEditableDeckPart={setEditableDeckPart} increaseCount={increaseCount} decreaseCount={decreaseCount} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      <em className='subRowDataInfo'>There are no tokens for the deck.</em>                      
                    </span>
                )}

              </div>

              <div className="floatChildEditDeckImage">
                <img style={{ height: '100%', width: '100%', paddingLeft: '0rem', paddingTop: '3rem' }} src={img}></img>
              </div>

            </div>

            {edit && <ModalCardEdit isShowModalCardEdit={isShowModalCardEdit} invokeModalCardEdit={invokeModalCardEdit} setEdit={setEdit}
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
              editCard={editCard} reload={reload} reloadNow={reloadNow} img={img} setImg={setImg} servicer={editableDeckPart}
            />}

        </Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button variant="danger" onClick={refreshAndClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalDeckContents