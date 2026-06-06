import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MyDocs.css";

function MyDocs() {
  return (
    <div className="container-fluid my-docs bg-dark text-white">
      {/* <Container className="w-100 me-0 d-flex justify-content-end align-items-center mt-4">
      <Row className='d-flex justify-content-end align-items-center'>
        <Col xs="auto" className='amount mt-3'>סה"כ 3 מסמכים</Col>
        <Col xs="auto" className='bar fs-6 mt-3'>|</Col>
        <Col xs="auto" className='myDocs me-2 mt-3'>המסמכים שלי</Col>
      </Row>
    </Container> */}
      <div className="top-container d-flex flex-column justify-content-end w-100 position-relative mt-4">
        <img
          className="Border mb-4 ms-2"
          src="../src/assets/Orange.png"
        />
        <div className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex flex-column align-items-center m-0">
            <p className="text-center m-0 me-2">סה"כ 3 מסמכים</p>
            </div>
            <h1 className="Separator">|</h1>
            <h1 className="my-docs m-0 ms-2 fw-medium">המסמכים שלי</h1>
        </div>
        <p className="MB d-flex justify-content-end me-3">
          2MB אפשר להעלות עד 10 קבצים בגודל של עד
        </p>
      </div>
    </div>
  );
}

export default MyDocs;
