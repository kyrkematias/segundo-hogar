import React from "react";
import { useQuery } from "@apollo/client";
import { useRoute } from "wouter";
import { paths } from "config/paths";
import {
  Avatar,
  Box,
  Heading,
  Skeleton,
  Button,
  Center,
  Card,
  Divider,
  Stack,
  Text,
  Flex,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { BsPinMapFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { GET_PERSON_BY_ID } from "client/gql/queries/utils";
import { SkeletonLoader } from "components/commons/Loading/Skeleton";

const formatDate = (birthdate) => {
  const options = { day: "numeric", month: "long" };
  const date = new Date(birthdate);
  return date.toLocaleDateString("es-AR", options);
};

export function RoommateProfileView() {
  const [_, params] = useRoute(paths.roommateAccount);
  const idPerson = localStorage.getItem("idUser");
  const { loading, error, data } = useQuery(GET_PERSON_BY_ID, {
    variables: { id: idPerson },
  });

  if (loading) return <SkeletonLoader />;
  if (error) return <Heading>Error: {error.message}</Heading>;

  const person = data.sh_persons[0];
  console.log("person: ", person);
  console.log("data: ", data);

  const phoneLink = `https://wa.me/${person.phone}`;

  const formattedBirthdate = formatDate(person.birth_date);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthdateObj = new Date(birthdate);
    let age = today.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = today.getMonth() - birthdateObj.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthdateObj.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <Box px={20}>
      <Box
        flexDirection={{ base: "column", md: "row" }}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          flexDirection={{ base: "column", md: "row" }}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}  
          textAlign={"center"}       
          gap={{ base: "1rem", md: "2rem" }}
        >
          <Avatar size="2xl" />
          <Heading as="h1">{`${person.firstname} ${person.lastname}`}</Heading>
        </Box>
        <a href={phoneLink}>
          <Button
            leftIcon={<FaWhatsapp />}
            colorScheme="gray"
            variant="solid"
            size="lg"
          >
            Contactar
          </Button>
        </a>
      </Box>
      <Divider my={10} />
      <Container my={10} width={{ base: "100%", md: "80%" }}>
        <Card>
          <Tabs>
            <TabList>
              <Tab
                _selected={{ color: "black", bg: "#EDF2F7" }}
                fontWeight={"medium"}
                transition={".5s"}
              >
                Información General
              </Tab>
              <Tab
                _selected={{ color: "black", bg: "#EDF2F7" }}
                fontWeight={"medium"}
                transition={".5s"}
              >
                Información Académica
              </Tab>
              <Tab
                _selected={{ color: "black", bg: "#EDF2F7" }}
                fontWeight={"medium"}
                transition={".5s"}
              >
                Contacto
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading py={5} textAlign={"center"} size="lg">
                  Información general
                </Heading>
                <Divider />
                <Stack py={4}>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Género:
                      </Text>
                      {person.gender === "male" && (
                        <Flex alignItems={"center"} gap={1}>
                          <IoMdMale color={"#4299E1"} fontWeight={"medium"} />
                          <Text
                            fontSize={"18px"}
                            color={"gray.400"}
                            fontWeight={"semibold"}
                          >
                            Hombre
                          </Text>
                        </Flex>
                      )}

                      {person.gender === "female" && (
                        <Flex alignItems={"center"} gap={1}>
                          <IoMdFemale color={"#F56565"} fontWeight={"medium"} />
                          <Text
                            fontSize={"18px"}
                            color={"gray.400"}
                            fontWeight={"semibold"}
                          >
                            Mujer
                          </Text>
                        </Flex>
                      )}

                      {person.gender !== "male" &&
                        person.gender !== "female" && (
                          <Flex alignItems={"center"} gap={1}>
                            <IoMaleFemaleSharp
                              color={"#ED64A6"}
                              fontWeight={"medium"}
                            />
                            <Text
                              fontSize={"18px"}
                              color={"gray.400"}
                              fontWeight={"semibold"}
                            >
                              Otro
                            </Text>
                          </Flex>
                        )}
                    </Flex>
                  </Center>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Cumpleaños:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <FaBirthdayCake color="pink" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {formattedBirthdate}
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Edad:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <FaUserClock color="#4A5568" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {calculateAge(person.birth_date)} años
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Heading py={5} textAlign={"center"} size="lg">
                  Información Académica
                </Heading>
                <Divider />
                <Stack py={4}>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Carrera:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <RiGraduationCapFill color="#4A5568" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {person.students[0]?.career?.name.replace(
                            "Ingeniería",
                            "Ing."
                          ) || "No especificada"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Provincia:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <FaLocationDot color="#F56565" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {person.students[0]?.city?.state?.name ||
                            "No especificada"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Ciudad:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <BsPinMapFill color="#4A5568" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {person.students[0]?.city?.name || "No especificada"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Heading py={5} textAlign={"center"} size="lg">
                  Información de Contacto
                </Heading>
                <Divider />
                <Stack py={4}>
                  <Center>
                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"18px"} fontWeight={"semibold"}>
                        Telefono de contacto:
                      </Text>
                      <Flex alignItems={"center"} gap={1}>
                        <FaPhoneAlt color="#4A5568" />
                        <Text
                          fontSize={"18px"}
                          color={"gray.400"}
                          fontWeight={"semibold"}
                        >
                          {person.phone || "No especificada"}
                        </Text>
                      </Flex>
                    </Flex>
                  </Center>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Card>
      </Container>
    </Box>
  );
}
