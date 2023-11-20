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
} from "@chakra-ui/react";
import { useLocation } from "wouter";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { EditIcon, ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import { useGetOwnershipsByOwnerId } from "hooks/utils/useGetOwnershipsByOwnerId";
import { setOwnershipId } from "store/slices/ownershipSlice";
import { EditPublicationModal } from "components/PublicationRegister/EditPublicationModal";
import { UPDATE_OWNERSHIP } from "client/gql/queries/update/updateOwnershipById";

export function PublicationsList() {
  const [_, setLocation] = useLocation();
  const { ownerships, deleteOwnership } = useGetOwnershipsByOwnerId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublicationId, setSelectedPublicationId] = useState(null);
  const dispatch = useDispatch();

  const [updateOwnership] = useMutation(UPDATE_OWNERSHIP);

  const updatePublication = async (data, id, address) => {
    try {
      const result = await updateOwnership({
        variables: {
          id: id,
          object: {
            address: data.address,
            // addresses_id: data.address,
            bathrooms: data.bathrooms,
            size: data.size,
            rooms: data.rooms,
            shared: true,
            is_published: false,
          },
        },
      });

      console.log(`Publicación actualizada:`, result.data.update_sh_ownerships_by_pk);
      console.log(`data de dirección`,data.address)
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
    }

    setIsModalOpen(false);
    console.log(`Actualizando publicación con ID ${id}:`, data);
  };

  const handleEdit = (id) => {
    console.log(id)
    setSelectedPublicationId(id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteOwnership({ variables: { id: id } });
  };

  const handlePublish = (id) => {
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
                  <Button size="sm" onClick={() => handleDelete(ownership?.id)}>
                    <DeleteIcon />
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isModalOpen && (
        <EditPublicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdatePublication={updatePublication}
        publicationId={selectedPublicationId}
        // address={ownerships.find(o => o.id === selectedPublicationId)?.address?.address}
        />
      )}
    </>
  );
}
