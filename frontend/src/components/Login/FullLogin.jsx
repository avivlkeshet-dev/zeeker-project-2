import './FullLogin.css';
import { useState } from 'react';

function FullLogin() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="img-container flex-column d-flex position-relative">
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
            <div className="custom-checkbox">
              <p>אישור <a className='text-white' href="/terms" target="_blank" rel="noopener noreferrer">תנאי השימוש</a> באפליקציה</p>
              <button className='login-page__checkbox-button mb-2'
              onClick={() => setChecked(!checked)}
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid white",
                borderRadius: "8px",
              }}
            >
              {checked && (
                <img
                  src="../src/assets/Checkbox.png"
                  alt="Checked"
                  style={{ width: "50%", height: "40%" }}
                />
              )}</button>
            </div>
            <div className="login-bottom">
            <button className="login-button" onClick={() => window.location.href = "/Pages"}>
                המשך
            </button>
            <a className="contact" href="/contact">
                ליצירת קשר
            </a>
        </div>
    </div>
  );
}

export default FullLogin;