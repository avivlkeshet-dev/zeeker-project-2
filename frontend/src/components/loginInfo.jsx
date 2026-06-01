import './loginInfo.css'

function LoginInfo({ infoText, placeholderText }) {
    return (
        <div className="login-container">
            <p> hi</p>
            <p className="login-text">{infoText}</p>
            <input type="text" placeholder={placeholderText} />
        </div>
    )
}

export default LoginInfo;