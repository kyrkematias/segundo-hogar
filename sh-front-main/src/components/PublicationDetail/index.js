import React from "react";
import {
  Box,
  Container,
  Flex,
  Center,
  Text,
  Heading,
  background,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Loading } from "components/commons/Loading";
import "swiper/swiper-bundle.min.css";
import { useGetPublicationById } from "hooks/pages/PublicationDetail/useGetPublicationById";
import { useRoute } from "wouter";
import { Slider } from "./Slider";
import { paths } from "config/paths";
import { INITIAL_CENTER, INITIAL_ZOOM } from "config/map";
import { MapContainer } from "./MapContainer";
import { MapSearch } from "components/Search/Map";
import { FaWhatsapp } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export function PublicationDetail() {
  // eslint-disable-next-line
  const [_, params] = useRoute(paths.publicationDetail);

  const { loading, error, publication } = useGetPublicationById({
    id: params.id,
  });

  if (loading) return <Loading minH={"60vh"} size={"lg"} m={50} />;
  if (error) return <div>Error!</div>;
  const idPublication = publication.id;
  const owner = publication.contact_name;
  const phone = publication.contact_phone;
  const email = publication.contact_email;
  const { lat, lon } = publication.ownership.coordinate;
  console.log("publication id: ", idPublication);
  console.log("contact_name: ", owner);
  console.log("contact_phone: ", phone);
  console.log("mail: ", email);
  console.log("lat: ", lat);
  console.log("lng: ", lon);

  const phoneLink = `https://wa.me/${phone}`;
  const emailLink = `https://mailto${email}`;
  console.log(phoneLink);
  console.log(emailLink);

  return (
    <Container maxW="container.xl" mt={4}>
      <Slider images={publication.ownership.ownerships_images} />

      <Flex color="#000" mt={16}>
        <Flex w="300px" flexDir="column">
          <Heading size="md">Detalle</Heading>
          <Text mt={4}>-Dirección: {publication.address}</Text>
          <Text mt={2} color="blackAlpha.700">
            - Tipo: {publication.ownership.ownerships_type?.description}
          </Text>
          <Text mt={2} color="blackAlpha.700">
            - Propietario/a: {publication.contact_name}
          </Text>
          <Text mt={2} color="blackAlpha.700">
            - Precio: ${publication.price}
          </Text>
          <Text mt={2} color="blackAlpha.700">
            - Habitaciones: {publication.ownership.rooms}
          </Text>
          <Text mt={2} color="blackAlpha.700">
            - Baños: {publication.ownership.bathrooms}
          </Text>
          <Text mt={2} color="blackAlpha.700">
            - Tamaño (m2): {publication.ownership.size}
          </Text>

          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={
                    i < publication.ownership.rating ? "teal.500" : "gray.300"
                  }
                />
              ))}
            {/* <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {publication.reviews} valoraciones
            </Box> */}
          </Box>
          <Box flexDirection={"column"}>
            <Text mt={2} color="blackAlpha.700">
              - Contacta al propietario:
            </Text>
            <Center my={3} gap={5}>
              <a href={phoneLink}>
                <Box
                  background={"#25D366"}
                  p={".5rem"}
                  borderRadius={"50%"}
                  _hover={{ transform: "scale(110%)" }}
                  transition={".3s"}
                  cursor={"pointer"}
                >
                  <FaWhatsapp style={{ color: "white", fontSize: "30px" }} />
                </Box>
              </a>
              <a href={`mailto:${email}`}>
              <Box
                background={"lightgray"}
                p={".5rem"}
                borderRadius={"50%"}
                _hover={{ transform: "scale(110%)" }}
                transition={".3s"}
                cursor={"pointer"}
              >
                <MdMailOutline style={{ color: "white", fontSize: "30px" }} />
              </Box>
              </a>
            </Center>
          </Box>
        </Flex>

        <Flex width={"full"} flexDir="column">
          <Box flex="1">
            <Heading size="md">{publication.title}</Heading>
            <Text mt={4} color={"#444"} textAlign="justify">
              {publication.description}
            </Text>
          </Box>
          <MapSearch
            markers={[
              {
                position: {
                  lat: lat,
                  lng: lon,
                },
              },
            ]}
          />
          {/* <MapContainer
            initialCenter={INITIAL_CENTER}
            zoom={INITIAL_ZOOM}
            isMarkerShown={true}
            publication={publication}
          /> */}
        </Flex>
      </Flex>
    </Container>
  );
}
