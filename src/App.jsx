import Navigation from "./components/Navigation/Navigation";
import { Footer } from "./components/Footer/Footer";
import { QrCodeCmp } from "./components/QrCodeCmp/QrCodeCmp";
import "./styles.css";

export default function App() {
  return <div className="app-shell d-flex flex-column">
    <Navigation />
    <QrCodeCmp />
    <Footer />
  </div>;
}
