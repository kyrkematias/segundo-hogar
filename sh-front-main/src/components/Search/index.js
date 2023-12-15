import React from "react";
import { Box, Center, Flex, position } from "@chakra-ui/react";
import { FormArea } from "./FormArea";
import { Results } from "./Results";
import { useInitialPublications } from "hooks/pages/Search/useInitialPublications";
import { Loading } from "components/commons/Loading";
import { MapSearch } from "components/Search/Map";

export function Search() {
  const { publications, isError, isFetching } = useInitialPublications();

  if (isFetching) return <Loading minH={"60vh"} size={"lg"} m={50} />;
  if (isError) return <div>Error!</div>;

  console.log("publications: ", publications);
  // publications.forEach((publication, index) => {
  //   console.log(
  //     `Coordinates for publication ${index + 1}: `,
  //     publication.ownership.coordinate
  //   );
  // });

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
          <MapSearch width="100%" height="100%" 
          markers={markers} 
          />
        </Box>
      </Flex>
      <Box width={"100%"} my={20}>
        <Center>
          <Results posts={publications} />
        </Center>
      </Box>
    </>
  );
}
