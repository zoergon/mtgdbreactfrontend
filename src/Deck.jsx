import './App.css'
import React, {useState} from 'react'
import DecksService from './services/Decks'

const Deck = ({deck, editDeck, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteDeck = (deck) => {
    let answer = window.confirm(`Remove Deck ${deck.deckName}`)

    if(answer === true) {
        
    DecksService.remove(deck.deckId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Succesfully removed deck ${deck.deckName}`)
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
        setMessage('Canceled deleting the deck.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollaa ylös ruudun

            setTimeout(() => {
                setShowMessage(false)
              }, 5000)
    }
}

  return (
    <div className='deckDiv'>
        
        {/* <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        > */}

        <h4 onClick={() => setShowDetails(!showDetails)}>
            {deck.name} , {deck.format}
        </h4>

        {showDetails && <div className='deckDetails'>
            <h3>{deck.name}</h3>
            <button onClick={() => editDeck(deck)}>Edit</button>
            <button onClick={() => deleteDeck(deck)}>Delete</button>
            <table>
                <thead>
                    <tr>
                        <th>deck_id</th>
                        <th>Name</th>
                        <th>Format</th>
                        <th>login_id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{deck.deckId}</td>
                        <td>{deck.name}</td>
                        <td>{deck.format}</td>
                        <td>{deck.loginId}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default Deck