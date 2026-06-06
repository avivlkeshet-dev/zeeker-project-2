import './header.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
    return (
        <div className='header text-white d-flex justify-content-between'>
             {/* <Container fluid className='p-0'>
      <Row>
        <Col><img src="../src/assets/X.png" /></Col>
        <Col>ZEEKR X</Col>
        <Col><img src="../src/assets/Back.png" /></Col>
      </Row>
      </Container> */}
      <div className='cross m-3'>
        <img src="../src/assets/X.png" />
      </div>
      <div>
        <h2 className='m-4 carName'>ZEEKR X</h2>
      </div>
      <div className='back m-3'>
        <img src="../src/assets/Back.png" />
      </div>
        </div>
    )
}
export default Header;