import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import { REGISTER_OWNERSHIPS, INSERT_OWNERSHIPS_IMAGES } from "client/gql/mutations/registerOwnerships/registerOwnerships";
import { getVarOwnerships } from "client/gql/mutations/registerOwnerships/getVarOwnerships";
import Geocode from "react-geocode";
import { useGetOwnerId } from "hooks/utils/useGetOwnerId";
import { postImagesService } from "services/ownership/postImagesService";
import { authSelector } from "store/slices/authSlice";

Geocode.setApiKey(process.env.REACT_APP_API_KEY_GEOCODER);
Geocode.setLanguage("es");
Geocode.setLocationType("ROOFTOP");

export function useHouseRegisterForm() {
  const [initialCenter, setInitialCenter] = useState({
    lat: -26.83033687159553,
    lng: -65.20379811655849,
  });
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(13);

  const [images, setImages] = useState([]);
  const [errorsImage, setErrorsImage] = useState({ message: "" });

  const [loading, setLoading] = useState(false);

  const [_, setLocation] = useLocation();

  const { user } = useSelector(authSelector);

  /**************************************************************************************/

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**************************************************************************************/
  

  // const getCoordinates = () => {
  //   const storedLat = parseFloat(localStorage.getItem("lat"));
  //   const storedLng = parseFloat(localStorage.getItem("lng"));
  //   setCoordinates({ lat: storedLat, lng: storedLng });
  //   setInitialCenter({ lat: -26.83002230629563, lng: -65.20258569223947 });
  //   setZoom(16);
  // };

  /**************************************************************************************/

  const { owner_id } = useGetOwnerId();

  const [registerOwnership, { error }] = useMutation(REGISTER_OWNERSHIPS);
  const [insertOwnershipImages] = useMutation(INSERT_OWNERSHIPS_IMAGES);

  const onSubmit = (data) => {
    if (images.length === 0) {
      setErrorsImage({
        ...errorsImage,
        message: "Debes seleccionar al menos una foto.",
      });
      return;
    }

    setLoading(true);

    console.log("data: ",data);
    console.log("Coordinates",coordinates)
    let variables = getVarOwnerships(data);

    variables.owners_id = owner_id;

    registerOwnership({ variables }).then(async ({ data }) => {
      let idHouse = data?.insert_sh_ownerships?.returning?.at(0).id;

      if (idHouse === undefined || idHouse === null) return;

      const formData = new FormData();

      for (let index = 0; index < images.length; index++) {
        formData.append("images", images[index]);
      }

      formData.append("idHouse", idHouse);

      const response = await postImagesService({ formData });
      console.log("response: ",response);

      // insert images on api database for each image in response.data
      for (let index = 0; index < response?.data?.length; index++) {
        const image = response?.data[index];
        const variables = {
          public_id: image?.publib_id,
          image_url: image?.imageURL,
          ownerships_id: idHouse,
        };
        insertOwnershipImages({ variables });
      }
      

      if (response?.success === true) {
        setLocation(`/cuenta/${user.id}`);
      }

      setLoading(false);
    });
  };

  /**************************************************************************************/

  /* Images */

  const onFileChange = (e) => {
    const img = e.target.files[0];
    setImages([...images, img]);
    setErrorsImage({
      ...errorsImage,
      message: "",
    });
  };

  const removeImage = (index) => {
    let newImages = [];
    if (index !== -1) {
      images.forEach((image, i) => {
        if (i !== index) newImages.push(image);
      });
      setImages(newImages);
    }
  };

  /**************************************************************************************/

  return {
    setAddress,
    initialCenter,
    coordinates,
    zoom,
    // getCoordinates,
    register,
    handleSubmit,
    errors,
    images,
    errorsImage,
    onFileChange,
    onSubmit,
    loading,
    error,
    removeImage,
  };
}
