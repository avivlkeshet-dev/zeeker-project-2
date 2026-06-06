import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Titles.css";

function Titles() {
  return (
    <div className="container-fluid my-docs bg-dark text-white">
      <div className="top-container d-flex flex-column justify-content-end w-100 position-relative mt-4">
        <div className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex flex-column align-items-center m-0">
            <p className="text-center m-0 me-2">סה"כ 1 מסמכים</p>
            </div>
            <h1 className="Separator">|</h1>
            <h1 className="my-docs m-0 ms-2 fw-medium">מסמכים שהועלו ע"י זיקר</h1>
        </div>
        <p className="MB d-flex justify-content-end me-3">
          מסמכים אלה אינם ניתנים למחיקה
        </p>
      </div>
    </div>
  );
}

export default Titles;
