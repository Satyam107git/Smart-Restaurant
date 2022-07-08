import React from "react";

import { Row,Col, Container } from "react-bootstrap";
function Footer() {
  return (
    // <div>
    //   <footer>Footer</footer>
    // </div>
    //   div ki zrorat ni since footer tag hai
      <footer>
          <Container>
              <Row>
                  <Col className="text-center">
                    Copyright &copy;SMR
                  </Col>
                  
              </Row>
          </Container>
    </footer>
  );
}

export default Footer;
