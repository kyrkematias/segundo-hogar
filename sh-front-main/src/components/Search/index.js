import React from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { FormArea } from "./FormArea";
import { Results } from "./Results";
import { useInitialPublications } from "hooks/pages/Search/useInitialPublications";
import { Loading } from "components/commons/Loading";
import { MapSearchForm } from "./MapSearchForm";

export function Search() {
  const { publications, isError, isFetching } = useInitialPublications();

  if (isFetching) return <Loading minH={"60vh"} size={"lg"} m={50} />;
  if (isError) return <div>Error!</div>;

  console.log("publications: ", publications);

  const markers = publications.map((publication) => {
    return {
      position: {
        lat: publication.ownership.coordinate.lat,
        lng: publication.ownership.coordinate.lon,
      },
      infoMarker: {
        title: publication.title,
        description: publication.description,
        address: publication.ownership.address,
        price: publication.price,
        imageUrls: publication.ownership.ownerships_images.map(
          (image) => image.imageurl
        ),
        rating: publication.ownership.rating,
        id: publication.id,
      },
    };
  });

  console.log("markers: ", markers);

  return (
    <>
      <Flex width={"full"} flexDir="row">
        <Box flex="1">
          <FormArea posts={publications} />
        </Box>

        <Box flex="1">
          <MapSearchForm width="100%" height="100%" markers={markers} />
        </Box>
      </Flex>

      <Box width={"100%"} my={20}>
        <Center>
          {publications.length > 0 ? (
            <Results posts={publications} />
          ) : (
            <Text color={"gray"} fontSize={"22px"} fontStyle={"italic"}>
              No se encontraron resultados de búsqueda. Intente nuevamente con otras
              características.
            </Text>
          )}
        </Center>
      </Box>
    </>
  );
}
