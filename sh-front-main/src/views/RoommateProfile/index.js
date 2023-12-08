import { useQuery } from "@apollo/client";
import { Avatar, Box, Heading, Skeleton } from "@chakra-ui/react";
import { GET_STUDENTS } from "client/gql/queries/utils"; // Asegúrate de tener esta consulta

export function RoommateProfileView() {
  const idStudent = localStorage.getItem("idUser");
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: { id: idStudent },
  });

  if (loading) return <Skeleton />;
  if (error) return <p>Error: {error.message}</p>;

  const name = data.sh_students[0]?.person?.firstname || "Nombre no encontrado";
  const lastName = data.sh_students[0]?.person?.lastname || "Nombre no encontrado";
  return (
    <Box px={20}>
      <Box
        flexDirection={"row"}
        display={"flex"}
        alignItems={"center"}
        gap={"1rem"}
      >
        <Avatar size="2xl" />
        <Heading>{name} {lastName}</Heading>
      </Box>
    </Box>
  );
}
