import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import BackDrop from "./Components/Modal/BackDrop";
import Header from "./Components/Utils/header/Header";
import MobileNav from "./Components/Utils/Mobile/MobileNav";

function App() {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      <Header></Header>
      <MobileNav></MobileNav>
    </Fragment>
  );
}

export default App;
