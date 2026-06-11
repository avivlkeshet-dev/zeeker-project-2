import './header.css';
import xIcon from '../../assets/X.png';
import backIcon from '../../assets/Back.png';

function Header() {
    return (
    <div className="container-fluid d-flex flex-column w-100">
      <div className="header text-white d-flex justify-content-between">
        <div className="cross m-3">
          <img src="../src/assets/X.png" />
        </div>
        <div>
          <h2 className="m-4 carName">ZEEKR X</h2>
        </div>
        <div className="back m-3">
          <img src="../src/assets/Back.png" />
        </div>
      </div>
      </div>
    )
}
export default Header;