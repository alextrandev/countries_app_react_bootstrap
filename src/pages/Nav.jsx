import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { auth, logout } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Image, Row } from 'react-bootstrap';

export default function _Nav() {
  const [user] = useAuthState(auth);

  return (
    <Row className='shadow sticky-top'>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="justify-content-start">
          <Navbar.Brand href="#home" className='d-flex align-items-center'>
            <Image
              variant="top"
              src="/images/logo.png"
              alt="Alex logo"
              className='ms-1'
              style={{ height: "25px" }}
            />
            <span>Countries App</span>
          </Navbar.Brand>
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
        <Container className="justify-content-end text-white">
          Welcome, {user ? user.email : "guest"}!
        </Container>
      </Navbar>
    </Row>
  )
}
