import React from "react";
import { AuthProvider, useAuth } from "./AuthContextGoogle"; 
import { GithubLoginButton } from "react-social-login-buttons";
import { useMutation } from "@apollo/client";
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

const GithubSignIn = () => {
  const provider = new GithubAuthProvider();
  const [_, setLocation] = useLocation();
  const [registerStudentUser] = useMutation(REGISTER_STUDENT_USER_WITH_SOC_NET);
  const [initialRegisterStudentUser] = useMutation(
    INITIAL_REGISTER_STUDENT_USER_WITH_SOC_NET
  );

  const dispatch = useDispatch();

  const { isAuthenticated, user_category } = useSelector(authSelector);

  const handleLoginWithGitHub = async () => {
    try {
      const result = await signInWithPopup(getAuth(), provider);
      const user = result.user;

      const nameParts = user.displayName.split(" ");
  
      // Obtener el nombre y el apellido
      const firstName = nameParts[0];
      const lastName = nameParts[1];

      if (user) {
        // Extrae los datos necesarios de user para pasárselos a tus mutaciones
        const userData = {
          lastname: lastName || "",
          firstname: firstName || "",
          email: user.email || "",
          created_with_sn: true,
          user_status: true,
          file_number: 0,
        };

        console.log("Datos del usuario:", userData);

        localStorage.setItem("userData", JSON.stringify(userData));

        const registerResult = await initialRegisterStudentUser({
          variables: userData,
        });

        dispatch(signInSocialNetAction(user.email)); 
        setLocation(paths.questions);
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
    }
  };

  return (
    <AuthProvider>
      <GithubLoginButton onClick={handleLoginWithGitHub} />
    </AuthProvider>
  );
};

export default GithubSignIn;
