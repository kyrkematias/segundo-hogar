import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Flex,
  Heading,
  FormErrorMessage,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Select,
  Center,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useHouseRegisterForm } from "hooks/pages/HouseRegister/useHouseRegisterForm";
import {
  validateTypeHouse,
  validateBedrooms,
  validateBathrooms,
  validateSize,
} from "utils/validations/PublicationRegister";
import Places from "components/commons/MapContainer/NewMap";
import { useGetOwnershipsByOwnerId } from "hooks/utils/useGetOwnershipsByOwnerId";
import { GET_OWNERSHIPS_BY_ID } from "client/gql/queries/utils";
import { useApolloClient, useMutation } from "@apollo/client";
import { UPDATE_OWNERSHIP } from "client/gql/queries/update/updateOwnershipById";
import { UPDATE_ADDRESS_MUTATION } from "client/gql/queries/update/updateOwnershipById";

export function EditPublication({
  isOpen,
  onClose,
  publicationId,
  onUpdatePublication,
  address,
}) {
  const { ownerships } = useGetOwnershipsByOwnerId();
  const SOURCE = "register-ownership";

  const [updateOwnership] = useMutation(UPDATE_OWNERSHIP);
  const [updateAddress] = useMutation(UPDATE_ADDRESS_MUTATION);

  const client = useApolloClient();

  const {
    setAddress,
    initialCenter,
    coordinates,
    zoom,
    getCoordinates,
    register,
    handleSubmit,
    errors,
    images,
    errorsImage,
    onFileChange,
    loading,
    error,
    removeImage,
  } = useHouseRegisterForm();

  const onSubmit = async (data) => {
    // onUpdatePublication(data, publicationId);
    console.log("Datos formulario", data);
    const storedLat = localStorage.getItem("lat");
    const storedLng = localStorage.getItem("lng");
    const storedAddress = localStorage.getItem("address");
    const ownershipId = localStorage.getItem("ownershipToEdit");
    console.log("OWNER ship ip a editar:", ownershipId);
    const ownership = await client.query({
      query: GET_OWNERSHIPS_BY_ID,
      variables: { id: ownershipId },
      fetchPolicy: "no-cache",
    });

    const coordinatesId = ownership.coordinate ? ownership.coordinate.id : null;
    console.log("coordinates id: ", coordinatesId);
    console.log("propiedad a editar", ownership);
    if (ownership) {
      const results = {
        id: ownershipId,
        object: {
          shared: true,
          rooms: data.bedrooms,
          bathrooms: data.bathrooms,
          size: data.size,
          rating: 0,
          ownerships_state: true,
          ownerships_types_id: data.typeHouse,
          owners_id: -1,
        },
      };
      const addressResults = {
        id: ownershipId,
        object: {
          address: storedAddress,
          apartment: data.apartment,
          floor: data.floor,
        },
      };
      console.log("datos del formulario", results);
      console.log("datos de address ", addressResults)
      const registerResult = await updateOwnership({
        variables: results,
      });
      const registerAddress = await updateAddress({
        variables: addressResults,
      });
    }

    // llamadas a las mutaciones por tabla
    //..
    //..
    localStorage.removeItem("ownershipToEdit");
    // Cerrar el modal después de la actualización
  };

  return (
    <>
      <Center>
        <Heading>Edita tu Propiedad</Heading>
      </Center>
      <Center my={8} textAlign="left">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            direction={["column"]}
            borderWidth={1}
            px={4}
            width="full"
            maxWidth="900px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg"
          >
            <Flex
              direction={["column", "column", "column", "column", "column"]}
            >
              <FormControl
                m={2}
                w={["100%", "100%", "100%", "100%", "100%"]}
                isInvalid={errors.typeHouse}
              >
                <FormLabel>Tipo de inmueble</FormLabel>
                <Select
                  name="typeHouse"
                  size="sm"
                  {...register("typeHouse", validateTypeHouse)}
                  placeholder="Selecciona el tipo de inmueble"
                  _focus={{ background: "none" }}
                >
                  <option value="1">Casa</option>
                  <option value="2">Departamento</option>
                </Select>
                <FormErrorMessage>
                  {errors.typeHouse && errors.typeHouse.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex
              direction={["row"]}
              margin="auto"
              alignItems="center"
              justifyContent={"space-between"}
              m={0}
            >
              <FormControl
                mt={4}
                w={["100%", "100%"]}
                alignItems="center"
                isInvalid={errors.bedrooms}
              >
                <FormLabel>Cantidad de habitaciones</FormLabel>
                <NumberInput
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  size="sm"
                  m={2}
                  min={1}
                  max={15}
                  defaultValue={1}
                >
                  <NumberInputField
                    {...register("bedrooms", validateBedrooms)}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.bedrooms && errors.bedrooms.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                w={["100%", "100%", "100%", "100%", "100%"]}
                isInvalid={errors.bathrooms}
              >
                <FormLabel>Cantidad de baños</FormLabel>
                <NumberInput size="sm" m={2} defaultValue={1} min={1} max={10}>
                  <NumberInputField
                    {...register("bathrooms", validateBathrooms)}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormErrorMessage>
                {errors.bedrooms && errors.bedrooms.message}
              </FormErrorMessage>
            </Flex>

            <Flex direction={["column", "column", "row", "row", "row"]}>
              <FormControl
                mt={4}
                w={["100%", "100%", "100%", "100%", "100%"]}
                isInvalid={errors.size}
              >
                <FormLabel>Tamaño (m²)</FormLabel>
                <NumberInput
                  size="sm"
                  m={2}
                  defaultValue={40}
                  min={0}
                  max={100}
                >
                  <NumberInputField {...register("size", validateSize)} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.size && errors.size.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Box textAlign="center" mt={4} mb={8}>
              <Heading as="h4" size="md">
                Ubicación
              </Heading>
            </Box>
            <Places />
            <Box mt={20}>
              <Flex
                direction={["row"]}
                margin={"auto"}
                alignItems="center"
                justifyContent={"space-between"}
              >
                <FormControl
                  m={0}
                  w={["100%", "100%"]}
                  alignItems="center"
                  isInvalid={errors.floor}
                >
                  <FormLabel>Piso</FormLabel>
                  <Input
                    id="floor"
                    type="text"
                    placeholder="Piso"
                    size="sm"
                    // {...register("floor")}
                  />
                  <FormErrorMessage>
                    {errors.floor && errors.floor.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  w={["100%", "100%", "100%", "100$", "100%"]}
                  m={2}
                  isInvalid={errors.apartment}
                >
                  <FormLabel>Departmento</FormLabel>
                  <Input
                    id="apartment"
                    type="text"
                    placeholder="Dpto"
                    size="sm"
                    {...register("apartment")}
                  />
                  <FormErrorMessage>
                    {errors.apartment && errors.apartment.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Box>

            <Box textAlign="center" mt={10} mb={8}>
              <Heading as="h4" size="md">
                Fotos
              </Heading>
            </Box>

            <SimpleGrid columns={[1, 1, 2, 3, 3]}>
              {images.length > 0 &&
                images.map((image, index) => {
                  const preview = URL.createObjectURL(image);
                  return (
                    <Box key={index} position="relative">
                      <Button
                        background="rgba(0, 0, 0, 0.1)"
                        border="0"
                        borderRadius="999px"
                        color="white"
                        fontSize="16px"
                        width="32px"
                        height="32px"
                        position="absolute"
                        top="15px"
                        right={["120px", "490px", "220px", "95px"]}
                        _hover={{
                          color: "white",
                          background: "rgba(0, 0, 0, 0.5)",
                        }}
                        onClick={() => removeImage(index)}
                      >
                        X
                      </Button>
                      <Image
                        src={preview}
                        alt="Imagen"
                        width="200px"
                        height="180px"
                        objectFit="cover"
                        p={2}
                      />
                    </Box>
                  );
                })}
              <Box>
                <FormControl id="img" isInvalid={errorsImage.message}>
                  <FormLabel
                    w="170px"
                    py="5px"
                    px="10px"
                    color="white"
                    bg="black"
                    _hover={{
                      background: "#36393f",
                    }}
                    border="0px solid #fff"
                    textAlign="center"
                    borderRadius="xl"
                    disabled={images.length >= 6 ? true : false}
                  >
                    <i className="fas fa-cloud-upload-alt" /> Subir imagen
                  </FormLabel>
                  <Input
                    type="file"
                    onChange={onFileChange}
                    accept="image/x-png,image/jpeg,image/jpg"
                    size="5000"
                    disabled={images.length >= 6 ? true : false}
                    display="none"
                  />
                  <FormErrorMessage>
                    {errorsImage && errorsImage.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </SimpleGrid>
            <Center my={10}>
              <Button
                color={"white"}
                bg={"black"}
                _hover={{ background: "#4a4a4a" }}
                type="submit"
              >
                Guardar cambios
              </Button>
            </Center>
          </Flex>
        </form>
      </Center>
    </>
  );
}
