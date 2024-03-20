import React, { useEffect } from "react";
import { SignUp } from "components/SignUp";

export function SignUpView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Crear mi cuenta";
  }, []);
  return <SignUp />;
}
