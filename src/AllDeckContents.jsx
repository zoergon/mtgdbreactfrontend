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
import { TableAllDeckContents } from "./components/TableAllDeckContents"

// subRow:na näytettävä deckin koko sisältö (kaikki deckit omilla riveillään)
// kontrollointi & aukeaminen tapahtuu: DeckList.jsx -> TableDecks.js -> subRow

const AllDeckContents = ({ query }) => {

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompanion, setCardsCompanion] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens
// const [showCards, setShowCards] = useState(false)
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state

const [img, setImg] = useState() // Kortin kuvalinkki

// const [searchName, setSearchName] = useState("")
// const [searchFormat, setSearchFormat] = useState("")
// const [create, setCreate] = useState(false)
// const [edit, setEdit] = useState(false)
// const [editCard, setEditCard] = useState(false)
// const [loading, setLoading] = useState(true) // Mahdollinen loading-tekstin näyttö statella

// useEffect(() => {
//     MainDecksService.getAll()
//   .then(data => {
//     console.log(data)
//     setCards(data)
//   })
//   .catch(error => console.log(error))
// },[create, edit, reload]
// )

// const [optionList, setOptionList] = useState([]) // Backendistä saatu data sijoitetaan tänne
// const [query, setQuery] = useState("") // Bäckendille lähtevä hakusana (deckId)

// const handleFetch = (query) => {
//   MainDecksService.getByDeckId(query).then((res) => {
//     setCards(res.data)
//     // setLoading(false)
//   }).catch(error => console.log(error))}
  

// useEffect(() => {
//   if (query !== "")
//   handleFetch(query)
// })

useEffect(() => {

  const token = localStorage.getItem('token')
      CommandersService
            .setToken(token)

  if (query !== "") // Ei hae tyhjällä stringillä
  CommandersService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsCommander(data)
})
  .catch(error => console.log(error))
},[reload]
)

useEffect(() => {

  const token = localStorage.getItem('token')
      CompanionsService
            .setToken(token)

  if (query !== "") // Ei hae tyhjällä stringillä
  CompanionsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsCompanion(data)
})
  .catch(error => console.log(error))
},[reload]
)

useEffect(() => {

  const token = localStorage.getItem('token')
      MainDecksService
            .setToken(token)

  if (query !== "") // Ei hae tyhjällä stringillä
  MainDecksService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsMainDeck(data)
})
  .catch(error => console.log(error))
},[reload]
)

useEffect(() => {

  const token = localStorage.getItem('token')
      MaybeboardsService
            .setToken(token)

  if (query !== "") // Ei hae tyhjällä stringillä
  MaybeboardsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsMaybeboard(data)
})
  .catch(error => console.log(error))
},[reload]
)

useEffect(() => {

  const token = localStorage.getItem('token')
      SideboardsService
            .setToken(token)

  if (query !== "") // Ei hae tyhjällä stringillä
  SideboardsService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)    
    setCardsSideboard(data)
})
  .catch(error => console.log(error))
},[reload]
)

useEffect(() => {

  const token = localStorage.getItem('token')
      TokensService
            .setToken(token)

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

const imgUris = ""
var imageUri = ""

  return (
    <>
      <div className='floatContainer'>        
        <div className="floatChild">
          {cardsCommander.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCommander} deckPart={"Commander"}
                  imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>          
              <em className='subRowDataInfo'>There is no commander for the deck.</em><br/>
            </span>
          )}

          {cardsCompanion.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsCompanion} deckPart={"Companion"}
                  imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>
              <em className='subRowDataInfo'>There is no companion for the deck.</em><br/>
            </span>
          )}

          {cardsMainDeck.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsMainDeck} deckPart={"Main deck"}
                imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>
              <em className='subRowDataInfo'>Main deck is empty.</em><br/>
            </span>
          )}

          {cardsSideboard.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsSideboard} deckPart={"Sideboard"}
                  imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>
              <em className='subRowDataInfo'>Sideboard is empty.</em><br/>
            </span>
          )}

          {cardsMaybeboard.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsMaybeboard} deckPart={"Maybeboard"}
                  imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>
              <em className='subRowDataInfo'>Maybeboard is empty.</em><br/>
            </span>
          )}

          {cardsTokens.length > 0 ? (
            <div className='table'><br/>              
                <TableAllDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsTokens} deckPart={"Tokens"}
                  imgUris={imgUris} imageUri={imageUri} setImg={setImg} />
            </div>
          ) : (
            <span>
              <em className='subRowDataInfo'>There are no tokens for the deck.</em>
            </span>
          )}
        </div>
        <div className="floatChild">
          <img style={{ height: '60%', width: '60%', paddingLeft: '3rem', paddingTop: '0rem' }} src={img}></img>
        </div>
      </div>
    </>
  )
}

export default AllDeckContents