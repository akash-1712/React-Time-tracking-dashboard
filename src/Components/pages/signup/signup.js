import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Card from "../../Utils/Card/Card";
import styles from "./_signup.module.scss";
import { AuthActions } from "../../../store/auth-slice";
import FilePicker from "../../Utils/filePicker/filePicker";
import { useState } from "react";
import { useEffect } from "react";

let url = "../../../images/user-g3d45e630c_1280.png";
const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
function dataURLtoFile(dataUrl, filename) {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const Signup = () => {
  const inputName = useRef();
  const inputPassword = useRef();
  const inputEmail = useRef();
  const confirmPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  const [image, setImage] = useState();

  const imageHandler = (selectedImage) => {
    setImage(selectedImage);
    console.log(image);
  };

  useEffect(() => {
    toDataURL(url).then((dataUrl) => {
      // console.log("Here is Base64 Url", dataUrl);
      var fileData = dataURLtoFile(dataUrl, "user-g3d45e630c_1280.png");
      // console.log("Here is JavaScript File Object", fileData);
      // fileArr.push(fileData);
      setImage(fileData);
    });
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(AuthActions.loading(true));
    const inputUserName = inputName.current.value;
    const inputUserEmail = inputEmail.current.value;
    const inputUserPassword = inputPassword.current.value;
    const inputUserConfirmPassword = confirmPassword.current.value;
    const imageUrl = image;
    console.log(imageUrl);
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
        <FilePicker onImage={imageHandler}></FilePicker>
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
