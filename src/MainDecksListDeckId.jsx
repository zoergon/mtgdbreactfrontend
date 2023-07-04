import './App.css'
import React, { useState, useEffect } from 'react'
import MainDecksService from './services/MainDecks'
// import MainDeck from './MainDeck'
import MainDeckAdd from './MainDeckAdd'
import MainDeckEdit from './MainDeckEdit'
import { TableDeckContents } from "./components/TableDeckContents"

const MainDecksListDeckId = ({ columns, deckName, query, setQuery, setIsPositive, setShowMessage, setMessage}) => {
// query = parentilta tuleva, tablesta klikatun deckin antama row.original.deckId = deckId, jolla haetaan backendistä oikean pakan kortit

const [cards, setCards] = useState([])
const [showCards, setShowCards] = useState(false)
const [reload, reloadNow] = useState(false)
const [searchName, setSearchName] = useState("")
const [searchFormat, setSearchFormat] = useState("")
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false)
const [editCard, setEditCard] = useState(false)
// const [loading, setLoading] = useState(true)

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
    setCards(data)
})
  .catch(error => console.log(error))
},[reload]
)

// Edit-funktio
const updateCard = (card) =>  {
  setEditCard(card)
  setEdit(true)
}

const deleteCard = (card) => {
  let answer = window.confirm(`Are you sure you want to permanently delete the card: ${card.id}?`)

  if(answer === true) {
      
  MainDecksService.remove(card.indexId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed the deck: ${card.id}.`)
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

// Tarkistaa onko data haettu backendistä cards-stateen.
// Jollei ole, antaa sillä välin 'now loading' -paragrafin ilmoitukseksi.
if (cards.length > 0) {
  return (
    <>        

        <div className='table'><br/>            
            {!create && <button className="button" onClick={() => setCreate(true)}>Add a card</button>}{' '}
            <TableDeckContents edit={edit} setEdit={setEdit} create={create} setCreate={setCreate} editCard={editCard} reloadNow={reloadNow} reload={reload}
                    setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
                    updateCard={updateCard} deleteCard={deleteCard} tbodyData={cards} deckName={deckName} />            
        </div>

        {create && <MainDeckAdd setCreate={setCreate}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} setQuery={setQuery} reloadNow={reloadNow}
        />}

        {edit && <MainDeckEdit setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} reload={reload} reloadNow={reloadNow}
        editCard={editCard} setQuery={setQuery}
        />}

    </>
  )

} else {
  return (
    <div>      
      <p>*** now loading ***</p>
    </div>
  )
}

}

export default MainDecksListDeckId