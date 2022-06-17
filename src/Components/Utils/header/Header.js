import React from "react";
import styles from "./_header.module.scss";
import timeLogo from "../../../images/chalkboard-solid.svg";
import Nav from "./Nav";
import menu from "../../../images/bars-solid.svg";
import { backDropActions } from "../../../store/backdrop-slice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={timeLogo} alt="react-timeLogo" />
      </div>

      <div
        onClick={() => {
          dispatch(backDropActions.mobileNavHandler(true));
        }}
        className={styles.logo_menu}
      >
        <img src={menu} alt="menu" />
      </div>

      <Nav className={styles.hidden}></Nav>
    </header>
  );
};

export default Header;
