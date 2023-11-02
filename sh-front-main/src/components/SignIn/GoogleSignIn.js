import React, { useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useMutation } from "@apollo/client";
import { AuthProvider } from "./AuthContext.jsx";
import { LoginSocialGoogle } from "reactjs-social-login";
import { GoogleLoginButton } from "react-social-login-buttons";
import {
  REGISTER_STUDENT_USER_WITH_SOC_NET,
  INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET,
} from "client/gql/mutations/registerUser/registerStudentUserSocialNetwork.js";
import { GET_STUDENT_USER_BY_ID } from "client/gql/queries/users.js";
import { useLocation } from "wouter";
import { paths } from "config/paths";

const GoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const [_, setLocation] = useLocation();
  const [registerStudentUser] = useMutation(REGISTER_STUDENT_USER_WITH_SOC_NET);
  const [initialRegisterStudentUser] = useMutation(
    INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET
  );

  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(getAuth(), provider);

      const user = getAuth().currentUser;

      if (user) {
        // Aquí deberías extraer los datos necesarios de user para pasárselos a tus mutaciones
        const userData = {
          lastname: user.lastname || "", // Usar user.lastname en lugar de user.lastName
          firstname: user.firstname || "", // Usar user.firstname en lugar de user.firstName
          email: user.email || "",
          created_with_sn: true,
          user_status: true,
        };

        console.log("Datos del usuario:", userData);
        //TODO: REVISAR LOS CAMPOS QUE SE ENVÍAN A GQL
        // Ejecuta la mutación inicial para crear un registro en la base de datos
        await initialRegisterStudentUser({ variables: userData });

        // Ejecuta la mutación para registrar al usuario
        await registerStudentUser({ variables: userData });
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
    setLocation(paths.questions);
  };

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDv0m8GINFjvOoKmwwY114Ts0Y8CJaRDpo",
      authDomain: "segundo-hogar.firebaseapp.com",
      projectId: "segundo-hogar",
    };

    if (!getApps().length) {
      initializeApp(firebaseConfig);
    }

    return () => {
      getAuth().signOut();
    };
  }, []);

  return (
    <AuthProvider>
      <LoginSocialGoogle>
        <GoogleLoginButton onClick={handleLoginWithGoogle} />
      </LoginSocialGoogle>
    </AuthProvider>
  );
};

export default GoogleSignIn;
