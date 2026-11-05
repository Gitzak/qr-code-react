import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck, faDownload, faLink, faLock, faQrcode, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import QRCode from "react-qr-code";

const EXAMPLE = "https://github.com/Gitzak";
const MAX_BYTES = 1000;

export const QrCodeCmp = () => {
  const [value, setValue] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const qrRef = useRef(null);
  const text = value.trim();
  const tooLong = new TextEncoder().encode(text).length > MAX_BYTES;
  const ready = Boolean(text) && !tooLong;

  const downloadQRCode = async () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!ready || !svg || downloading) return;
    setDownloading(true);
    setError("");
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml;charset=utf-8" }));
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      // Integer module scaling and a four-module quiet zone keep exports scan-friendly.
      const modules = Number(svg.getAttribute("viewBox").split(/\s+/)[2]);
      const scale = Math.max(1, Math.floor(1024 / (modules + 8)));
      const padding = 4 * scale;
      const size = (modules + 8) * scale;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unavailable");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, padding, padding, modules * scale, modules * scale);
      const link = document.createElement("a");
      link.download = "qrcraft-code.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      setError("Your download could not be created. Please try again.");
    } finally {
      URL.revokeObjectURL(url);
      setDownloading(false);
    }
  };

  return <main className="workspace d-flex align-items-center">
    <Container>
      <div className="intro">
        <span className="eyebrow"><span className="status-dot" /> SMALL CODE. ENDLESS POSSIBILITIES.</span>
        <h1>A little square.<br />A world of <span>connections.</span></h1>
        <p>Turn any link or text into a QR code. Make it, scan it, share it.</p>
      </div>
      <section className="generator-card" aria-label="QR code generator">
        <Row className="g-0">
          <Col lg={7} className="editor-panel">
            <div className="step-label"><span>01</span> YOUR CONTENT</div>
            <h2>Where will your code lead?</h2>
            <p className="panel-description">Add a website, a message, or anything worth sharing.</p>
            <Form onSubmit={(event) => event.preventDefault()}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label htmlFor="qr-content" className="mb-0">Link or text</Form.Label>
                <Button variant="link" className="reset-button" disabled={!value} onClick={() => { setValue(""); setError(""); }}>
                  <FontAwesomeIcon icon={faRotateLeft} /> Reset
                </Button>
              </div>
              <div className="content-input">
                <FontAwesomeIcon icon={faLink} aria-hidden="true" />
                <Form.Control as="textarea" rows={3} id="qr-content" placeholder="https://your-website.com" value={value}
                  aria-describedby="content-help" aria-invalid={tooLong}
                  onChange={(event) => { setValue(event.target.value); setError(""); }} />
              </div>
              <div id="content-help" className={tooLong ? "input-help text-danger" : "input-help"}>
                {tooLong ? "Please shorten your content to 1,000 UTF-8 bytes or fewer." : "Your QR code updates as you type."}
              </div>
            </Form>
            <button className="example-button" onClick={() => { setValue(EXAMPLE); setError(""); }}>
              Just exploring? <strong>Try an example <FontAwesomeIcon icon={faArrowRight} /></strong>
            </button>
            <div className="privacy-note"><span className="privacy-icon"><FontAwesomeIcon icon={faLock} /></span>
              <div><strong>Yours, and only yours.</strong><p>Your content stays in your browser. No account needed.</p></div>
            </div>
          </Col>
          <Col lg={5} className="preview-panel">
            <div className="preview-heading"><span className="step-label"><span>02</span> LIVE PREVIEW</span>
              <span className="live-badge"><span className="status-dot" /> {ready ? "Ready" : "Preview"}</span>
            </div>
            <div className={"qr-frame" + (ready ? "" : " is-placeholder")} ref={qrRef}>
              <QRCode value={ready ? text : EXAMPLE} size={256} level="Q" fgColor="#152521" bgColor="#ffffff"
                style={{ width: "100%", height: "auto" }} title={ready ? "Your generated QR code" : "Example QR code"} />
              {!ready && <span className="preview-caption"><FontAwesomeIcon icon={faQrcode} /> {tooLong ? "Shorten your content" : "Your code goes here"}</span>}
            </div>
            <p className="scan-hint">{ready ? <><FontAwesomeIcon icon={faCheck} /> Ready for a camera, and your next connection.</> : "Add your content to bring your code to life."}</p>
            <Button className="download-button w-100" disabled={!ready || downloading} onClick={downloadQRCode}>
              <FontAwesomeIcon icon={faDownload} /> {downloading ? "Preparing PNG…" : "Download QR code"} <FontAwesomeIcon icon={faArrowRight} />
            </Button>
            <span className="export-note">PNG format <span>·</span> White background <span>·</span> Free to use</span>
            {error && <p className="download-error" role="alert">{error}</p>}
            <span className="visually-hidden" role="status" aria-live="polite">{ready ? "QR code ready to download." : "Enter content to generate your QR code."}</span>
          </Col>
        </Row>
      </section>
      <div className="under-card"><span><FontAwesomeIcon icon={faCheck} /> No sign-up</span><span><FontAwesomeIcon icon={faCheck} /> No expiry built into the code</span><span><FontAwesomeIcon icon={faCheck} /> Instantly yours</span></div>
    </Container>
  </main>;
};
