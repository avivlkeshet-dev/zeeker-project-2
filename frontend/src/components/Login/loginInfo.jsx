import './loginInfo.css'

function LoginInfo({}) {
    return (
        <div className="container login-container d-flex flex-column mt-5">
            <p className="login-text">מספר טלפון נייד</p>
            <input type="text" placeholder="0541234567" />
            <p className="login-text mt-3">מספר רישוי של הרכב</p>
            <input type="text" placeholder="1234567" />
        </div>
    )
}

export default LoginInfo;