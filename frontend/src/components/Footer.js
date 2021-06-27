import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <a className='px-3' href='https://wa.me/message/DLSM3VGHL6JQI1'>
              <i className='fab fa-whatsapp fa-2x'></i>
            </a>
            <a href='https://instagram.com/romadocesdevitrine?igshid=1alzkku4j1898'>
              <i className='fab fa-instagram fa-2x'></i>
            </a>
          </Col>
          <Col className='text-center py-3'>
            &copy; 2021 Roma Doces de Vitrine
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
