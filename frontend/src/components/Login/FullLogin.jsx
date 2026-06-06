import './FullLogin.css';

function FullLogin() {
  return (
    <div className="img-container d-flex flex-column">
        <div className="topImage">
        <img src="../src/assets/Frontpage.png" alt="login" className="login-image" />
        </div>
            
            <div className="container login-container d-flex flex-column mt-2">
            <p className="login-text">מספר טלפון נייד</p>
            <input type="text" placeholder="0541234567" />
            <p className="login-text mt-2">מספר רישוי של הרכב</p>
            <input type="text" placeholder="1234567" />
        </div>
                <div className="login-footer d-flex align-items-start">
            <p className="alert-text">ניתן להוסיף לאפליקציה רק רכבים שיובאו ע"י גיאו מוביליטי בע"מ</p>
            <img className="exclamation-mark" src="../src/assets/Layer_48.png" alt="Exclamation Mark" />
        </div>
    </div>
  );
}

export default FullLogin;