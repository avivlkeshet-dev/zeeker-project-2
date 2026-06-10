import { useState } from 'react'
import './App.css'
// import Login from './components/login.jsx'
// import LoginInfo from './components/loginInfo.jsx';
import { RouterProvider } from 'react-router-dom'
import router from './routes/route.jsx'

function App() {
  // return (
  //   <div className="App">
  //     <Login />
  //     <LoginInfo infoText="מספר טלפון נייד" placeholderText="0541234567" />
  //     <LoginInfo infoText="מספר רישוי של הרכב" placeholderText="1234567" />
  //   </div>
  // )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;