import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from './Nav';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Layout = () => {
  return (
    <Container fluid>
      <Nav />
      <Row>
        <Outlet />
      </Row>
      <Footer />
    </Container>
  );
};

export default Layout;