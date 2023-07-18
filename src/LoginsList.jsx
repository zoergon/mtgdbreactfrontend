import './App.css'
import React, { useState, useEffect } from 'react'
import LoginsService from './services/Logins'
import LoginsAdd from './LoginsAdd'
import LoginsEdit from './LoginsEdit'

const LoginsList = ({ setIsPositive, setShowMessage, setMessage }) => {

const [users, setUsers] = useState([])
const [create, setCreate] = useState(false)
const [edit, setEdit] = useState(false)
const [reload, reloadNow] = useState(false)

const [editUser, setEditUser] = useState(false)
const [search, setSearch] = useState("")

// Backend vaatii tokenin, jotta logins-lista saadaan näkyville
useEffect(() => {

  const token = localStorage.getItem('token')
        LoginsService
              .setToken(token)

  LoginsService.getAll()
  .then(data => {
    setUsers(data)
  })
},[create, reload, edit]
)

//hakukentän funktio
const handleSearchInputChange = (event) => {  
    setSearch(event.target.value.toLowerCase())
}

const createUser = (createUser) => {
  // uuden userin lisääminen
  LoginsService.create(createUser)
  .then(response => {
    if (response.status === 200) {
      setMessage(`Added new User: ${createUser.firstName} ${createUser.lastName}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)

      setCreate(false)
    }
  })
  .catch(error => {
    setMessage(error)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
  }
  // mikäli salasana ja vahvistus eivät vastaa toisiaan
  // else {
  //   setMessage('Vahvista syöttämällä salasana uudelleen.')
  //       setIsPositive(true)
  //       setShowMessage(true)
  //       window.scrollBy(0, -10000) // Scrollaa ylös ruudun

  //       setTimeout(() => {
  //           setShowMessage(false)
  //         }, 5000)


//edit-funktio
const updateUser = (user) =>  {
  setEditUser(user)
  setEdit(true)
}

//delete-user
const deleteUser = (user) => {
  let answer = window.confirm(`Remove User ${user.lastName}`)

  if(answer === true) {
      
  LoginsService.remove(user.loginId)
  .then(res => {
      if (res.status === 200) {
          setMessage(`Succesfully removed user ${user.lastName}`)
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
      setMessage('Canceled deleting user.')
          setIsPositive(true)
          setShowMessage(true)
          window.scrollBy(0, -10000) // Scrollaa ylös ruudun

          setTimeout(() => {
              setShowMessage(false)
            }, 5000)
  }
}

  return (
    <>  
        <h1><nobr>Users</nobr>

        {/* jos lisäystila = tosi, renderöidään UserAdd */}
        {create && <LoginsAdd setCreate={setCreate} createUser={createUser}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}
        
        {/* jos create = false */}
        {!create && <button className="button" onClick={() => setCreate(true)}>Add new user</button>}
        </h1>

        {!create && !edit &&
          <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
        }

        {edit && <LoginsEdit setEdit={setEdit}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        editUser={editUser}
        />}

        {/* jos create ja edit === false, niin näytetään taulukko */}
        {!create && !edit &&
        <table id="userTable">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>AccessLevel</th>
                    <th>Admin</th>
                </tr>                
            </thead>
            <tbody>

            {users && users.map(u => 
            {
              const lowerCaseName = u.lastName.toLowerCase()
              if (lowerCaseName.indexOf(search) > -1) {
                return(                  
                    <tr key={u.loginId}>
                        <td>{u.username}</td>
                        <td>{u.password}</td>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                        <td>{u.accesslevelId}</td>
                        <td>{u.admin}</td>
                        <td><button onClick={() => updateUser(u)}>Edit</button></td>
                        <td><button onClick={() => deleteUser(u)}>Delete</button></td>
                    </tr>                    
                )
              }
            }
            )
            }

            </tbody> 
        </table>
        }
    </>
  )
}

export default LoginsList