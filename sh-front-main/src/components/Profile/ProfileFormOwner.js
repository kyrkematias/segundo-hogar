import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  Input,
  InputRightElement,
  Box,
  Flex,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { validatePassword } from "utils/validations/SignUp/validations";
import { useProfileForm } from "hooks/pages/Profile/useProfileForm";
import { useGetUser } from "hooks/pages/Profile/useGetUser";
import { CustomButton } from "components/commons/CustomButton";

export function ProfileFormOwner() {
  const { user } = useGetUser();

  const { register, handleSubmit, onSubmit, onCancel, errors, isSubmitting } =
    useProfileForm();

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => setShowPass(!showPass);

  return (
    <Box>
      <Flex direction={["column", "column", "row", "row", "row"]} mb={10}>
        <Box width="100%" mt="8">
          <Avatar
            size="xl"
            name={`${user?.person.lastname}, ${user?.person.firstname}`}
          />
          <Flex direction={["column", "column", "column", "column", "column"]}>
            <Text fontSize="2xl">{`${user?.person.lastname}, ${user?.person.firstname}`}</Text>
            <Text fontSize="lg">{user?.email}</Text>
          </Flex>
        </Box>
      </Flex>

      <Flex
        justifyContent="center"
        flexDirection="column"
        px={{ base: 0, md: 6 }}
        py={{base: 0, md: 6}}
        border={{base: "none", md: "1px solid #edf2f7"}}
        borderRadius={10}
      >
        <Flex
          justifyContent="center"
          textAlign={"left"}
        >
          <Flex direction="column" width={{ base: "100%", md: "50%" }}>
            <FormControl m={2} isInvalid={errors.currentPassword}>
              <FormLabel>Ingresá tu contraseña actual</FormLabel>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Contraseña actual"
                width={["100%", "100%", "100%", "100%", "100%"]}
                {...register("currentPassword", validatePassword)}
              />
              <FormErrorMessage>
                {errors.currentPassword && errors.currentPassword.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent="center">
          <Flex
            direction={["column", "column", "column", "column", "column"]}
            width={{ base: "100%", md: "50%" }}
          >
            <FormControl m={2} isInvalid={errors.password}>
              <FormLabel>Ingresá tu nueva contraseña</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  w={["100%", "100%", "100%", "100%", "100%"]}
                  {...register("password", validatePassword)}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl m={2} isInvalid={errors.confirmPassword}>
              <FormLabel>Ingresá la confirmación tu nueva contraseña</FormLabel>
              <Input
                id="confirmPassword"
                type={showPass ? "text" : "password"}
                placeholder="Confirmación de la nueva contraseña"
                w={["100%", "100%", "100%", "100%", "100%"]}
                {...register("confirmPassword", validatePassword)}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </Flex>

        <Flex
          direction={{ base: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          margin={{ base: "0", md: "10" }}
        >
          <Button
            onClick={onCancel}
            type="submit"
            isLoading={false}
            width={{ base: "100%", md: "20%" }}
            margin={2}
            aria-label="Cancelar edición"
          >
            Cancelar
          </Button>
          <CustomButton
            handleClick={handleSubmit(onSubmit)}
            type="submit"
            isLoading={isSubmitting}
            loadingText="Guardando"
            width={{ base: "100%", md: "20%" }}
            textButton="Guardar"
            margin={2}
            aria-label="Guardar edición"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
