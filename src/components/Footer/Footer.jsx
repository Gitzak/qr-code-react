import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBootstrap, faReact } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => <footer className="app-footer">
  <Container className="d-flex flex-wrap justify-content-between align-items-center gap-2">
    <span>Made by <a href="https://github.com/Gitzak" target="_blank" rel="noreferrer">Zakaria Belrhali</a></span>
    <span className="stack-label"><FontAwesomeIcon icon={faReact} /> React <span className="footer-dot">·</span> <FontAwesomeIcon icon={faBootstrap} /> Bootstrap <span className="footer-dot">·</span> react-qr-code</span>
  </Container>
</footer>;
