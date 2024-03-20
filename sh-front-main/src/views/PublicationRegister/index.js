import React, { useEffect } from "react";
import { PublicationRegister } from "components/Owneship";

export function PublicationRegisterView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Publica tu inmueble";
  }, []);
  return <PublicationRegister />;
}
