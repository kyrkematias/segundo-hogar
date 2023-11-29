import { useState, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

// Agrega la función getCoordinates aquí
function getCoordinates(ownership) {
  if (
    ownership === undefined ||
    ownership.coordinate === undefined ||
    ownership.coordinate?.lat === undefined ||
    ownership.coordinate?.lon === undefined
  ) {
    return null;
  }

  const coordinates = {
    lat: +ownership.coordinate?.lat,
    lng: +ownership.coordinate?.lon,
  };

  console.log("Coordinates:", coordinates); // Agrega esta línea para imprimir en la consola
  return coordinates;
}

export const MapSearch = ({ coordinates }) => {
  const center = useMemo(
    () => ({ lat: -26.830529214328564, lng: -65.20384130911128 }),
    []
  );

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const initialPosition = useMemo(() => {
    return coordinates || center;
  }, [coordinates, center]);

  return (
    <APIProvider apiKey="AIzaSyBYEDIX4cSpqRyO21insyza9dkUFgp9PAE">
      <div style={{ height: "400px" }}>
        <Map
          zoom={14}
          center={initialPosition}
          mapId={"50cc0d0fbf707831"}
          mapContainerStyle={{ height: "500px", width: "100%" }}
        >
          {coordinates && (
            <AdvancedMarker
              position={coordinates}
              onClick={() => {
                setSelected(coordinates);
                setOpen(true);
              }}
            >
              <Pin />
              {open && selected === coordinates && (
                <InfoWindow
                  position={coordinates}
                  onCloseClick={() => {
                    setOpen(false);
                  }}
                >
                  Opened
                </InfoWindow>
              )}
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};
