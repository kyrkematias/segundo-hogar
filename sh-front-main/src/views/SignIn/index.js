import React, { useEffect } from "react";
import { SignIn } from "components/SignIn";

export function SignInView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Iniciar sesión";
  }, []);
  return (
    <div>
      <SignIn />
    </div>
  );
}
