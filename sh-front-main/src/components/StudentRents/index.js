import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Th,
  Tbody,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useGetUser } from "hooks/pages/Profile/useGetUser";
import { GET_RENTS_BY_STUDENT_ID } from "client/gql/queries/users";

export function StudentRents() {
  const toast = useToast();

  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const { user } = useGetUser();

  console.log("Data from GET_STUDENT_USER_BY_ID:", user);

  const studentId = user?.person?.students?.[0]?.id;
  console.log("id del student ", studentId);

  const { loading, error, data } = useQuery(GET_RENTS_BY_STUDENT_ID, {
    variables: { id: studentId },
    fetchPolicy: "no-cache",
  });

  if (!studentId) {
    return <p>No se ha encontrado información del estudiante.</p>;
  }
  console.log("Data from GET_RENTS_BY_STUDENT_ID:", data);

  if (loading) return <Spinner />;

  const handleRating = (rating) => {
    // TODO lógica para enviar la calificación a la base de datos

    toast({
      title: "Calificación de renta enviada",
      description: "¡Gracias por tu calificación!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    toast({
      title: "Error!",
      description:
        "Hubo un problema al enviar la calificación. Inténtalo de nuevo más tarde.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <div>
      <Heading as="h1">Mis rentas</Heading>
      <TableContainer mt={8}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Dirección</Th>
              <Th>Calificar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.sh_rents.map((rent, index) => (
              <Tr key={rent.id}>
                <Td>{rent.id}</Td>
                <Td>{`${rent.ownership.address.address}`}</Td>
                <Td>
                  <Box d="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={
                            i <
                            (hoverRating ||
                              selectedRating ||
                              rent.ownership.rating)
                              ? "teal.500"
                              : "gray.300"
                          }
                          onMouseEnter={() => setHoverRating(i + 1)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => {
                            setSelectedRating(i + 1);
                            handleRating(i + 1);
                          }}
                        />
                      ))}
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
