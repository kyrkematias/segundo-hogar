import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Select,
  Center,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  validateFirstname,
  validateLastname,
  validateNumberSumary,
  validateUsername,
  validateDateOfBirth,
  validateGender,
  validatePhone,
  validatecareer,
  validateState,
  validateCity,
} from "utils/validations/SignUp/validations";
import { useGetCities } from "hooks/utils/useGetCities";
import { useGetStates } from "hooks/utils/useGetStates";
import { useGetCareers } from "hooks/utils/useGetCareers";
import { CustomButton } from "components/commons/CustomButton";
import { REGISTER_STUDENT_USER_WITH_SOC_NET } from "client/gql/mutations/registerUser/registerStudentUserSocialNetwork";

export function CompleteRegisterForm() {
  const [registerStudentUser] = useMutation(REGISTER_STUDENT_USER_WITH_SOC_NET);

  const {
    register,
    handleSubmit,
    setValue, // Add this line to get access to the setValue function
    formState: { errors },
  } = useForm();

  const { states } = useGetStates();
  const { cities, setStateSelected } = useGetCities();
  const { careers } = useGetCareers();

  // Get values from localStorage
  const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
  const storedFirstname = storedUserData.firstname || '';
  const storedLastname = storedUserData.lastname || '';
  const storedEmail = storedUserData.email || '';

  // Set default values for firstname and lastname
  useEffect(() => {
    if (storedFirstname) {
      setValue('firstname', storedFirstname);
    }
    if (storedLastname) {
      setValue('lastname', storedLastname);
    }
    if (storedEmail) {
      setValue('email', storedEmail);
    }
  }, [storedFirstname, storedLastname, storedEmail, setValue]);

  console.log(storedFirstname, storedLastname, storedEmail)

  const onSubmit = async (data) => {
    try {
      const result = await registerStudentUser({
        variables: {
          gender: data.gender,
          birth_date: data.dateOfBirth,
          phone: data.phone,
          cities_id: data.city,
          file_number: data.numberSumary,
          careers_id: data.career,
          shared: true,
          username: data.username,
          bio: "Información de biografía aquí",
          created_with_sn: true,
          user_status: true,
          user_categories_id: 2,
          avatar: "URL_del_avatar_aquí",
          lastname: data.lastname,
          firstname: data.firstname,
          email: data.email,
        },
      });

      console.log("Mutation result:", result);
    } catch (mutationError) {
      console.error("Error al realizar la mutación:", mutationError);
    }
  };

  return (
    <Box my={8} textAlign="left">
      <Heading p={4} textAlign={"center"} my={8}>
        Completa tus datos antes de continuar
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction={["column", "column", "row", "row", "row"]}>
          <FormControl m={2} isInvalid={errors.numberSumary}>
            <FormLabel>Ingresá tu legajo</FormLabel>
            <Input
              id="numberSumary"
              type="text"
              placeholder="Legajo"
              {...register("numberSumary", validateNumberSumary)}
            />
            <FormErrorMessage>
              {errors.numberSumary && errors.numberSumary.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl m={2} isInvalid={errors.username}>
            <FormLabel>Ingresá tu nombre de usuario</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              {...register("username", validateUsername)}
              w={["200px", "300px", "300px", "300px", "300px"]}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex direction={["column", "column", "row", "row", "row"]}>
          <FormControl m={2} isInvalid={errors.lastname}>
              <FormLabel>Ingresá tu apellido</FormLabel>
              <Input
                id="lastname"
                type="text"
                placeholder="Apellido"
                {...register("lastname", validateLastname)}
              />
              <FormErrorMessage>
                {errors.lastname && errors.lastname.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl m={2} isInvalid={errors.firstname}>
              <FormLabel>Ingresá tu nombre</FormLabel>
              <Input
                id="firstname"
                type="text"
                placeholder="Nombre"
                {...register("firstname", validateFirstname)}
              />
              <FormErrorMessage>
                {errors.firstname && errors.firstname.message}
              </FormErrorMessage>
            </FormControl>
        </Flex>

        <Flex direction={["column", "column", "row", "row", "row"]}>
          <FormControl m={2} isInvalid={errors.gender}>
            <FormLabel>Selecciona tu genero</FormLabel>
            <Select
              name="gender"
              placeholder="Selecciona..."
              {...register("gender", validateGender)}
              _focus={{ background: "none" }}
            >
              <option value="Male">Masculino</option>
              <option value="Female">Femenino</option>
              <option value="Other">Otro</option>
            </Select>
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl m={2} isInvalid={errors.dateOfBirth}>
            <FormLabel>Ingresá tu fecha de nacimiento</FormLabel>
            <Input
              id="dateOfBirth"
              type="date"
              placeholder="Fecha de nacimiento"
              w={"200px"}
              {...register("dateOfBirth", validateDateOfBirth)}
            />
            <FormErrorMessage>
              {errors.dateOfBirth && errors.dateOfBirth.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex direction={["column", "column", "row", "row", "row"]}>
          <FormControl m={2} isInvalid={errors.phone}>
            <FormLabel>Ingresá tu número de celular</FormLabel>
            <Input
              id="phone"
              type="text"
              placeholder="Celular"
              w={"200px"}
              {...register("phone", validatePhone)}
            />
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl m={2} isInvalid={errors.career}>
            <FormLabel>Selecciona tu Carrera</FormLabel>
            <Select
              name="career"
              placeholder="Selecciona..."
              {...register("career", validatecareer)}
              width={["100%", "100%", "49%", "49%", "49%"]}
              _focus={{ background: "none" }}
            >
              {careers?.map((career) => {
                return (
                  <option key={career.id} value={career.id}>
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
                  <option value={state.id} key={state.id}>
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
                  <option value={city.id} key={city.id}>
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
        <Center m={8}>
          <CustomButton
            handleClick={handleSubmit(onSubmit)}
            type="submit"
            // isLoading={loading}
            loadingText="Registrando"
            width="40%"
            textButton="Guardar"
          />
        </Center>
      </form>
    </Box>
  );
}
