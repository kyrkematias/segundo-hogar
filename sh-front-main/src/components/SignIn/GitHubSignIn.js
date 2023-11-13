import React from "react";
import { AuthProvider, useAuth } from "./AuthContextGoogle"; 
import { GithubLoginButton } from "react-social-login-buttons";
import { useMutation, useApolloClient } from "@apollo/client";
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
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { GET_STUDENT_USER_BY_ID } from "client/gql/queries/users";

const GithubSignIn = () => {
  const provider = new GithubAuthProvider();
  const [_, setLocation] = useLocation();
  const [registerStudentUser] = useMutation(REGISTER_STUDENT_USER_WITH_SOC_NET);
  const [initialRegisterStudentUser] = useMutation(
    INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET
  );

  const dispatch = useDispatch();

  const { isAuthenticated, user_category } = useSelector(authSelector);
  const client = useApolloClient();

  const handleLoginWithGitHub = async () => {
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
          file_number: 10,
          user_categories_id: 2,
        };
  
        console.log("Datos del usuario:", userData);
  
        localStorage.setItem("userData", JSON.stringify(userData));
        // Verificar si el correo electrónico ya está registrado
        const isEmailRegistered = await checkIfEmailRegistered(user.email);
  
        try {
          if (isEmailRegistered) {
            // Si el correo está registrado, inicia sesión
            // Realiza la lógica necesaria para iniciar sesión aquí
            // Puedes llamar a la acción de Redux para actualizar el estado de autenticación
            dispatch(signInSocialNetAction(user.email));
            // Redirige según el estado de autenticación y la categoría del usuario
            setLocation(paths.search);
          } else {
            // Si el correo no está registrado, realiza el registro
            const registerResult = await initialRegisterStudentUser({
              variables: userData,
            });
  
            // Llama a tu acción de Redux para actualizar el estado de autenticación
            dispatch(signInSocialNetAction(user.email));
  
            // Redirige según el estado de autenticación y la categoría del usuario
            setLocation(paths.completeprofile);
          }
        } catch (error) {
          // Maneja el error de violación de unicidad aquí
          console.error("Error al registrar o iniciar sesión con el usuario:", error);
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const checkIfEmailRegistered = async (email) => {
    try {
      const { data } = await client.query({
        query: GET_STUDENT_USER_BY_ID,
        variables: {
          id: email, // Puedes cambiar esto dependiendo de cómo esté estructurada tu consulta
        },
      });

      return data?.sh_users.length > 0; // Devuelve true si el correo está registrado, false si no lo está
    } catch (error) {
      console.error("Error al verificar el correo electrónico:", error);
      return false; // En caso de error, asumimos que el correo no está registrado
    }
  };

  return (
    <AuthProvider>
      <GithubLoginButton onClick={handleLoginWithGitHub} />
    </AuthProvider>
  );
};

export default GithubSignIn;
