import './button.css'

function Button() {
  return ( 
            <button className="login-button" onClick={() => window.location.href = "/"}>
                תקפיצו אותי למסך הראשי
            </button>
   );
}

export default Button;
