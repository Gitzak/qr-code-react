import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faQrcode } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  return <Navbar className="app-nav">
    <Container className="d-flex justify-content-between">
      <Navbar.Brand href="/" className="brand d-flex align-items-center gap-2">
        <span className="brand-icon"><FontAwesomeIcon icon={faQrcode} /></span>
        qr<span className="brand-light">craft</span><span className="brand-dot">.</span>
      </Navbar.Brand>
      <a className="repo-link" href="https://github.com/Gitzak/qr-code-react" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} /> <span>View on GitHub</span>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="external-icon" />
      </a>
    </Container>
  </Navbar>;
}
