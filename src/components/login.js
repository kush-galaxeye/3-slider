import React from "react";
import { GoogleLogin } from "react-google-login";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import { atom, useAtom } from "jotai";
import { loginAtom } from "./atoms";
import { userAtom } from "./atoms";

const clientId =
  "800562039516-79ipvvoeot7j7dtthl6rou8icfb4e2lb.apps.googleusercontent.com";

function Login() {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);

  const history = useHistory();

  //   if (loggedIn) {
  //     history.push("/");
  //   }

  const onSuccess = (res) => {
    setLoggedIn(true);
    setUser(res.profileObj);
    // console.log("res", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}
export default Login;
