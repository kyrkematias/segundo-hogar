import React, {useEffect} from "react";
import { ProfileContainer } from "components/Profile";

export function ProfileView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Mi Cuenta";
  }, []);
  return <ProfileContainer />;
}
