import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode"; // Correct import as default import
import { googleRegisterAction } from "../../redux/features/registerSlice";

// Google OAuth client ID
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();

  // Handler for successful login
  const onSuccess = (response) => {
    const tokenId = response.credential;
    const decodedToken = jwtDecode(tokenId);
    const email = decodedToken.email;

    console.log("Google login successful:", response);

    // Dispatch the action to register the user
    dispatch(googleRegisterAction({ token: tokenId, email }));
  };

  // Handler for failed login
  const onFailure = (response) => {
    console.error("Google login failed:", response);
    if (response.error) {
      switch (response.error) {
        case "popup_closed_by_user":
          console.error(
            "The user closed the popup before completing the sign in."
          );
          break;
        case "access_denied":
          console.error("The user denied access to the requested scope(s).");
          break;
        case "idpiframe_initialization_failed":
          console.error(
            "Could not initialize the Google Sign-In iframe. This might be a configuration issue."
          );
          break;
        default:
          console.error("An unknown error occurred:", response.error);
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} useOneTap />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
