import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth, provider } from "../../firebase";
import "./Login.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(() => {
      setLoading(true);
      history.push("/home");
    });
  };

  console.log(loading);
  return (
    <div className="loginPage">
      <div className="loginContainer">
        <Button
          onClick={signInWithGoogle}
          variant="outline-primary"
          className="loginBtn"
          type="submit"
        >
          <img
            style={{ width: "15px", marginBottom: "3px", marginRight: "5px" }}
            alt="Google login"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}
