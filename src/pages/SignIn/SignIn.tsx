import { useState } from "react";
import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const SignIn = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  auth.useDeviceLanguage();

  const signin = async () => {
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if ("code" in error && "message" in error) {
        const authError = error as AuthError;
        alert(`${authError.message} (${authError.code})`);
        return;
      }

      alert("An unexpected error occurred!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={signin} disabled={loading}>
        login with google
      </button>
    </div>
  );
};
