import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import './welcome.css'
import TodoSvg from '../assets/todo.svg'
function Welcome() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  })
  //if the user is signed-in take them to homepage not to login page again
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [navigate])
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(
      () => {
        navigate('/homepage')
      }
    ).catch((error) => alert(error.message))
  }

  const handleRegister = () => {

    if (registerInfo.email !== registerInfo.confirmEmail) {
      alert('Please confirm that emails are the same')
      return
    } else if (registerInfo.password !== registerInfo.confirmPassword) {
      alert('Please confirm that passwords are the same')
      return
    }
    createUserWithEmailAndPassword(auth, registerInfo.email, registerInfo.password).then(() => {
      navigate('/homepage')
    }).catch(error => alert(error.message))
  }

  return (
    <div className='welcome'>
      <img src={TodoSvg} alt="todo-svg" className="todo-svg"/>
      <h1>Todo List</h1>
      <div className="login-register-container">
        {isRegistering ?
          <>
            <input type="email" placeholder='your@email.com' value={registerInfo.email} onChange={(e) => {
              setRegisterInfo({ ...registerInfo, email: e.target.value })
            }} />
            <input type="email" placeholder='your@email.com'
              value={registerInfo.confirmEmail}
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, confirmEmail: e.target.value })
              }} />
            <input type="password" placeholder="Password"
              value={registerInfo.password}
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }} />
            <input type="password" placeholder="Confirm password"
              value={registerInfo.confirmPassword}
              onChange={(e) => {
                setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })
              }} />
            <button onClick={handleRegister}
              className="sign-in-register-button">Register</button>
            {/* set is registering to false so that we go switch to login content */}
            <button onClick={() => setIsRegistering(false)} className="create-account-button" >Go Back</button>
          </>
          :
          <>
            <input type="email" onChange={handleEmailChange} value={email}
              placeholder="email@hotmail.com" />
            <input type="password" onChange={handlePasswordChange} value={password}
              placeholder="*******" />
            <button className="sign-in-register-button" onClick={handleSignIn}>Sign in</button>
            {/* set is registering to true so that we switch to regsitering content */}
            <button className="create-account-button" onClick={() => setIsRegistering(true)}>Create an account</button>
          </>

        }
      </div>
    </div>
  )
}

export default Welcome