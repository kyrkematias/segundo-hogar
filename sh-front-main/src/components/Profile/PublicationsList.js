// En el archivo PublicationsList.js
import { useState, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { EditIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { useGetOwnershipsByOwnerId } from "hooks/utils/useGetOwnershipsByOwnerId";
import { setOwnershipId } from "store/slices/ownershipSlice";
import { UPDATE_OWNERSHIP } from "client/gql/queries/update/updateOwnershipById";
import { paths } from "config/paths";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

export function PublicationsList() {
  const [_, setLocation] = useLocation();
  const { ownerships, deleteOwnership, deletePublications, deleteImages } =
    useGetOwnershipsByOwnerId();
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const dispatch = useDispatch();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  console.log("ownership: ", ownerships);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const [updateOwnership] = useMutation(UPDATE_OWNERSHIP);
  const storedAddress = localStorage.getItem("address");

  const toast = useToast();

  const updatePublication = async (data, id, address) => {
    try {
      const result = await updateOwnership({
        variables: {
          id: id,
          object: {
            address: storedAddress,
            // addresses_id: data.address,
            bathrooms: data.bathrooms,
            size: data.size,
            rooms: data.rooms,
            shared: true,
            is_published: false,
          },
        },
      });

      console.log(
        `Publicación actualizada:`,
        result.data.update_sh_ownerships_by_pk
      );
      console.log(`data de dirección`, data.address);
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
    }

    console.log(`Actualizando publicación con ID ${id}:`, data);
  };

  const handleEdit = (id) => {
    console.log(id);
    localStorage.setItem("ownershipToEdit", id);
    setSelectedPublicationId(id);
    setLocation(`editar/${id}`);
  };

  const cancelRef = useRef();
  const handleDelete = (id) => {
    setDeleteDialogOpen(true);
    setPropertyToDelete(id);
  };

  const handleConfirmDelete = () => {
    deletePublications({ variables: { ownerships_id: propertyToDelete } });
    deleteImages({ variables: { ownerships_id: propertyToDelete } });
    deleteOwnership({ variables: { id: propertyToDelete } });
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
    toast({
      title: "Propiedad eliminada",
      description: "La propiedad se ha eliminado correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleCancelDelete = () => {
    // Cierra el diálogo de eliminación y restablece el ID de la propiedad
    setDeleteDialogOpen(false);
    setPropertyToDelete(null);
  };

  const handlePublish = (id) => {
    localStorage.setItem("ownershipId", id);
    console.log("id: ", id);
    dispatch(setOwnershipId(id));
    setLocation(`/registrar/publicacion/${id}`);
  };

  return (
    <>
      <TableContainer mt={8}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Dirección</Th>
              <Th width={"10%"}>Editar</Th>
              <Th width={"10%"}>Eliminar</Th>
              <Th width={"10%"}>Publicar</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {ownerships?.map((ownership) => (
              <Tr key={ownership?.id}>
                <Td>{ownership?.id}</Td>
                <Td>{ownership?.address?.address}</Td>
                <Td>
                  <Button size="sm" onClick={() => handleEdit(ownership?.id)}>
                    <EditIcon />
                  </Button>
                </Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    _hover={{ bg: "#E70020", color: "white" }}
                    onClick={() => handleDelete(ownership?.id)}
                  />
                </Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => handlePublish(ownership?.id)}
                  >
                    <ArrowRightIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleCancelDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Eliminar propiedad
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro de eliminar esta propiedad? Se eliminarán también
              las publicaciones asociadas.{" "}
              <Text as="b">Este cambio no es reversible</Text>.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
