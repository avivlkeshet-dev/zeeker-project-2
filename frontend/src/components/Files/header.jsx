import './header.css';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
  const navigate = useNavigate();

    return (
        <div className='header text-white d-flex justify-content-between'>
             {/* <Container fluid className='p-0'>
      <Row>
        <Col><img src="../src/assets/X.png" /></Col>
        <Col>ZEEKR X</Col>
        <Col><img src="../src/assets/Back.png" /></Col>
      </Row>
      </Container> */}
      <div className='back m-3' onClick={() => navigate('/dashboard')} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && navigate('/dashboard')}>
        <img src="../src/assets/Back.png" alt="Back to dashboard" />
      </div>
      <div>
        <h2 className='m-4 carName'>ZEEKR X</h2>
      </div>
       <div className='cross m-3'>
        <img src="../src/assets/X.png" alt="Close" />
      </div>
        </div>
    )
}
export default Header;