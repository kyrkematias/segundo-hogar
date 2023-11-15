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
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { HouseRegisterForm } from "components/HouseRegister/HouseRegisterForm";

export function EditPublicationModal({ isOpen, onClose, publicationId }) {
  // Utilizamos useState para gestionar el estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Utilizamos useEffect para abrir o cerrar el modal cuando isOpen cambia
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const { onOpen, onClose: closeModal } = useDisclosure();

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isModalOpen} onClose={() => { onClose(); closeModal(); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edita tu propiedad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HouseRegisterForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { onClose(); closeModal(); }}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
