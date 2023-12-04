import { useState, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MarkerCard } from "./MarkerCard";

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

export const MapSearch = ({ markers, height, width }) => {
  const center = useMemo(
    () => ({ lat: -26.830529214328564, lng: -65.20384130911128 }),
    []
  );

  // if height and width are not passed, set default values
  height = height || "400px";
  width = width || "100%";

  console.log("markers info: ", markers);

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const initialPosition = useMemo(() => {
    return markers && markers.length > 0 ? markers[0].position : center;
  }, [markers, center]);

  return (
    <APIProvider apiKey="AIzaSyBYEDIX4cSpqRyO21insyza9dkUFgp9PAE">
      <div style={{ height: height, width: width }}>
        <Map
          zoom={14}
          center={initialPosition}
          mapId={"50cc0d0fbf707831"}
          mapContainerStyle={{ height: "500px", width: "100%" }}
        >
          {markers &&
            markers.map((marker, index) => (
              <AdvancedMarker
                key={index}
                position={marker.position}
                onClick={() => {
                  setSelected(marker.position);
                  setOpen(true);
                }}
              >
                <Pin />
                {open && selected === marker.position && (
                  <InfoWindow
                    position={marker.position}
                    onCloseClick={() => {
                      setOpen(false);
                    }}
                  >
                    <MarkerCard marker={marker} />
                  </InfoWindow>
                )}
              </AdvancedMarker>
            ))}
        </Map>
      </div>
    </APIProvider>
  );
};
