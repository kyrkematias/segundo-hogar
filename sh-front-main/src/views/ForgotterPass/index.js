import React, { useEffect } from "react";

export function ForgotterPassView() {
  useEffect(() => {
    document.title = "Segundo Hogar - Forgotter Pass";
  }, []);
  return <div>Forgotter Pass</div>;
}
