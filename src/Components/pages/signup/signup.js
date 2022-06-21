import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../../Utils/Card/Card";
import styles from "./_signup.module.scss";
import { AuthActions } from "../../../store/auth-slice";
import FilePicker from "../../Utils/filePicker/filePicker";
// import man from "../../../images/image-jeremy.png";

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
    const imageUrl = auth.imageUrl;
    const formData = new FormData();
    formData.append("name", inputUserName);
    formData.append("email", inputUserEmail);
    formData.append("password", inputUserPassword);
    formData.append("image", imageUrl);
    formData.append("confirmPassword", inputUserConfirmPassword);

    // JSON.stringify({
    //   name: inputUserName,
    //   email: inputUserEmail,
    //   password: inputUserPassword,
    //   confirmPassword: inputUserConfirmPassword,
    // })
    console.log(imageUrl);
    const response = await fetch("http://localhost:8080/signup", {
      method: "POST",
      body: formData,
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
      <div className={styles.profile_pic}>
        <FilePicker></FilePicker>
        <h1>Upload Your Profile picture</h1>
      </div>
      <div className={styles.for_signup}>
        <div className={styles.heading}>
          <h1>SignUp Form</h1>
        </div>
        <form
          className={styles.login_form}
          action="/signup"
          encType="multipart/form-data"
        >
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
            <button
              onClick={submitHandler}
              className={styles.btn}
              type="submit"
            >
              Signup
            </button>
          )}
          {auth.authLoading && (
            <button className={styles.btn}>Loading...</button>
          )}
        </form>
      </div>
    </Card>
  );
};

export default Signup;
