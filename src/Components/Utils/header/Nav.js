import React, { Fragment } from "react";
import Button from "../button/Button";
import styles from "./_nav.module.scss";
import { AuthActions } from "../../../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";

const Nav = (props) => {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
  };
  const navClasses = `${styles.nav} ${props.className ? props.className : ""}`;
  return (
    <nav className={navClasses}>
      <ul className={styles.list}>
        {!Auth.isLoggedIn && (
          <Fragment>
            <li className={styles.items}>
              <Button
                onClick={() => {}}
                className={`${styles.button} ${styles.button_login}`}
              >
                Login
              </Button>
            </li>
            <li className={styles.items}>
              <Button
                onClick={() => {}}
                className={`${styles.button} ${styles.button_signUp}`}
              >
                SignUp
              </Button>
            </li>
          </Fragment>
        )}
        {Auth.isLoggedIn && (
          <li className={styles.items}>
            <Button
              onClick={logoutHandler}
              className={`${styles.button} ${styles.button_login}`}
            >
              Logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
