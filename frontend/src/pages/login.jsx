import Login from '../components/Login/login.jsx'
import LoginInfo from '../components/Login/loginInfo.jsx'
import LoginFooter from '../components/Login/loginFooter.jsx'
import Checkmark from '../components/Login/checkmark.jsx'
import LoginBottom from '../components/Login/loginBottom.jsx'
import FullLogin from '../components/Login/FullLogin.jsx'
import { useEffect } from 'react'

function LoginPage() {
    useEffect(() => {
  document.body.classList.add('login-page');

  return () => {
    document.body.classList.remove('login-page');
  };
}, []);
  return (
    <div className="LoginPage">
        <Login />
        <LoginInfo />
        <LoginFooter />
        <Checkmark />
        <LoginBottom />
    </div>
  )
}

export default LoginPage;