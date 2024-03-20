import { CompleteProfileForm } from 'components/CompleteRegister'
import React, {useEffect} from 'react'

export const CompleteRegisterFormView = () => {
  useEffect(() => {
    document.title = "Segundo Hogar - Completa tu perfil";
  }, []);
  return (
    <CompleteProfileForm />
  )
}
