// En el archivo PublicationsList.js
import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { EditIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { useGetOwnershipsByOwnerId } from "hooks/utils/useGetOwnershipsByOwnerId";
import { setOwnershipId } from "store/slices/ownershipSlice";
import { UPDATE_OWNERSHIP } from "client/gql/queries/update/updateOwnershipById";
import { DELETE_PUBLICATIONS } from "client/gql/queries/delete/deletePublicationByOwnershipId";
import { paths } from "config/paths";

export function PublicationsList() {
  const [_, setLocation] = useLocation();
  const { ownerships, deleteOwnership, deletePublications, deleteImages } = useGetOwnershipsByOwnerId();
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const dispatch = useDispatch();

  const [updateOwnership] = useMutation(UPDATE_OWNERSHIP);
  const storedAddress = localStorage.getItem("address");

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

    // setIsModalOpen(false);
    console.log(`Actualizando publicación con ID ${id}:`, data);
  };

  const handleEdit = (id) => {
    console.log(id);
    // guardamos el ownership a editar el localStorage
    localStorage.setItem('ownershipToEdit', id);
    setSelectedPublicationId(id);
    setLocation(`editar/${id}`)
  }

  const handleDelete = (id) => {
    console.log()
    deletePublications({variables: { ownerships_id: id}})
    deleteImages({variables: { ownerships_id: id}})
    deleteOwnership({ variables: { id: id } });
  };

  const handlePublish = (id) => {
    localStorage.setItem("ownershipId", id)
    console.log("id: ", id)
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
                  <Button
                    size="sm"
                    onClick={() => handleDelete(ownership?.id)}
                    _hover={{ bg: "#E70020" }}
                  >
                    <DeleteIcon _hover={{ color: "white" }} />
                  </Button>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => handlePublish(ownership?.id)}
                  >
                    <ArrowRightIcon />
                  </Button>
                </Td>
                <Td>
                  {ownership?.id?.is_published? (
                    <PublishedIcon />
                  ) : (
                    <NotPublishedIcon />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* {isModalOpen && (
        <EditPublicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdatePublication={updatePublication}
          publicationId={selectedPublicationId}
          // address={ownerships.find(o => o.id === selectedPublicationId)?.address?.address}
        />
      )} */}
    </>
  );
}

const PublishedIcon = () => {
  return (
    <Icon viewBox="0 0 200 200" color="green.500">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
};

const NotPublishedIcon = () => {
  return (
    <Icon viewBox="0 0 200 200" color="red.500">
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
};
