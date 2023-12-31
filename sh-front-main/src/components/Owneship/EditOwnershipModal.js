import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { MapContainer } from "components/commons/MapContainer";
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
import { UPDATE_COORDINATES_MUTATION, UPDATE_ADDRESS_MUTATION, UPDATE_OWNERSHIPS_MUTATION } from "client/gql/queries/update/updateOwnershipById";
import { useApolloClient, useMutation } from "@apollo/client";

export function EditPublicationModal({
  isOpen,
  onClose,
  publicationId,
  onUpdatePublication,
  address,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ updateCoordinates ] = useMutation(UPDATE_COORDINATES_MUTATION);
  const [ updateAddress ] = useMutation(UPDATE_ADDRESS_MUTATION);
  const [ updateOwnership ] = useMutation(UPDATE_OWNERSHIPS_MUTATION);

  // const  { ownerships } = useGetOwnershipsByOwnerId();
  // const SOURCE = "register-ownership";

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const client = useApolloClient();

  const { onOpen, onClose: closeModal } = useDisclosure();

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

  const toast = useToast();

  const onSubmit = async (data) => {
    try{
      // add coordinates and address to data from localstorage
      const lat = localStorage.getItem("lat");
      const lng = localStorage.getItem("lng");
      const address = localStorage.getItem("address");
      data.coordinates = { lat, lng };
      data.address = address;
      console.log("Datos formulario", data)
      const ownershipId = localStorage.getItem('ownershipToEdit');
      console.log("OWNER ship ip a editar:", ownershipId)
      const ownership = await client.query({
        query: GET_OWNERSHIPS_BY_ID,
        variables: { id : ownershipId },
        fetchPolicy: "no-cache",
      });
      console.log("propiedad a editar", ownership)
      console.log("coordenadas a editar", ownership.data.sh_ownerships[0].coordinate.id)
      // llamadas a las mutaciones por tabla
      // actualizar coordenadas
      updateCoordinates({
        variables: {
          id: ownership.data.sh_ownerships[0].coordinate.id,
          lat: parseFloat(data.coordinates.lat), // Ensure it's parsed as Float
          lon: parseFloat(data.coordinates.lng), // Ensure it's parsed as Float
          updatedAt: new Date().toISOString(),
        },
      }).then((result) => {
        console.log("coordenadas actualizadas", result)
      })
      // actualizar dirección
      updateAddress({
        variables: {
          id: ownership.data.sh_ownerships[0].address.id,
          address: data.address,
          floor: data.floor,
          apartment: data.apartment,
          updatedAt: new Date().toISOString(),
        },
      }).then((result) => {
        console.log("dirección actualizada", result)
      })
      // actualizar propiedad
      updateOwnership({
        variables: {
          id: ownershipId,
          shared: true,
          rooms: data.bedrooms,
          bathrooms: data.bathrooms,
          size: data.size,
          rating: 1,
          updatedAt: new Date().toISOString(),
        },
      }).then((result) => {
        console.log("propiedad actualizada", result)
      })
      toast({
        title: "Propiedad actualizada",
        description: "La propiedad " + ownershipId + " se ha actualizado correctamente.", 
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose()
      closeModal()
    }
    catch(error){
      console.log("error", error)
      toast({
        title: "Error al actualizar",
        description: "La propiedad no se ha actualizado correctamente. Intenta mas tarde o contacta con soporte", 
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    

    localStorage.removeItem("ownershipToEdit")
  };

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isModalOpen}
        onClose={() => {
          onClose();
          closeModal();
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edita tu propiedad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box my={8} textAlign="left">
              <form>
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
                  direction={["column", "column", "column", "column", "column"]}
                  margin="auto"
                  alignItems="center"
                >
                  <FormControl
                    mt={4}
                    w={["100%", "100%", "100%", "100%", "100%"]}
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
                    <NumberInput
                      size="sm"
                      m={2}
                      defaultValue={1}
                      min={1}
                      max={10}
                    >
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

                <Flex
                  direction={["column", "column", "column", "column", "column"]}
                >
                  <FormControl>
                    <Places />
                  </FormControl>
                  <FormControl
                    w={["100%", "100%", "100%", "100%", "100%"]}
                    mt={16}
                    ml={2}
                    isInvalid={errors.floor}
                  >
                    <FormLabel>Piso</FormLabel>
                    <Input
                      id="floor"
                      type="text"
                      placeholder="Piso"
                      size="sm"
                      {...register("floor")}
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
              </form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="black"
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                closeModal();
              }}
            >
              Cerrar
            </Button>
            <Button
              variant="ghost"
              bg="black"
              color="white"
              onClick={handleSubmit(onSubmit)}
            >
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
