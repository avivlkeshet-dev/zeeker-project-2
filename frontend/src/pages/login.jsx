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
      <FullLogin />
    </div>
  )
}

export default LoginPage;