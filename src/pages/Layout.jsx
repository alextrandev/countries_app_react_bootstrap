import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid>
      <Row>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login" disabled={user}>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" disabled={user}>
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                {user &&
                  <LinkContainer to="/login">
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                  </LinkContainer>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
          <Container className="justify-content-end">
            Welcome, {user ? user.email : "guest"}!
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
      <Row>
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
    </Container>
  );
};

export default Layout;