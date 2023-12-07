import React from "react";
import { useLocation } from "wouter";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { GET_STUDENTS } from "client/gql/queries/utils"; // Si este import no es necesario, puedes eliminarlo
// import { useQuery } from "@apollo/client"; // Puedes eliminar esta línea

export function StudentsCards({ filters, students }) {
  const [_, setLocation] = useLocation();

  const redirectToProfile = (username) => {
    setLocation(`/roommate/${username}`);
  };

  const buttonBgColor = useColorModeValue("#151f21", "gray.900");
  const textColor = useColorModeValue("gray.700", "gray.400");
  const cardBgColor = useColorModeValue("white", "gray.900");

  return (
    <Center py={6} flexWrap={"wrap"} gap={"2rem"}>
      {students &&
        students.map((student) => (
          (!filters.gender || student.person.gender === filters.gender) && (
            <Box
              key={student.person.id}
              maxW={"330px"}
              minW={"310px"}
              minH={"455px"}
              w={"full"}
              bg={cardBgColor}
              boxShadow={"2xl"}
              rounded={"lg"}
              p={6}
              textAlign={"center"}
            >
              <Avatar size={"xl"} alt={"Avatar Alt"} mb={4} pos={"relative"} />
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {`${student.person.firstname} ${student.person.lastname}`}
              </Heading>
              <Text fontWeight={600} color={"gray.500"} mb={4}>
                {student.career.name}
              </Text>

              <Center>
                {student.person.gender === "male" && (
                  <IoMdMale
                    color={"#4299E1"}
                    fontSize={"30px"}
                    fontWeight={"medium"}
                  />
                )}
                {student.person.gender === "female" && (
                  <IoMdFemale
                    color={"#F56565"}
                    fontSize={"30px"}
                    fontWeight={"medium"}
                  />
                )}
                {student.person.gender !== "male" &&
                  student.person.gender !== "female" && (
                    <IoMaleFemaleSharp
                      color={"#ED64A6"}
                      fontSize={"30px"}
                      fontWeight={"medium"}
                    />
                  )}
              </Center>

              <Text textAlign={"center"} my={4} color={textColor}>
                {`Birth Date: ${student.person.birth_date}`}
              </Text>
              <Stack mt={8} direction={"row"} spacing={4} alignSelf={"end"}>
                <Button
                  w={"full"}
                  mt={8}
                  bg={buttonBgColor}
                  color={"white"}
                  rounded={"md"}
                  onClick={() => redirectToProfile(student.person.username)}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Mostrar perfil completo
                </Button>
              </Stack>
            </Box>
          )
        ))}
    </Center>
  );
}

