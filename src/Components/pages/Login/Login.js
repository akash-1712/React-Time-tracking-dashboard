import React, { useRef } from "react";
import Card from "../../Utils/Card/Card";
import styles from "./_login.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthActions } from "../../../store/auth-slice";

const calcRemTime = (expTime) => {
  const currTime = new Date().getTime();
  const expirationTime = new Date(expTime).getTime();
  return expirationTime - currTime;
};

const Login = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(AuthActions.loading(true));
    const inputUserEmail = inputEmail.current.value;
    const inputUserPassword = inputPassword.current.value;
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({
        email: inputUserEmail,
        password: inputUserPassword,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    dispatch(AuthActions.loading(false));

    if (!response.ok) {
      const resData = await response.json();
      console.log(resData);
      return;
    }
    const resData = await response.json();
    const expirationTime = new Date().getTime() + +10 * 1000;
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calcRemTime(expirationTime);
    dispatch(
      AuthActions.login({
        token: resData.token,
        time: expirationTime,
        timer: setTimeout(() => {
          console.log("timeOut");
          dispatch(AuthActions.logout());
        }, remainingTime),
      })
    );
    console.log(resData);
    history.push("/");
  };

  return (
    <Card className={styles.card_login}>
      <div className={styles.heading}>
        <h1>Login Form</h1>
      </div>
      <form className={styles.login_form}>
        <div className={styles.form_control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            ref={inputEmail}
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            ref={inputPassword}
          />
        </div>
        {!auth.authLoading && (
          <button onClick={submitHandler} className={styles.btn} type="submit">
            Login
          </button>
        )}
        {auth.authLoading && <button className={styles.btn}>Loading...</button>}
      </form>
    </Card>
  );
};

export default Login;
