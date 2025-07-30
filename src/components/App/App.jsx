// SETUP

import React from "react";

// LAYOUT

import Header from "../layout/Header/Header";
import Main from "../Main/Main";
import Footer from "../layout/Footer/Footer";

// BODY

export default function App() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}
