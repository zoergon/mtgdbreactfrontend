import './App.css'
import React, {useState} from 'react'
import CommandersService from './services/Commanders'
import AllCardsService from './services/AllCards'
import DecksService from './services/Decks'

const Commander = ({commander, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='commanderDiv'>
        
        {/* <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        > */}

        <h4 onClick={() => setShowDetails(!showDetails)}>
            {commander.id} , {commander.deckId}
        </h4>

        {showDetails && <div className='deckDetails'>
            <h3>{commander.name}</h3>
            {/* <button onClick={() => editAllCard(allcard)}>Edit</button> */}
            <table>
                <thead>
                    <tr>
                        <th>deck_id</th>
                        <th>id</th>
                        <th>Count</th>
                        <th>login_id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{commander.deckId}</td>
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