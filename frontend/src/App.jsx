import { useState } from 'react'
import './App.css'
import Login from './components/login.jsx'
import LoginInfo from './components/loginInfo.jsx'
import LoginFooter from './components/loginFooter.jsx'
import Checkmark from './components/checkmark.jsx'
import LoginBottom from './components/loginBottom.jsx'

function App() {
  return (
    <div className="App">
      <Login />
      <LoginInfo />
      <LoginFooter />
      <Checkmark />
      <LoginBottom />
    </div>
  )
}

export default App