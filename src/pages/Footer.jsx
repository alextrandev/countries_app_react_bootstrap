import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import 'react-toastify/dist/ReactToastify.css';

export default function Footer() {
  return (
    <Row className='sticky-bottom'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="justify-content-between align-content-center">
          <p className='text-white p-2 m-0'>
            <span>By </span>
            <a
              className='text-white'
              href="https//alextran.dev"
            >Alex Tran</a>
          </p>
          <p className='text-white p-2 m-0'>
            <a
              className='text-white'
              href="https//alextran.dev"
            >View source code
              <i class="bi bi-github ms-2"></i>
            </a>
          </p>
        </Container>
      </Navbar>
    </Row>
  )
}
