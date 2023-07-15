import './App.css'
import React, { useState, useEffect } from 'react'
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

const DeckContents = ({ isShowEditDeck, invokeModalEditDeck, query, editDeck, setIsPositive, setShowMessage, setMessage }) => {

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompanion, setCardsCompanion] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens

// const [searchName, setSearchName] = useState("")
// const [searchFormat, setSearchFormat] = useState("")
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false) // Editointitila päälle/pois
const [editCard, setEditCard] = useState(false) // Editoitavan kortin data
const [isShowModalCardEdit, invokeModalCardEdit] = useState(false) // ModalCardEdit-modalin (CardEdit.jsx) aukaiseminen ja sulkeminen
// const [loading, setLoading] = useState(true) // Mahdollinen loading-tekstin näyttö statella
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state

const [img, setImg] = useState() // Kortin kuvalinkki

const [newDeckId, setNewDeckId] = useState(editDeck.deckId) // haetun deckin id
const [newId, setNewId] = useState("") // haetun kortin id
const [newName, setNewName] = useState("") // haetun kortin nimi
const [newCount, setNewCount] = useState(1) // vaihdettava lukumäärä
const [newLoginId, setNewLoginId] = useState(1) // käyttäjätunnuksen id

const [newDeckPartId, setNewDeckPartId] = useState("") // haetun kortin id
const [newDeckPartName, setNewDeckPartName] = useState("") // haetun kortin nimi

const [optionListCards, setOptionListCards] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListDeckParts, setOptionListDeckParts] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)

const [optionListCommander, setOptionListCommander] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListCompanion, setOptionListCompanion] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListMainDeck, setOptionListMainDeck] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListSideboard, setOptionListSideboard] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListMaybeboard, setOptionListMaybeboard] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)
const [optionListTokens, setOptionListTokens] = useState([]) // Backendistä saatu data sijoitetaan tänne (dropdowneja varten)

const [selected, setSelected] = useState([]) //
const [selectedDeckPart, setSelectedDeckPart] = useState([]) //

const [queryCards, setQueryCards] = useState("") // Backendille lähtevä hakusana - dropdowniin
const [queryDeckParts, setQueryDeckParts] = useState("") // Backendille lähtevä hakusana - dropdowniin

const [queryCommander, setQueryCommander] = useState("") // Backendille lähtevä hakusana - commander
const [queryCompanion, setQueryCompanion] = useState("") // Backendille lähtevä hakusana - companion
const [queryMainDeck, setQueryMainDeck] = useState("") // Backendille lähtevä hakusana - main deck
const [queryMaybeboard, setQueryMaybeboard] = useState("") // Backendille lähtevä hakusana - maybeboard
const [querySideboard, setQuerySideboard] = useState("") // Backendille lähtevä hakusana - sideboard
const [queryTokens, setQueryTokens] = useState("") // Backendille lähtevä hakusana - tokens

const [service, setService] = useState("") // Oikean servicen valintaan - add-buttonin kautta sijoitus

var servicer = "" // Oikean servicen valintaan - add-buttonin kautta sijoitus handleAddX-functioiden kautta
var servicerChild = ""
var servicerCommander = CommandersService
var servicerCompanion = CompanionsService
var servicerMainDeck = MainDecksService
var servicerSideboard = SideboardsService
var servicerMaybeboard = MaybeboardsService
var servicerTokens = TokensService

// Modal-ikkunan aukaiseminen ja sulkeminen
const initModal = () => {
    return invokeModalEditDeck(!isShowEditDeck)
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

// Kortin lisäämiseen luodaan kortti-olio, johon sijoitetaan stateista oikeat tiedot
const handleSubmit = (event, servicer) => {
  event.preventDefault()
    var newCard = {
    deckId: parseInt(newDeckId),
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
      setMessage("Added a new Card: " + newCard.id)
      reloadNow(!reload)
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

// Edit-funktio
const updateCard = (card) =>  {
  setEditCard(card) // Editoitava kortti (row)
  setEdit(true) // Editointitila päälle
  invokeModalCardEdit(!isShowModalCardEdit) // Avaa/sulkee ko. modal-ikkunan
}

const deleteCard = (card, servicer) => {
  let answer = window.confirm(`Are you sure you want to permanently delete the card: ${card.name}?`)

  if(answer === true) {

  // console.log("DELETE CARD:", servicer)
  servicer.remove(card.indexId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed the deck: ${card.id}.`)
          reloadNow(!reload)
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

// Companionin haku <input> asettaa queryn, jota käytetään useEffectillä backendille pyyntöihin
// const onQueryCompanion = (e) => {
//   setQueryCompanion(e.target.value)
//   // console.log("query: ", query)
// }

// hoitaa millä queryllä dropdowneihin haetaan data
// const handleQuery = (e) => {
//   setQueryDropdown(e.target.value)
//   console.log("Query Dropdown:". queryDropdown)
// }

// Kortit dropdown-valikkoon data .getName
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

// DeckParts dropdown-valikkoon data .getAll
useEffect(() => {
  // if (queryCommander !== "" && queryCommander.length >= 3) // Ei hae tyhjällä stringillä
  DeckPartsService.getAll()
  .then(data => {
    // console.log("DeckParts", data)
    setOptionListDeckParts(data)
  },)
  .catch(error => console.log(error))
},[reload]
)

// Dropdown-valikkoon data .getName - commander
// useEffect(() => {
//   if (queryCommander !== "" && queryCommander.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(queryCommander)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListCommander(data)
//   },)
//   .catch(error => console.log(error))
// },[queryCommander, reload]
// )

// Dropdown-valikkoon data .getName - companion
// useEffect(() => {
//   if (queryCompanion !== "" && queryCompanion.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(queryCompanion)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListCompanion(data)
//   },)
//   .catch(error => console.log(error))
// },[queryCompanion, reload]
// )

// Dropdown-valikkoon data .getName - mainDeck
// useEffect(() => {
//   if (queryMainDeck !== "" && queryMainDeck.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(queryMainDeck)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListMainDeck(data)
//   },)
//   .catch(error => console.log(error))
// },[queryMainDeck, reload]
// )

// Dropdown-valikkoon data .getName - sideboard
// useEffect(() => {
//   if (querySideboard !== "" && querySideboard.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(querySideboard)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListSideboard(data)
//   },)
//   .catch(error => console.log(error))
// },[querySideboard, reload]
// )

// Dropdown-valikkoon data .getName - maybeboard
// useEffect(() => {
//   if (queryMaybeboard !== "" && queryMaybeboard.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(queryMaybeboard)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListMaybeboard(data)
//   },)
//   .catch(error => console.log(error))
// },[queryMaybeboard, reload]
// )

// Dropdown-valikkoon data .getName - tokens
// useEffect(() => {
//   if (queryTokens !== "" && queryTokens.length >= 3) // Ei hae tyhjällä stringillä
//     AllCardsService.getPartialName(queryTokens)
//   .then(data => {
//     console.log("getName", data)
//     setOptionListTokens(data)
//   },)
//   .catch(error => console.log(error))
// },[queryTokens, reload]
// )

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

// const handleAddCommander = (e, servicer) => {
//   servicer = CommandersService
//   handleSubmit(e, servicer)
// }

// const handleAddCompanion = (e, servicer) => {
//   servicer = CompanionsService
//   handleSubmit(e, servicer)
// }

// const handleAddMainDeck = (e, servicer) => {
//   servicer = MainDecksService
//   handleSubmit(e, servicer)
// }

// const handleAddSideboard = (e, servicer) => {
//   servicer = SideboardsService
//   handleSubmit(e, servicer)
// }

// const handleAddMaybeboard = (e, servicer) => {
//   servicer = MaybeboardsService
//   handleSubmit(e, servicer)
// }

// const handleAddTokens = (e, servicer) => {
//   servicer = TokensService
//   handleSubmit(e, servicer)
// }

const imgUris = ""
var imageUri = ""

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
            <input type='text' value={queryCards} onChange={(e) => {setQueryCards(e.target.value)}} style={{ marginLeft: "0rem" }}/>
            <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryCards} options={optionListCards} onChange={(value) => value.map((option) => (setNewId(option.id)))} />
            <DropdownDeckParts newId={newDeckPartId} setNewId={setNewDeckPartId} newDeckPartName={newDeckPartName} setNewDeckPartName={setNewDeckPartName} selected={selectedDeckPart} setSelected={setSelectedDeckPart} isSearchable isMulti placeHolder={queryDeckParts} options={optionListDeckParts} onChange={(value) => value.map((option) => (setNewDeckPartId(option.partId)))} />
            <button className='button' onClick={(e) => {handleAdd(e)}} >Add a card</button>
            <button className='button' onClick={(e) => {reloadNow(!reload)}}>Refresh</button>
            </div>

            <div className='float-container'>        
              <div className="float-child-editDeckTable">

                {cardsCommander.length > 0 ? (
                <div className='tableEditDeck'>
                    <TableDeckContents servicerChild={servicerChild} servicerX={servicerCommander} deleteCard={deleteCard} updateCard={updateCard}
                    reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Commander"}
                    imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddCommander(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>There is no commander for the deck.</em><br/>
                      {/* <input type='text' value={queryCommander} onChange={(e) => {setQueryCommander(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryCommander} options={optionListCommander} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

                {cardsCompanion.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerCompanion} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsCompanion} deckPart={"Companion"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddCompanion(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>There is no companion for the deck.</em>
                      {/* <input type='text' value={queryCompanion} onChange={(e) => {setQueryCompanion(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryCompanion} options={optionListCompanion} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

                {cardsMainDeck.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerMainDeck} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsMainDeck} deckPart={"Main deck"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddMainDeck(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>Main deck is empty.</em><br/>
                      {/* <input type='text' value={queryMainDeck} onChange={(e) => {setQueryMainDeck(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryMainDeck} options={optionListMainDeck} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

                {cardsSideboard.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerSideboard} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsSideboard} deckPart={"Sideboard"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddSideboard(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>Sideboard is empty.</em><br/>
                      {/* <input type='text' value={querySideboard} onChange={(e) => {setQuerySideboard(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={querySideboard} options={optionListSideboard} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

                {cardsMaybeboard.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerMaybeboard} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsMaybeboard} deckPart={"Maybeboard"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddMaybeboard(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>Maybeboard is empty.</em><br/>
                      {/* <input type='text' value={queryMaybeboard} onChange={(e) => {setQueryMaybeboard(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryMaybeboard} options={optionListMaybeboard} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

                {cardsTokens.length > 0 ? (
                    <div className='tableEditDeck'>
                        <TableDeckContents servicerChild={servicerChild} servicerX={servicerTokens} deleteCard={deleteCard} updateCard={updateCard}
                        reloadNow={reloadNow} reload={reload} tbodyData={cardsTokens} deckPart={"Tokens"}
                        imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
                    </div>
                ) : (
                    <span style={{ display: "flex" }}>
                      {/* <button className='button'
                        onClick={(e) => {
                          handleAddTokens(e)}} >Add a card</button> */}
                      <em className='subRowDataInfo'>There are no tokens for the deck.</em>
                      {/* <input type='text' value={queryTokens} onChange={(e) => {setQueryTokens(e.target.value)}} style={{ marginLeft: "1rem" }}/>
                      <Dropdown newId={newId} setNewId={setNewId} newName={newName} setNewName={setNewName} selected={selected} setSelected={setSelected} isSearchable isMulti placeHolder={queryTokens} options={optionListTokens} onChange={(value) => value.map((option) => (setNewId(option.id)))} /> */}
                    </span>
                )}

              </div>

              <div className="float-child-editDeckImage">
                <img style={{ height: '100%', width: '100%', paddingLeft: '0rem', paddingTop: '3rem' }} src={img}></img>
              </div>

            </div>

            {edit && <ModalCardEdit isShowModalCardEdit={isShowModalCardEdit} invokeModalCardEdit={invokeModalCardEdit} setEdit={setEdit}
              setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
              editCard={editCard}
            />}

        </Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeckContents