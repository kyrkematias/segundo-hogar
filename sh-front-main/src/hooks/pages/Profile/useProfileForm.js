import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useGetUser } from "hooks/pages/Profile/useGetUser";
import {
  UPDATE_GENDER,
  UPDATE_BIO,
  UPDATE_STUDENT_BY_USER_ID,
  UPDATE_STATES,
} from "client/gql/mutations/updateProfileInfo/updateProfileInfo";
import { useToast } from "@chakra-ui/react";
import { useGetCareers } from "hooks/utils/useGetCareers";
import { useGetStates } from "hooks/utils/useGetStates";
import { useGetCities } from "hooks/utils/useGetCities";

export function useProfileForm() {
  const { user } = useGetUser();
  const { careers } = useGetCareers();
  const { cities, setStateSelected } = useGetCities();
  const { states } = useGetStates();

  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [updateGender] = useMutation(UPDATE_GENDER);
  const [updateBio] = useMutation(UPDATE_BIO);
  const [updateStudentByUserId] = useMutation(UPDATE_STUDENT_BY_USER_ID);
  const [updateState] = useMutation(UPDATE_STATES);
  console.log("id usuario en el hook: ", user);
  // console.log("carrera: ", user?.person.students[0].career.name);

  const onSubmit = async (data) => {
    console.log("data del form: ", data);
    // console.log("shared desde el form: ", data.share);
    console.log("provincia del form: ", data.state);
    console.log("ciudad del form: ", data.city)
    try {
      await updateGender({
        variables: {
          userId: user.id,
          newGender: data.gender || user?.person.gender,
        },
      });

      await updateBio({
        variables: {
          userId: user.id,
          newBio: data.bio || user.bio,
        },
      });

      await updateStudentByUserId({
        variables: {
          userId: user.id,
          newCareer: data.career || user.person.students[0].career.id,
          newCityId: data.city || user.person.students[0].city.id,
          newShared: data.share || user.person.students[0].shared,
        },
      });

      await updateState({
        variables: {
          userId: user.id,
          newState: data.state || user?.person.students?.[0]?.city.state_id,
        },
      });

      toast({
        title: "Datos actualizados.",
        description: "Los datos se han actualizado exitosamente.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      console.log("data del form: ", data);
      toast({
        title: "Error al actualizar datos.",
        description: "Algo salió mal. Por favor, intenta de nuevo.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      console.log("submit");
      console.log("id usuario: ", user.id);
    }
  };

  const onCancel = (e) => {
    e.preventDefault();
    console.log("Cancel");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    onCancel,
    errors,
    isSubmitting,
  };
}
