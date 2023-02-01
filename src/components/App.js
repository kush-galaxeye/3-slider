import React, { Fragment, Component } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ErrorPage from "./error";
import Home from "./home";
import Login from "./login";
import { loginAtom } from "./atoms";
import { userAtom } from "./atoms";
import { atom, useAtom } from "jotai";
import PrivacyPolicy from "./privacypolicy";

import { isMobile } from "react-device-detect";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
function ErrorFallback({ error }) {
  const history = useHistory();

  return (
    <div
      role="alert"
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: "0",
        overflowX: "hidden",
      }}
    >
      <div css={{ marginBottom: "1rem" }}>
        <p css={{ textAlign: "center", fontSize: "2rem" }}>
          Something went wrong:
        </p>
        <pre>{error.message}</pre>
      </div>
      <div>
        <button
          colorScheme="red"
          variant="outline"
          onClick={() => history.replace("/")}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const App = () => {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {isMobile ? (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "0",
            fontSize: "2rem",
          }}
        >
          This Content is not available on mobile. Please try accessing it from
          your desktop/laptop browser.
        </div>
      ) : (
        <div>
          <BrowserRouter>
            <div css={{ height: "100vh", width: "100vw" }}>
              <Switch>
                {/* <Route exact path="/">
                  {!loggedIn ? <Redirect to="/login" /> : <Home />}
                </Route> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/linkedin" component={LinkedInCallback} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="*" component={ErrorPage} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
