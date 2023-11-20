import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Box, Text } from "@chakra-ui/react";
import { CustomButton } from "components/commons/CustomButton";
import { paths } from "config/paths";
import useLocation from "wouter/use-location";

export const AddPublication = () => {
  const [_, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(paths.houseRegister);
  };

  return (
    <Flex justifyContent="space-around" alignItems="center" my="5">
      <CustomButton width="20%"
          textButton="Agregar Propiedad" onClick={handleClick}>
          <SmallAddIcon />
      </CustomButton>
    </Flex>
  );
};
