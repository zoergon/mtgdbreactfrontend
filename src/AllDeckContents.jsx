import './App.css'
import React, { useState, useEffect } from 'react'
import MainDecksService from './services/MainDecks'
// import MainDeck from './MainDeck'
import MainDeckAdd from './MainDeckAdd'
import MainDeckEdit from './MainDeckEdit'
import { TableMainDecks } from "./components/TableMainDecks"
import { TableDeckContents } from "./components/TableDeckContents"

const AllDeckContents = ({ columns, deckName, query, setQuery, setIsPositive, setShowMessage, setMessage}) => {

const [cardsCommander, setCardsCommander] = useState([]) // deckId:llä haettu data backendistä - Commander
const [cardsCompany, setCardsCompany] = useState([]) // deckId:llä haettu data backendistä - Company
const [cardsMainDeck, setCardsMainDeck] = useState([]) // deckId:llä haettu data backendistä - MainDeck
const [cardsMaybeboard, setCardsMaybeboard] = useState([]) // deckId:llä haettu data backendistä - Maybeboard
const [cardsSideboard, setCardsSideboard] = useState([]) // deckId:llä haettu data backendistä - Sideboard
const [cardsTokens, setCardsTokens] = useState([]) // deckId:llä haettu data backendistä - Tokens
const [showCards, setShowCards] = useState(false)
const [reload, reloadNow] = useState(false) // Komponentin uudelleen päivitystä varten oleva state
const [searchName, setSearchName] = useState("")
const [searchFormat, setSearchFormat] = useState("")
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false)
const [editCard, setEditCard] = useState(false)
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
  if (query !== "") // Ei hae tyhjällä stringillä
  MainDecksService.getByDeckId(query) // parseInt stringille
  .then(data => {
    // console.log("getByDeckId", data)
    // setOptionList(data)
    setCardsMainDeck(data)
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

// Tarkistaa onko data haettu backendistä cards-stateen.
// Jollei ole, antaa sillä välin 'now loading' -paragrafin ilmoitukseksi.
  return (
    <>        
        {cardsMainDeck.length > 0 ? (
          <div className='table'><br/>              
              <TableDeckContents reloadNow={reloadNow} reload={reload} tbodyData={cardsMainDeck} deckName={"Main deck"} />            
          </div>
        ) : (
          <span>
            <em>...searching for the data...</em>
          </span>
        )}

        

    </>
  )
}

export default AllDeckContents