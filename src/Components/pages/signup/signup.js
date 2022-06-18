import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../../Utils/Card/Card";
import styles from "./_signup.module.scss";
import { AuthActions } from "../../../store/auth-slice";

const Signup = () => {
  const inputName = useRef();
  const inputPassword = useRef();
  const inputEmail = useRef();
  const confirmPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(AuthActions.loading(true));
    const inputUserName = inputName.current.value;
    const inputUserEmail = inputEmail.current.value;
    const inputUserPassword = inputPassword.current.value;
    const inputUserConfirmPassword = confirmPassword.current.value;

    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: JSON.stringify({
        name: inputUserName,
        email: inputUserEmail,
        password: inputUserPassword,
        confirmPassword: inputUserConfirmPassword,
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
    console.log(resData);
    history.push("./login");
  };
  return (
    <Card className={styles.card_login}>
      <div className={styles.heading}>
        <h1>SignUp Form</h1>
      </div>
      <form className={styles.login_form} action="/signup">
        <div className={styles.form_control}>
          <label htmlFor="Name">Name</label>
          <input
            ref={inputName}
            type="text"
            name="Name"
            id="Name"
            placeholder="Username"
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="email">E-mail</label>
          <input
            ref={inputEmail}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="password">Password</label>
          <input
            ref={inputPassword}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className={styles.form_control}>
          <label htmlFor="confirm">Confirm password</label>
          <input
            ref={confirmPassword}
            type="password"
            name="confirm password"
            id="confirm"
            placeholder="confirm password"
          />
        </div>
        {!auth.authLoading && (
          <button onClick={submitHandler} className={styles.btn} type="submit">
            Signup
          </button>
        )}
        {auth.authLoading && <button className={styles.btn}>Loading...</button>}
      </form>
    </Card>
  );
};

export default Signup;
