import React, { useState } from "react";
import { Box, Flex, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { SectionHeader } from "components/commons/SectionHeader";
import { sections } from "config/sections";
import { CompleteRegisterForm } from "./CompleteRegisterForm";

export const CompleteProfileForm = () => {
  return (
    <Flex width="full" align="center" my={8} justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="900px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
        </FormControl>
        <Box p={4}>
          
          <CompleteRegisterForm />
        </Box>
      </Box>
    </Flex>
  )
}
