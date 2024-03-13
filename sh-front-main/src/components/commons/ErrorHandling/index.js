import { Image, Text, Center } from "@chakra-ui/react";
import unplugImg from "../../../assets/images/unplug.webp";
export function HandleError({ errorMessage }) {
  return (
    <Center
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      color="gray"
      textAlign="center"
      flexDirection="column"
    >
      <Image
        src={unplugImg}
        alt="unplug image"
        alignSelf={"center"}
        width="250px"
        height="250px"
      />
      <Text fontSize="xl" fontWeight="semibold" my={6}>
        Error: {errorMessage}
      </Text>
    </Center>
  );
}
