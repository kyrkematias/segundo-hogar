import { useState, useMemo, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MarkerCard } from "./MarkerCard";
import { FaUniversity } from "react-icons/fa";


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

  console.log("Coordinates:", coordinates);
  return coordinates;
}

export const MapSearch = ({ markers, height, width }) => {
  const center = useMemo(
    () => ({ lat: -26.81715341828356, lng: -65.19856536761296 }),
    []
  );

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
          zoom={16}
          center={center}
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
          <AdvancedMarker position={center} key="central-marker">
            <FaUniversity fontSize={"15px"}/> 
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};
