import React from "react";
import { GoogleLogout } from "react-google-login";
import { atom, useAtom } from "jotai";
import { loginAtom } from "./atoms";
import { userAtom } from "./atoms";

const clientId =
  "800562039516-79ipvvoeot7j7dtthl6rou8icfb4e2lb.apps.googleusercontent.com";
function Logout() {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);
  const onSuccess = () => {
    alert("Logout made successfully");
    setLoggedIn(false);
  };

  return (
    <div style={{ position: "absolute", top: "50px", right: "50px" }}>
      <GoogleLogout
        clientId={clientId}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}
export default Logout;
