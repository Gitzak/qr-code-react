import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBootstrap, faReact } from "@fortawesome/free-brands-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-around">
            <FontAwesomeIcon icon={faReact} size="3x" />
            <FontAwesomeIcon icon={faBootstrap} size="3x" />
            <FontAwesomeIcon icon={faQrcode} size="3x" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
