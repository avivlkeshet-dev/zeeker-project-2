import { useEffect } from "react";
import "./header.css";
import "./FilesFull.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
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

  return (
    <div
      className="container-fluid d-flex flex-column w-100 min-vh-100"
      style={{ backgroundColor: "#000" }}
    >
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

      <div className="text-white d-flex justify-content-end w-100 position-relative mt-4" style={{ backgroundColor: "#000" }}>
        <div>
          <img className="Border mt-3" src="../src/assets/Orange.png" />
        </div>
        <div className="d-flex flex-column align-items-end justify-content-end me-3">
          <div className="d-flex align-items-center m-0">
            <p className="NumOfFiles m-0 me-2">סה"כ 3 מסמכים</p>
            <h1 className="Separator">|</h1>
            <h1 className="my-docs m-0 ms-2 fw-medium">המסמכים שלי</h1>
          </div>
          <div>
            <p className="MB d-flex justify-content-end">
              2MB אפשר להעלות עד 10 קבצים בגודל של עד
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Header;
