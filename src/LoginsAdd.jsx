import './App.css'
import React, { useState } from 'react'
import LoginsService from './services/Logins'
import md5 from 'md5'

// parent: LoginsList.jsx
//
// Avautuu LoginsList.jsx:n Add-buttonin kautta

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const LoginsAdd = ({ setCreate, setIsPositive, setShowMessage, setMessage, createUser }) => {

const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newEmail, setNewEmail] = useState('')
const [newAccesslevelId, setNewAccesslevelId] = useState(2)
const [newUsername, setNewUsername] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newAdmin, setNewAdmin] = useState(true)
const [confirmPassword, setConfirmPassword] = useState('')


// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // vahvistetaan salasanan ja uudelleen syötetyn salasanan vastaavuus
  if (newPassword === confirmPassword) {
    // luodaan user-olio, joka poimii stateistä datan
  var newUser = {    
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    accesslevelId: parseInt(newAccesslevelId),
    username: newUsername,
    password: md5(newPassword), //salataan md5-kirjaston metodilla
    admin: newAdmin
  }

  console.log(newUser)
  createUser(
      newUser
    ) 
  // mikäli salasana ja vahvistus eivät vastaa toisiaan
  }else {
    setMessage('Comfirm by retyping the password.')
        setIsPositive(true)
        setShowMessage(true)
        window.scrollBy(0, -10000) // Scrollaa ylös ruudun

        setTimeout(() => {
            setShowMessage(false)
          }, 5000)
}
}


  return (
    <div id="addNew">        
        <h2>Add new user</h2>        

        <form onSubmit={handleSubmit}>          
          <div>
              <label>First Name: </label>
              <input id='firstName' type='text' value={newFirstName} placeholder='First Name'
                  onChange={({target}) => setNewFirstName(target.value)} required />
          </div>
          <div>
              <label>Last Name: </label>
              <input id='lastName' type='text' placeholder='Last Name'
                  value={newLastName} onChange={({target}) => setNewLastName(target.value)} required />
          </div>
          <div>
              <label>Email: </label>
              <input id='email' type='email' placeholder='Email'
                  value={newEmail} onChange={({target}) => setNewEmail(target.value)} required />
          </div>
          <div>
              <label>Access Level: </label>
              <input id='accesslevel' type='number' placeholder='Access Level'
                  value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} required />
          </div>
          <div>
              <label>Username: </label>
              <input id='username' type='text' placeholder='Username'
                  value={newUsername} onChange={({target}) => setNewUsername(target.value)} required />
          </div>
          <div>
              <label>Password: </label>
              <input id='password' type='password' placeholder='Password'
                  value={newPassword} onChange={({target}) => setNewPassword(target.value)} required />
          </div>
          <div>
              <label>Confirm Password: </label>
              <input id='confirmPassword' type='password' placeholder='Confirm Password'
                  value={confirmPassword} onChange={({target}) => setConfirmPassword(target.value)} required />
          </div>
          
          <input id="saveButton" type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setCreate(false)} />

        </form>

    </div>
  )
}

export default LoginsAdd