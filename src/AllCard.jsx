import './App.css'
import React, {useState} from 'react'
import AllCardsService from './services/AllCards'

// props nimetty allcard
const AllCard = ({allcard, setIsPositive, setMessage, setShowMessage, reload, reloadNow}) => {

//komponentin tilan määritys
const [showDetails, setShowDetails] = useState(false)

  return (
    <div className='allcardDiv'>
        
        {/* <h4 onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        > */}

        <h4 onClick={() => setShowDetails(!showDetails)}>
            {allcard.name} , {allcard.id}
        </h4>

        {showDetails && <div className='allCardDetails'>
            <h3>{allcard.name}</h3>
            {/* <button onClick={() => editAllCard(allcard)}>Edit</button> */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{allcard.name}</td>
                        <td>{allcard.id}</td>
                    </tr>
                </tbody>
            </table></div>}
    </div>
  )
}

export default AllCard