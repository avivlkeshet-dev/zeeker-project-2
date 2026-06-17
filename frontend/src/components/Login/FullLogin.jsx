import "./FullLogin.css";
import { useEffect, useState } from "react";
import axios from "axios";

function FullLogin() {
  const [phone, setPhone] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [checked, setChecked] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousHtmlBackground = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.backgroundColor = "#000";

    return () => {
      document.body.style.backgroundColor = previousBodyBackground;
      document.documentElement.style.backgroundColor = previousHtmlBackground;
    };
  }, []);

  const handleLogin = async () => {
    if (!checked) {
      setError("לאשר את תנאי השימוש כדי להמשיך");
      return;
    }

    if (!phone || !plateNumber) {
      setError("נא למלא את כל השורות");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { phone, plateNumber },
        { withCredentials: true },
      );

      if (response.status === 200) {
        const loggedInUserId = response.data.user.id;
      
        if (loggedInUserId) {
          localStorage.setItem('userId', loggedInUserId);
        }

        window.location.href = "/dashboard";
      }
    } catch (error) {
      const erorMsg = error.response?.data?.message || 'שגיאה בהתחברות, נסה שנית';
      setError(erorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="img-container min-vh-100">
      <div className="topImage">
        <img
          src="../src/assets/Frontpage.png"
          alt="login"
          className="login-image"
        />
      </div>
      <div className="container login-container d-flex flex-column mt-2">
        <p className="login-text">מספר טלפון נייד</p>
        <input 
          type="text"
          placeholder="מספר טלפון נייד"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
        <p className="login-text mt-2">מספר רישוי של הרכב</p>
        <input
          type="text"
          placeholder="מספר רישוי של הרכב"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          />
      </div>
      { error && (
        <div className="login-error text-danger mt-2 fw-bold">
          {error}
        </div>
      )}
      <div className="login-footer d-flex align-items-start">
        <p className="alert-text">
          ניתן להוסיף לאפליקציה רק רכבים שיובאו ע"י גיאו מוביליטי בע"מ
        </p>
        <img
          className="exclamation-mark"
          src="../src/assets/Layer_48.png"
          alt="Exclamation Mark"
        />
      </div>
      <div className="custom-checkbox">
        <p>
          אישור{" "}
          <a
            className="text-white"
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            תנאי השימוש
          </a>{" "}
          באפליקציה
        </p>
        <button
          className="mb-2"
          onClick={() => setChecked(!checked)}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid white",
            borderRadius: "8px",
            backgroundColor: "#000",
          }}
        >
          {checked && (
            <img
              src="../src/assets/Checkbox.png"
              alt="Checked"
              style={{ width: "50%", height: "40%" }}
            />
          )}
        </button>
      </div>
      <div className="login-bottom">
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading || !phone || !plateNumber || !checked}
        >
          {loading ? 'מתחבר...' : 'המשך'}
        </button>
        <a className="contact" href="/contact">
          ליצירת קשר
        </a>
      </div>
    </div>
  );
}

export default FullLogin;
