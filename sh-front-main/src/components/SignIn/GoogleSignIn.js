import React, { useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useMutation } from "@apollo/client";
import { AuthProvider } from "./AuthContext.jsx";
import { GoogleLoginButton } from "react-social-login-buttons";
import {
  REGISTER_STUDENT_USER_WITH_SOC_NET,
  INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET,
} from "client/gql/mutations/registerUser/registerStudentUserSocialNetwork.js";
import { useLocation } from "wouter";
import { paths } from "config/paths";
import { signInSocialNetAction } from "store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "store/slices/authSlice";
import { USER_CATEGORIES } from "const";


const GoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const [_, setLocation] = useLocation();
  const [registerStudentUser] = useMutation(REGISTER_STUDENT_USER_WITH_SOC_NET);
  const [initialRegisterStudentUser] = useMutation(
    INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET
  );

  const dispatch = useDispatch();
  const { isAuthenticated, user_category } = useSelector(authSelector);

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;

      // Dividir el nombre completo por el espacio
      const nameParts = user.displayName.split(" ");

      // Obtener el nombre y el apellido
      const firstName = nameParts[0];
      const lastName = nameParts[1];

      if (user) {
        // Aquí deberías extraer los datos necesarios de user para pasárselos a tus mutaciones
        const userData = {
          lastname: lastName || "",
          firstname: firstName || "",
          email: user.email || "",
          created_with_sn: true,
          user_status: true,
          file_number: 0,
        };

        console.log("Datos del usuario:", userData);

        // Ejecuta la mutación inicial para crear un registro en la base de datos
        const registerResult = await initialRegisterStudentUser({
          variables: userData,
        });

        // Llama a tu acción de Redux para actualizar el estado de autenticación
        dispatch(signInSocialNetAction(user.email));

        // Redirige según el estado de autenticación y la categoría del usuario
        if (isAuthenticated && user_category !== USER_CATEGORIES.DEFAULT) {
          setLocation(paths.account);
        } else if (isAuthenticated && user_category === USER_CATEGORIES.DEFAULT) {
          setLocation(paths.register);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
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
      <GoogleLoginButton onClick={handleLoginWithGoogle} />
    </AuthProvider>
  );
};

export default GoogleSignIn;
