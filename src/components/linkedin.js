import React, { useState } from "react";

import { useLinkedIn } from "react-linkedin-login-oauth2";
import { atom, useAtom } from "jotai";
import { loginAtom } from "./atoms";
import { userAtom } from "./atoms";
// You can use provided image shipped by this package or using your own

function LinkedInPage() {
  const [loggedIn, setLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userAtom);

  const { linkedInLogin } = useLinkedIn({
    clientId: "78piah9ll9axgs",
    redirectUri: `https://galaxeye-slider.vercel.app/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      // console.log(code);

      (async function () {
        try {
          const accessToken = await fetch(
            `https://secret-sierra-81136.herokuapp.com/https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=https://galaxeye-slider.vercel.app/linkedin&client_id=78piah9ll9axgs&client_secret=p6Td19LXrFoyffJq&scope=r_liteprofile+r_emailaddress`
          );
          const json = await accessToken.json();
          // console.log(json, "json");
          const emailreq = await fetch(
            `https://secret-sierra-81136.herokuapp.com/https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${json.access_token}`
          );
          const emailres = await emailreq.json();

          const trueemail = emailres.elements[0];
          const fetchedemail = trueemail["handle~"];
          const email = {
            email: fetchedemail.emailAddress,
          };
          setLoggedIn(true);
          setUser(email);
        } catch (err) {
          console.log(err);
        }
      })();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <img
      onClick={linkedInLogin}
      src="sign-in-link.png"
      alt="Sign in with Linked In"
      style={{ maxWidth: "180px", cursor: "pointer" }}
    />
  );
}

export default LinkedInPage;
