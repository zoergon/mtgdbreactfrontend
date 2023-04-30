import './App.css'
import React, {useState} from 'react'
import AllCardsService from './services/AllCards'

// props nimetty allcard
const AllCard = ({allCard, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='allcardDiv'>
        
        {/* <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        > */}

        <h4 onClick={() => setShowDetails(!showDetails)}>
            {allCard.name} | {allCard.rarity} | {allCard.typeLine} | {allCard.manaCost} | {allCard.setName} | {allCard.lang} | {allCard.id}
        </h4>

        {showDetails && <div className='allCardDetails'>
            <h3>{allCard.name}</h3>
            {/* <button onClick={() => editAllCard(allcard)}>Edit</button> */}
            <table>
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>Rarity</th>                        
                        <th>Mana Cost</th>
                        <th>Type Line</th>
                        <th>Oracle Text</th>
                        <th>Power</th>
                        <th>Toughness</th>
                        <th>Set</th>
                        <th>Lang</th>
                        <th>Border Color</th>
                        <th>Object</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>                        
                        <td>{allCard.name}</td>
                        <td>{allCard.rarity}</td>                        
                        <td>{allCard.manaCost}</td>
                        <td>{allCard.typeLine}</td>
                        <td>{allCard.oracleText}</td>
                        <td>{allCard.power}</td>
                        <td>{allCard.toughness}</td>
                        <td>{allCard.setName}</td>
                        <td>{allCard.lang}</td>
                        <td>{allCard.borderColor}</td>
                        <td>{allCard.object}</td>
                        <td>{allCard.id}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default AllCard