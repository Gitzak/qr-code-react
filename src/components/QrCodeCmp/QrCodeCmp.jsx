import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";

export const QrCodeCmp = () => {
  const [inputValue, setInputValue] = useState("");
  const qrRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center align-items-center">
        <Col>
          <h1>Online QR Code Generator</h1>
        </Col>
        <Col className="text-end me-2">
          <Button variant="dark" onClick={downloadQRCode}>
            <FontAwesomeIcon className="me-2" icon={faDownload} />
            Download
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputGroup className="my-3">
              <Form.Control
                placeholder="https://your-domain.com/ or Link..."
                id="basic-url"
                aria-describedby="input-data"
                value={inputValue}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col className="d-flex justify-content-center m-3 mt-5">
          <div
            ref={qrRef}
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 300,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              level="Q"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={inputValue}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
