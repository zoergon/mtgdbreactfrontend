import './App.css'
import React, {useState} from 'react'
import CommandersService from './services/Commanders'
import AllCardsService from './services/AllCards'
import DecksService from './services/Decks'
import AllCard from './AllCard'

const Commander = ({commander, updateCommander, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

const deleteCommander = (commander) => {
    let answer = window.confirm(`Are you sure you want to permanently remove the deck: ${commander.id}?`)

    if(answer === true) {
        
    CommandersService.remove(commander.indexId)
    .then(res => {
        if (res.status === 200) {
            setMessage(`Succesfully removed the commander: ${commander.id}.`)
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

  return (
    <div className='commanderDiv'>
        
        {/* <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        > */}        

        <h4 onClick={() => setShowDetails(!showDetails)}>
        {commander.name} | {commander.deckName} | {commander.id} | {commander.deckId}
        </h4>

        {showDetails && <div className='deckDetails'>
            <h3>{commander.name} | {commander.deckName}</h3>
            <button onClick={() => updateCommander(commander)}>Edit</button>
            <button onClick={() => deleteCommander(commander)}>Delete</button>
            <table>
                <thead>
                    <tr>
                        <th>deck_id</th>
                        <th>Deck</th>
                        <th>Name</th>
                        <th>id</th>
                        <th>Count</th>
                        <th>login_id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{commander.deckId}</td>
                        <td>{commander.deckName}</td>
                        <td>{commander.name}</td>
                        <td>{commander.id}</td>
                        <td>{commander.count}</td>
                        <td>{commander.loginId}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default Commander