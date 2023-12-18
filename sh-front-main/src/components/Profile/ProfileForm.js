import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Select,
  Avatar,
  Box,
  Flex,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import {
  validateBio,
  validatecareer,
  validateGender,
  validateState,
  validateCity,
} from "utils/validations/SignUp/validations";
import { useProfileForm } from "hooks/pages/Profile/useProfileForm";
import { useGetUser } from "hooks/pages/Profile/useGetUser";
import { useGetCareers } from "hooks/utils/useGetCareers";
import { useGetStates } from "hooks/utils/useGetStates";
import { useGetCities } from "hooks/utils/useGetCities";
import { CustomButton } from "components/commons/CustomButton";
import { useEffect } from "react";

export function ProfileForm() {
  const { user } = useGetUser();
  const { careers } = useGetCareers();
  const { cities, setStateSelected } = useGetCities();
  const { states } = useGetStates();

  const { register, handleSubmit, onSubmit, onCancel, errors, isSubmitting } =
    useProfileForm();

  console.log("Data from GET_STUDENT_USER_BY_ID:", user);

  return (
    <>
      <Flex justifyContent="center">
        <Flex
          direction={["column", "column", "row", "row", "row"]}
          mr={["50px"]}
        >
          <Box w="100%" mt="8">
            <Avatar
              size="xl"
              name={`${user?.person.lastname}, ${user?.person.firstname}`}
              src={user?.avatar}
            />
            <Flex
              direction={["column", "column", "column", "column", "column"]}
            >
              <Text fontSize="2xl">{`${user?.person.lastname}, ${user?.person.firstname}`}</Text>
              <Text fontSize="lg">{`Legajo: ${
                user?.person.students?.[0]?.file_number || "-"
              }`}</Text>
              <Text fontSize="lg">{`@${user?.username}`}</Text>
              <Text fontSize="lg">{user?.email}</Text>
            </Flex>
          </Box>
        </Flex>

        <form>
          <Box>
            <Flex mt="8">
              <Heading as="h4" size="md">
                Datos Personales
              </Heading>
            </Flex>

            <Flex direction={["column", "column", "row", "row", "row"]}>
              <FormControl m={2}>
                <FormLabel>Compartir</FormLabel>
                <Select
                  name="share"
                  {...register("share")}
                  w={["100%", "100%", "100%", "100%", "100%"]}
                  _focus={{ background: "none" }}
                >
                  <option value="False">No</option>
                  <option
                    value="True"
                    selected={user?.person.students?.[0]?.shared || false}
                  >
                    Si
                  </option>
                </Select>
              </FormControl>

              <FormControl m={2} isInvalid={errors.career}>
                <FormLabel>Selecciona tu Carrera</FormLabel>
                <Select
                  name="career"
                  placeholder="Selecciona..."
                  {...register("career", validatecareer)}
                  w={["100%", "100%", "100%", "100%", "100%"]}
                  _focus={{ background: "none" }}
                >
                  {careers?.map((career) => {
                    return (
                      <option
                        value={career.id}
                        key={career.id}
                        selected={
                          user?.person.students?.[0]?.career?.id === career.id
                        }
                      >
                        {career.name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>
                  {errors.career && errors.career.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex direction={["column", "column", "row", "row", "row"]} w="50%">
              <FormControl m={2} isInvalid={errors.gender}>
                <FormLabel>Selecciona tu genero</FormLabel>
                <Select
                  name="gender"
                  placeholder="Selecciona..."
                  {...register("gender", validateGender)}
                  _focus={{ background: "none" }}
                >
                  <option
                    value="Male"
                    selected={user?.person.gender.toUpperCase() === "MALE"}
                  >
                    Masculino
                  </option>
                  <option
                    value="Female"
                    selected={user?.person.gender.toUpperCase() === "FEMALE"}
                  >
                    Femenino
                  </option>
                  <option
                    value="Other"
                    selected={user?.person.gender.toUpperCase() === "OTHER"}
                  >
                    Otro
                  </option>
                </Select>
                <FormErrorMessage>
                  {errors.gender && errors.gender.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex direction={["column", "column", "row", "row", "row"]}>
              <FormControl m={2} isInvalid={errors.state}>
                <FormLabel>Selecciona tu provincia origen</FormLabel>
                <Select
                  name="state"
                  placeholder="Selecciona..."
                  {...register("state", validateState)}
                  _focus={{ background: "none" }}
                  onChange={(e) => setStateSelected(e.target.value)}
                >
                  {states?.map((state) => {
                    return (
                      <option
                        value={state.id}
                        key={state.id}
                        selected={
                          user.person.students[0].city.state_id === state.id &&
                          user.person?.students[0].city.state_id !== undefined
                        }
                      >
                        {state.name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>
                  {errors.state && errors.state.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl m={2} isInvalid={errors.city}>
                <FormLabel>Selecciona tu ciudad origen</FormLabel>
                <Select
                  name="city"
                  placeholder="Selecciona..."
                  {...register("city", validateCity)}
                  _focus={{ background: "none" }}
                >
                  {cities?.map((city) => {
                    return (
                      <option
                        value={city.id}
                        key={city.id}
                        selected={
                          user.person.students[0].city.id === city.id &&
                          user.person?.students[0].city.id !== undefined
                        }
                      >
                        {city.name}
                      </option>
                    );
                  })}
                </Select>
                <FormErrorMessage>
                  {errors.city && errors.city.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex
              direction={["column", "column", "row", "row", "row"]}
              w="900px"
            >
              <FormControl m={2} isInvalid={errors.bio}>
                <FormLabel>Presentación</FormLabel>
                <Textarea
                  id="bio"
                  placeholder="Escribe tu presentación aquí..."
                  resize="none"
                  {...register("bio", validateBio)}
                  _focus={{ background: "none" }}
                  defaultValue={user?.bio || ""}
                />
                <FormErrorMessage>
                  {errors.bio && errors.bio.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>
          </Box>
        </form>
      </Flex>
      <Flex justifyContent="center">
        <Button
          onClick={onCancel}
          type="submit"
          isLoading={false}
          width="20%"
          margin={2}
        >
          Cancelar
        </Button>
        <CustomButton
          handleClick={handleSubmit(onSubmit)}
          type="submit"
          isLoading={isSubmitting}
          loadingText="Guardando"
          width="20%"
          textButton="Guardar"
          margin={2}
        />
      </Flex>
    </>
  );
}
