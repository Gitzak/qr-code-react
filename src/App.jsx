import React from "react";
import Navigation from "./components/Navigation/Navigation";
import { Footer } from "./components/Footer/Footer";
import { QrCodeCmp } from "./components/QrCodeCmp/QrCodeCmp";

function App() {
  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Navigation />
        <QrCodeCmp />
        <Footer />
      </div>
    </>
  );
}

export default App;
