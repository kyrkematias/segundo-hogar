import React, { useEffect } from "react";
import { HouseRegister } from "components/HouseRegister";

export function HouseRegisterView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Registra tu inmueble";
  }, []);
  return <HouseRegister />;
}
