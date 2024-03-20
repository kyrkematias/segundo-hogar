import React, { useEffect} from "react";
import { FindRoommate } from "components/FindRoommate";

export function FindRoommateView() {
    useEffect(() => {
        document.title = "Segundo Hogar - Buscar compañero de cuarto";
      }, []);
    return <FindRoommate />
}
