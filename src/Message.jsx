import './App.css'
import React from 'react';

// Kauttaaltaan sivustolla käytettävän ja näytettävän informaatio-viestin pohja
//
// Onnistunut positiivinen ilmoitus näytetään .css-muotoilujen mukaisesti vihreällä.
// Epäonnistunut negatiivinen ilmoitus näytetään .css-muotoilujen mukaisesti punaisella.

const Message = ({ message, isPositive }) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message