import React from "react";
import {
  Box,
  Container,
  Flex,
  Center,
  Text,
  Heading,
  background,
  Card,
  Stack,
  Image,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Divider } from "@chakra-ui/react";
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
import { BsBuilding } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { LiaRulerCombinedSolid } from "react-icons/lia";
import { FaCouch } from "react-icons/fa";
import { GiCigarette } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
import { PiUsersThreeFill } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";

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
  const address = publication.ownership.address.address;
  const description = publication.description;
  console.log("publication id: ", idPublication);
  console.log("contact_name: ", owner);
  console.log("contact_phone: ", phone);
  console.log("mail: ", email);
  console.log("lat: ", lat);
  console.log("lng: ", lon);
  console.log("ownership id: ", publication.ownership.id);
  console.log("address:", publication.ownership.address);
  console.log("desc", publication.description);
  console.log("restr. ", publication.ownership.restriction);

  const phoneLink = `https://wa.me/${phone}`;
  const emailLink = `https://mailto${email}`;
  console.log(phoneLink);
  console.log(emailLink);

  return (
    <Box>
      <Stack direction={"row"} alignItems={"flex-start"} mt={16} justifyContent={"space-between"}>
        <Slider images={publication.ownership.ownerships_images} />
        
        <Card width={{ base: "500px", md: "1/4" }} p={2} height={"100%"}>
          <Flex flexDirection={"column"} align={"center"} textAlign={"center"}>
            <Heading size="md" mb={5}>
              {publication.title}
            </Heading>
            <Heading color={"gray"}>${publication.price}</Heading>
            <Text>Fecha de publicación: {publication.created_at}</Text>
            <Heading size="sm" textAlign={"center"} my={2}>
              Contacta con el propietario:
            </Heading>
            <Box>
              <Flex p={2} gap={1}>
                <Text as="b" color={"gray.600"} textAlign={"center"}>
                  Propietario:
                </Text>
                {owner}
              </Flex>
            </Box>
            <Text as={"b"}>Calificación</Text>
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
          </Flex>
        </Card>
      </Stack>
      {/* IMAGEN DEMOSTRATIVA */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={3}
        justifyContent={{ base: "flex-start", md: "space-between" }}
      >
        <Card
          variant={"elevated"}
          p={2}
          mt={16}
          width={{ base: "full", md: "3/4" }}
        >
          <Heading size="md" textAlign={"center"} my={2}>
            Características:
          </Heading>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <BsBuilding
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Tipo de propiedad:{" "}
              </Text>
              {publication.ownership.ownerships_type?.description}
            </Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <CiLocationOn
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Ubicación:{" "}
              </Text>
              {address}
            </Flex>
          </Flex>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <MdOutlineBedroomParent
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Cantidad de habitaciones:
              </Text>
              {publication.ownership.rooms}
            </Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <FaRestroom
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Cantidad de baños:
              </Text>
              {publication.ownership.bathrooms}
            </Flex>
          </Flex>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <LiaRulerCombinedSolid
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Tamaño (m2):
              </Text>
              {publication.ownership.rooms}
            </Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <FaCouch
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Amoblado:
              </Text>
              {publication.is_furnished ? <Text>Si</Text> : <Text>No</Text>}
            </Flex>
          </Flex>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <PiUsersThreeFill
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Capacidad:
              </Text>
              {publication.ownership.restriction.renter_count} Persona(s)
            </Flex>
          </Flex>
          <Divider color={"gray.300"} my={3} />
          <Heading size="md" textAlign={"center"} my={2}>
            Restricciones:
          </Heading>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <GiCigarette
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Fumadores:
              </Text>
              {publication.ownership.restriction.smokers ? (
                <Text>Si</Text>
              ) : (
                <Text>No</Text>
              )}
            </Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <MdOutlinePets
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Mascotas:
              </Text>
              {publication.ownership.restriction.pets ? (
                <Text>Si</Text>
              ) : (
                <Text>No</Text>
              )}
            </Flex>
          </Flex>
          <Flex>
            <Flex alignItems={"center"} p={2} gap={1} w={"50%"}>
              <LuBaby
                style={{ display: "inline", color: "gray", fontSize: "17px" }}
              />
              <Text as="b" color={"gray.600"}>
                Niños:
              </Text>
              {publication.ownership.restriction.children ? (
                <Text>Si</Text>
              ) : (
                <Text>No</Text>
              )}
            </Flex>
          </Flex>
        </Card>
      </Stack>
      <Divider />
      <Card p={2} mt={10}>
        <Heading size="md" textAlign={"center"} my={2}>
          Descripción
        </Heading>
        <Text>{publication.description}</Text>
      </Card>
      <Divider />
      <Flex color="#000" mt={16}>
        <Flex flex={1}>
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
        </Flex>
      </Flex>
    </Box>
  );
}
