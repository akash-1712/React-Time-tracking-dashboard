import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import BackDrop from "./Components/Modal/BackDrop";
import Login from "./Components/pages/Login/Login";
import Signup from "./Components/pages/signup/signup";
import Header from "./Components/Utils/header/Header";
import MobileNav from "./Components/Utils/Mobile/MobileNav";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "./store/auth-slice";
import Main from "./Components/content/Main";
import { FetchActivityData } from "./store/activity-action";
import UserDetails from "./Components/pages/UserDetails/UserDetails";

const calcRemTime = (expTime) => {
  const currTime = new Date().getTime();
  const expirationTime = new Date(+expTime).getTime();
  // console.log(expTime, currTime, expirationTime);
  return expirationTime - currTime;
};

const getStoredToken = () => {
  const storedToken = localStorage.getItem("token") || null;
  const storedExpirationTime = localStorage.getItem("expirationTime") || 0;
  const remainingTime = calcRemTime(storedExpirationTime);
  // console.log(remainingTime, storedExpirationTime);
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return { token: null };
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth);
  useEffect(() => {
    dispatch(FetchActivityData());
    const tokenData = getStoredToken();
    if (tokenData.token) {
      dispatch(
        AuthActions.login({
          token: tokenData.token,
          time: tokenData.duration,
          timer: setTimeout(() => {
            console.log("timeOut");
            dispatch(AuthActions.logout());
          }, tokenData.duration),
        })
      );
    }
  }, [dispatch]);

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop></BackDrop>,
        document.getElementById("modal")
      )}
      <Header></Header>
      <MobileNav></MobileNav>
      <Switch>
        <Route path="/" exact>
          {/* <Main></Main> */}
          <UserDetails></UserDetails>
        </Route>
        {!auth.isLoggedIn && (
          <Route path="/login">
            <Login></Login>
          </Route>
        )}
        {!auth.isLoggedIn && (
          <Route path="/signup">
            <Signup></Signup>
          </Route>
        )}
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
