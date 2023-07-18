import './App.css'
import React, {useState} from 'react'
import LoginsService from './services/Logins'
import md5 from 'md5'

//setLisäystila-props - päästään lähtemään pois lisäyslomakkeelta!
const UserEdit = ({ setEdit, setIsPositive, setShowMessage, setMessage, editUser }) => {

//komponentin tilan määritys
const [newFirstName, setNewFirstName] = useState(editUser.firstName)
const [newLastName, setNewLastName] = useState(editUser.lastName)
const [newEmail, setNewEmail] = useState(editUser.email)

const [newAccesslevelId, setNewAccesslevelId] = useState(editUser.accesslevelId)
const [newUsername, setNewUsername] = useState(editUser.username)
const [newPassword, setNewPassword] = useState(editUser.password)
const [newAdmin, setNewAdmin] = useState(editUser.admin)

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan customer-olio, joka poimii stateistä datan
  var newUser = {
    firstName: newFirstName,
    lastName: newLastName,
    email: newEmail,
    accesslevelId: parseInt(newAccesslevelId),
    username: newUsername,
    password: md5(newPassword),    
    admin: newAdmin
  }

  // userin muokkaaminen
  LoginsService.update(editUser.loginId, newUser)
  .then(response => {
    if (response.status === 200) {
      setMessage(`Updated User: ${newUser.firstName} ${newUser.lastName}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setEdit(false)
      // yllä oleva pois jos setTimeoutin kautta määritellään setLisäystila falseksi
    }
  })
  .catch(error => {
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })

}


  return (
    <div id="edit">        
        <h2>Update a user</h2>        

        <form onSubmit={handleSubmit}>
          <div>
              <label>First Name: </label>
              <input type='text' value={newFirstName} placeholder='First Name'
                  onChange={({target}) => setNewFirstName(target.value)} required />
          </div>
          <div>
              <label>Last Name: </label>
              <input type='text' placeholder='Last Name'
                  value={newLastName} onChange={({target}) => setNewLastName(target.value)} required />
          </div>
          <div>
              <label>Email: </label>
              <input type='email' placeholder='Email'
                  value={newEmail} onChange={({target}) => setNewEmail(target.value)} />
          </div>
          <div>
              <label>Accesslevel: </label>
              <input type='number' placeholder='Accesslevel'
                  value={newAccesslevelId} onChange={({target}) => setNewAccesslevelId(target.value)} />
          </div>
          <div>
              <label>Username: </label>
              <input type='text' placeholder='Username'
                  value={newUsername} onChange={({target}) => setNewUsername(target.value)} />
          </div>
          <div>
              <label>Password: </label>
              <input type='password' placeholder='Password'
                  value={newPassword} onChange={({target}) => setNewPassword(target.value)} />
          </div>
          
          <input type='submit' value='Save' />

          <input type='button' value='Cancel' onClick={() => setEdit(false)} />

        </form>

    </div>
  )
}

export default UserEdit