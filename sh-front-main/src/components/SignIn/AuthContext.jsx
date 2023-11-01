import { auth } from "./firebase.config";
import { createContext, useContext } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("Error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState('')

  useEffect(() =>{
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser){
        setUser('')
        console.log('No user subscribed')
      } else {
        setUser(currentUser)
      }
    })
    return () => subscribed()
  }, [])

  const loginWithGoogle = async() => {
    const responseGoogle = new GoogleAuthProvider()
    return await signInWithPopup(auth, responseGoogle)
  }

  return (
    <authContext.Provider value={{ loginWithGoogle, user }}>
      {children}
    </authContext.Provider>
  );
}
