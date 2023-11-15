import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Button, Box, Text } from "@chakra-ui/react";
import { paths } from "config/paths";
import useLocation from "wouter/use-location";

export const AddPublication = () => {
  const [_, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(paths.houseRegister);
  };

  return (
    <Flex justifyContent="space-around" alignItems="center" my="5">
      <Button gap="3" variant="outline" boxShadow="md" onClick={handleClick}>
        <Box>
          <Text fontSize="xl">Agregar Propiedad</Text>
        </Box>
        <Box>
          <SmallAddIcon />
        </Box>
      </Button>
    </Flex>
  );
};
