import React, { useEffect } from "react";
import { PublicationDetail } from "components/PublicationDetail";

export function PublicationDetailView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Detalles del inmueble";
  }, []);
  return <PublicationDetail />;
}
