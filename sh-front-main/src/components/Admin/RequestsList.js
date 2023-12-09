// En el archivo PublicationsList.js
import { useEffect, useState, useRef } from "react";
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
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { TbHomeCheck , TbHomeX } from "react-icons/tb";
import { useGetRequests } from "hooks/utils/useGetRequests";
import { useSetStateRequest } from "hooks/utils/useSetStateRequest";

export function RequestsList() {
 
  const [isModalRequestRentOpen, setIsModalRequestRentOpen] = useState(false);
  const { loadingRequests, errorRequests, requests } = useGetRequests();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestState, setRequestState] = useState(null);
  const [aproveRequest, setAproveRequest] = useState(false);

  const { stateRequest, loadingDisable, errorDisable } = useSetStateRequest(selectedRequest, requestState);


  const cancelRef = useRef();

  const toast = useToast();

  const [requestsList, setRequestsList] = useState([]);


  console.log("requests", requests);

  useEffect(() => {
    // Update the requestsList state when the requests data changes
    if (requests) {
      setRequestsList(requests.sh_requests);
    }
  }, [requests]);

  if (loadingRequests) {
    return <p>Cargando solicitudes de rentas...</p>;
  }

  if (errorRequests) {
    return <p>Error al cargar solicitudes de renta: {errorRequests.message}</p>;
  }

  
  const handleStateRequest = (request, aproveRequest) => {
    setAproveRequest(aproveRequest);
    setSelectedRequest(request.id);
    console.log("Estado del request: ", request.request_state, " Estado nuevo: ", !request.request_state);
    setRequestState(!request.request_state);
    setIsModalRequestRentOpen(true);
  }

  const handleConfirmStateRequest = async () => {
    try {
      await stateRequest(selectedRequest, requestState)
        .then(() => {
          const state = aproveRequest ? "aprobado" : "rechazado";
          toast({
            title: "Request " + state,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        });
      // Update the requestsList with the news state
      const newRequestsList = requestsList.map((request) => {
        if (request.id === selectedRequest) {
          return {
            ...request,
            request_state: requestState,
          };
        }
        return request;
      });
      setRequestsList(newRequestsList);
    } catch (error) {
      const state = aproveRequest ? "aprobar" : "rechazar";
      toast({
        title: "Error al " + state + " el request. " + error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsModalRequestRentOpen(false);
  }

  const handleCancelStateRequest = () => {
    setIsModalRequestRentOpen(false);
  }

  return (
    <>
        {/* tabla de request, que muestre id, mensaje, 
        publication.contact_mail, publication.ownership.owner.id
        y las acciones con dos botones, aceptar o rechazar la request  */}
        <TableContainer  width={"100%"}>
          <Table variant="striped" colorScheme="gray" width={"100%"}>
            <Thead>
              <Tr>
                <Th width={"2%"}>Id</Th>
                <Th width={"5%"}>Mensaje</Th>
                <Th width={"10%"}>Correo de contacto</Th>
                <Th width={"5%"}>Id del dueño</Th>
                <Th width={"2%"}>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requestsList.map((request) => (
                // Mostrar solo las requests que tengan request_state en false
                request.request_state && (
                    <Tr key={request.id}>
                        <Td>{request.id}</Td>
                        <Td>
                            <Tooltip label={request.message} hasArrow>
                                <Text isTruncated>{request.message.substring(0, 50)+"..."}</Text>
                            </Tooltip>
                        </Td>
                        
                        <Td>{request.publication.contact_mail}</Td>
                        <Td>{request.publication.ownership.owner.id}</Td>
                        <Td>
                        <Flex>
                            <Tooltip label="Aceptar" hasArrow>
                            <IconButton
                                aria-label="Aceptar"
                                icon={<TbHomeCheck />}
                                colorScheme="green"
                                onClick={() => handleStateRequest(request, true)}
                                mr="2"
                            />
                            </Tooltip>
                            <Tooltip label="Rechazar" hasArrow>
                            <IconButton
                                aria-label="Rechazar"
                                icon={<TbHomeX />}
                                colorScheme="red"
                                onClick={() => handleStateRequest(request, false)}
                                mr="2"
                            />
                            </Tooltip>
                        </Flex>
                        </Td>
                    </Tr>
                    )
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <AlertDialog
          isOpen={isModalRequestRentOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleCancelStateRequest}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {aproveRequest ? "Aceptar" : "Rechazar"} solicitud
                </AlertDialogHeader>
    
                <AlertDialogBody>
                    ¿Está seguro que desea {aproveRequest ? "aprobar" : "rechazar"} la solicitud?
                </AlertDialogBody>
    
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={handleCancelStateRequest}>
                    Cancelar
                    </Button>
                    {aproveRequest ? (
                        <Button
                            colorScheme="green"
                            onClick={handleConfirmStateRequest}
                            ml={3}
                        >
                            Aceptar
                        </Button>
                    ) : (
                        <Button
                            colorScheme="red"
                            onClick={handleConfirmStateRequest}
                            ml={3}
                        >
                            Rechazar
                        </Button>
                    )}
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    </>
  );
}




