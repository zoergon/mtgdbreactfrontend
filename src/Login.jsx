import './App.css'
import React, {useState} from 'react'
import LoginService from './services/Auth'
import md5 from 'md5'
import { Modal, Button, Form } from 'react-bootstrap'
import './components/modal.css'

const ModalLogin = ({ isShowModalLogin, invokeModalLogin, setIsPositive, setShowMessage, setMessage, setLoggedInUser }) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

// Modal-ikkunan aukaiseminen ja sulkeminen
const initModal = () => {
  return invokeModalLogin(!isShowModalLogin)
}   

// onSubmit tapahtumankäsittelijä-funktio
const handleSubmit = (event) => {
  // estää oletusarvoisen käyttäytymisen
  event.preventDefault()
  // luodaan user-olio, joka poimii stateistä datan
  var userForAuth = {
    username: username,
    password: md5(password) //salataan md5-kirjaston metodilla
    // password: password //salataan md5-kirjaston metodilla
  }

  //console.log(userForAuth)

  // uuden userin lisääminen
  // response.data.token antaa pelkän tokenin datasta
  LoginService.authenticate(userForAuth)
  .then(response => {
      if (response.status === 200) {
        
        // console.log(response.data.token)
        localStorage.setItem("username", response.data.username)
        localStorage.setItem("loginId", response.data.loginId)
        localStorage.setItem("accesslevelId", response.data.accesslevelId)
        localStorage.setItem("token", response.data.token)

        setLoggedInUser(response.data.username)
        window.location.reload()

      setMessage(`Logged in as: ${userForAuth.username}`)
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  })
  .catch(error => {
    // alert(error.message)
    setMessage(error.message)
    setIsPositive(false)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 6000)
  })
}

// kenttien tyhjennys
const emptyFields = () => {
    setUsername("")
    setPassword("")
}

  return (
    <div id="loginWindow" className='container'>
      <Modal
        size='ml'        
        show={isShowModalLogin}>
            {/* <Modal.Header className='modalHeader' closeButton onClick={initModal}> */}
            <Modal.Header className='modalHeader' >
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalContent'>
                <Form id="cardEdit" onSubmit={handleSubmit}>
                    <Form.Group>
                      <div style={{ color: 'whitesmoke' }} >
                        <p>
                            Registering is not available for now. To try pages as a guest with limited access:<br/>                            
                            Username: guest<br/>
                            Password: guest<br/>                            
                        </p>
                      </div>
                      <div>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control id='username' type='text' placeholder='Username'
                            value={username} onChange={({target}) => setUsername(target.value)} />
                      </div>
                      <div>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control id='password' type='password' placeholder='Password'
                            value={password} onChange={({target}) => setPassword(target.value)} />
                          <br/>
                      </div>

                      <div style={{ display: "flex", float: "right" }}>                        
                        <Button id='loggaus' variant='primary' type='submit' value='Login'>Login</Button>{' '}{' '}

                        <Button variant="dark" type='button' value='Empty'onClick={() => emptyFields()}>Empty fields</Button>
                      </div>

                    </Form.Group>
                </Form>                
            </Modal.Body>
        </Modal>
        {/* <h2 id="login">Login</h2>        

        <form onSubmit={handleSubmit}>
            <div>
                <p>
                    Registering is not available for now. To try pages as a quest:<br/>
                    Username: quest<br/>
                    Password: quest<br/>
                </p>
            </div>
          <div>
              <label>Username: </label>
              <input id='username' type='text' placeholder='Username'
                  value={username} onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
              <label>Password: </label>
              <input id='password' type='password' placeholder='Password'
                  value={password} onChange={({target}) => setPassword(target.value)} />
          </div>
          
          <input id='loggaus' type='submit' value='Login' />

          <input type='button' value='Empty'onClick={() => emptyFields()} />

        </form> */}

    </div>
  )
}

export default ModalLogin
