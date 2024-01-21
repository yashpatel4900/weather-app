import React from "react";
import { signInWithGoogle } from "../firebase/firebase.js"; // Adjust path as necessary

function SignIn() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
