import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { GoogleLogin } from "react-google-login";
/** @jsxRuntime classNameic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import "../style.min.css";
import Remus from "remusjs";
import Login from "./login";
import { atom, useAtom } from "jotai";
import { loginAtom } from "./atoms";
import Logout from "./logout";
import { Redirect, useHistory } from "react-router-dom";
import { userAtom } from "./atoms";
import LinkedInPage from "./linkedin";
import OpenReplay from "@openreplay/tracker";

const clientId =
  "800562039516-79ipvvoeot7j7dtthl6rou8icfb4e2lb.apps.googleusercontent.com";

function Home() {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const [loading, setLoading] = React.useState();

  const [user, setUser] = useAtom(userAtom);

  const history = useHistory();

  // if (!loggedIn) {
  //   history.push("/login");
  // }

  React.useEffect(() => {
    let remus = new Remus({
      element: ".remus", // selector for main Remus container
      height: null, // height value in pixels if you want it to be fixed - optional
    });
  }, [loggedIn]);

  React.useEffect(() => {
    if (user) {
      const tracker = new OpenReplay({
        projectKey: "h2i72okKhEoMPnWzG4Eb",
        onStart: () => {
          tracker.setUserID(user.email);
          // tracker.setMetadata("Name", `${user.name}`);
        }, // optional
      });
      // use componentDidMount in case of React Class Component
      tracker.start();
    }
  }, [user]);

  const onSuccess = (res) => {
    setLoggedIn(true);
    setUser(res.profileObj);
    // history.push("/");
    // console.log("res", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div
      className="application"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: "3%", left: "5%" }}>
        <img
          src="logo.png"
          alt="GalaxEye"
          style={{ width: "150px", height: "70px" }}
        />
      </div>
      {loggedIn ? (
        <Logout />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "black",
            zIndex: 99,
            overflow: "hidden",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "24",
                fontWeight: "bold",
                textTransform: "uppercase",
                fontFamily: "Helvetica",
              }}
            >
              Sign In to access the Slider
            </h1>
          </div>
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
          <div>
            <LinkedInPage />
          </div>
        </div>
      )}
      <div
        className="hero is-fullheight"
        style={{
          width: "100vw",
          height: "100vh",
          display: " flex",
          justifyContent: "center",
          backgroundColor: "black",
          overflow: "hidden",
        }}
      >
        <div className="remus">
          <div className="remus-element">
            <img
              src="img/Slider_RGB.jpg"
              alt="Remus"
              style={{ height: "50vh" }}
            />
            <div className="label-under-image optic">
              <span>Optical</span>
            </div>
          </div>
          <div className="remus-element">
            <img
              src="img/Slider_Coreg.jpg"
              alt="Remus"
              style={{ height: "50vh" }}
            />
            <div className="label-under-image fused">
              <span>Coreg</span>
            </div>
          </div>
          <div className="remus-element">
            <img
              src="img/Slider_SAR.jpg"
              alt="Remus"
              style={{ height: "50vh" }}
            />
            <div className="label-under-image sar">
              <span>Sar</span>
            </div>
          </div>
        </div>
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
            textTransform: "uppercase",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Courier, New Courier, monospace",
          }}
        >
          <h1>Slide to see the change</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
