import './button.css'

function Button() {
  return ( 
            <button className="files-button" onClick={() => window.location.href = "/"}>
                תקפיצו אותי למסך הראשי
            </button>
   );
}

export default Button;
