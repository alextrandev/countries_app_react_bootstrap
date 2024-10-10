import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from './Nav';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Layout = () => {
  return (
    <Container fluid className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Nav />
      <Container fluid className="flex-grow-1">
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
};

export default Layout;
