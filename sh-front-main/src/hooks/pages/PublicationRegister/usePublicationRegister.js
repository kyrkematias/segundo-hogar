import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { REGISTER_PUBLICATION } from 'client/gql/mutations/registerPublication/registerPublication';
import { paths } from "config/paths";
import useLocation from 'wouter/use-location';
import { useInitialPublications } from "hooks/pages/Search/useInitialPublications";
import { authSelector } from "store/slices/authSlice";
import { useSelector } from "react-redux";



// Define la acción para crear una nueva publicación
export const createPublicationAction = (data) => ({
  type: 'CREATE_PUBLICATION',
  payload: data,
});

// Función de hook para el formulario de registro de publicación
export function useRegisterPublicationForm() {
  const dispatch = useDispatch();

  // Importa la mutación de Apollo Client
  const [registerPublication, { loading }] = useMutation(REGISTER_PUBLICATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [_, setLocation] = useLocation();
  const { publications, isError, isFetching } = useInitialPublications();
  // const [errorsCaptcha, setErrorsCaptcha] = useState({ message: '' });
  // const [validCaptcha, setValidCaptcha] = useState(false);
  const { user } = useSelector(authSelector);
  const ownershipId = localStorage.getItem("ownershipId");
  const onSubmit = async (data) => {
    try {
      console.log("price:", data.price);
      console.log("contact_name:", data.contact_name);
      console.log("contact_phone:", data.contact_phone);
      console.log("contact_email:", data.contact_email);
      const result = await registerPublication({
        variables: {
          ownerships_id: ownershipId,
          is_furnished: data.isFurnished,
          title: data.title,
          description: data.description,
          price: data.price,
          contact_name: data.fullname,
          contact_phone: data.phone,
          contact_email: data.email, 
          publication_state: true,
        },
      });
      console.log(result);
      if (result.data && result.data.registerPublication) {
        dispatch(onSubmit(result.data.registerPublication));
        localStorage.removeItem(ownershipId);
        setLocation(`/cuenta/${user.id}`);
      } else {
        console.error("La mutación no devolvió datos válidos.");
        setLocation(`/cuenta/${user.id}`);
      }
    } catch (error) {
      console.error("Error al registrar la publicación:", error.message);
      setLocation(`/cuenta/${user.id}`);
    }
  };

  // function onChange(value) {
  //   value ? setValidCaptcha(true) : setValidCaptcha(false);
  // }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting: loading,
    // errorsCaptcha,
    onSubmit,
    // onChange,
  };
}
