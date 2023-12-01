import { useState, useRef, useEffect, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { from } from "@apollo/client";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { Loading } from "../Loading";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBYEDIX4cSpqRyO21insyza9dkUFgp9PAE",
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;
  return <NewMap />;
}

export const NewMap = () => {
  const center = useMemo(
    () => ({ lat: -26.830529214328564, lng: -65.20384130911128 }),
    []
  );
  const [selected, setSelected] = useState(center);

  return (
    <>
      <APIProvider apiKey="AIzaSyBYEDIX4cSpqRyO21insyza9dkUFgp9PAE">
        <div style={{ height: "500px", width: "500px", margin: "auto" }}>
          <div
            className="places-container"
            style={{ width: "500px", height: "40px" }}
          >
            <PlacesAutocomplete setSelected={setSelected}/>
          </div>
          <GoogleMap
            zoom={14}
            center={selected}
            mapId={"50cc0d0fbf707831"}
            mapContainerStyle={{ height: "500px", width: "500px" }}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </div>
      </APIProvider>
    </>
  );
};
