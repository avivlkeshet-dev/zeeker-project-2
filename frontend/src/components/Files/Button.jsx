import './button.css'

function Button() {
  return ( 
            <button className="files-button" onClick={() => window.location.href = "/dashboard"}>
                תקפיצו אותי למסך הראשי
            </button>
   );
}

export default Button;
