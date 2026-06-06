import './loginInfo.css'

function LoginInfo({}) {
    return (
        <div className="container login-container d-flex flex-column">
            <p className="login-text">מספר טלפון נייד</p>
            <input type="text" placeholder="0541234567" />
            <p className="login-text">מספר רישוי של הרכב</p>
            <input type="text" placeholder="1234567" />
        </div>
    )
}

export default LoginInfo;