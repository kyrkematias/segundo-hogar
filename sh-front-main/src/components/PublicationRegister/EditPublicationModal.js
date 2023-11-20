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

export function EditPublicationModal({
  isOpen,
  onClose,
  publicationId,
  onUpdatePublication,
  address,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const SOURCE = "register-ownership";

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

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

  const onSubmit = (data) => {
    
    onUpdatePublication(data, publicationId);

    // Cerrar el modal después de la actualización
    onClose();
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
                  <FormControl m={2} isInvalid={errors.address}>
                    <FormLabel>Dirección</FormLabel>
                    <Flex>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Dirección del inmueble..."
                        size="sm"
                        onChange={(e) => setAddress(e.target.value)}
                        {...register("address")}
                      />

                      <Button
                        onClick={getCoordinates}
                        size="sm"
                        ml={4}
                        color="white"
                        bg="black"
                        _hover={{
                          background: "#36393f",
                        }}
                      >
                        <Search2Icon mr={2} /> Buscar
                      </Button>
                    </Flex>
                    <FormErrorMessage>
                      {errors.address && errors.address.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    w={["100%", "100%", "100%", "100%", "100%"]}
                    m={2}
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

                <Box height={"500px"} mt={4}>
                  <MapContainer
                    initialCenter={coordinates ? coordinates : initialCenter}
                    zoom={zoom}
                    isMarkerShown={true}
                    coordinates={coordinates}
                    source={SOURCE}
                  />
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
