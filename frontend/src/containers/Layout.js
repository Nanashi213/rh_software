import React from 'react';
import { Row } from 'react-bootstrap';
import Navbar from '../components/navigation/Navbar.js';
import Sidebar from '../components/navigation/Sidebar.js';
import Footer from '../components/navigation/Footer.js';

function Layout({ children }) {
  return (
    <>
      <Row>
        <Navbar />
      </Row>
      <Row>
        <Sidebar />
        {children}
      </Row>
      <Row>
        <Footer />
      </Row>
    </>
  );
}

export default Layout;
