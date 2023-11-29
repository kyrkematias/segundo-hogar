import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MapContainer } from "components/commons/MapContainer";
import { SearchForm } from "./SearchForm";
import { SectionHeader } from "components/commons/SectionHeader";
import { sections } from "config/sections";
import { INITIAL_CENTER, INITIAL_ZOOM } from "config/map";
import {MapSearch} from "./Map";

export function FormArea({ posts }) {
  
  const { search } = sections;
  // const markers = [
  //   { position: { lat: -26.830529214328564, lng: -65.20384130911128 } },
  //   { position: { lat: -26.830, lng: -65.204 } },
  //   // Agrega más coordenadas según sea necesario
  // ];

  return (
    <Flex
      flexDir={["column", "column", "row", "row"]}
      minHeight="600px"
      justifyContent="center"
      mx={2}
      borderWidth={1}
      px={2}
      borderRadius={4}
      textAlign="center"
      boxShadow="lg"
    >
      {/* <Box width={["100%", "100%", "80%", "45%"]} pt={4}>
        <MapSearch markers={markers} posts={posts}/>
        <MapContainer
          initialCenter={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          isMarkerShown={true}
          posts={posts}
        />
      </Box> */}
      <Box width={["100%", "100%", "80%", "45%"]} pl={8} pt={4}>
        <SectionHeader section={search.section} sectionTitle={search.title} />
        <SearchForm />
      </Box>
    </Flex>
  );
}
