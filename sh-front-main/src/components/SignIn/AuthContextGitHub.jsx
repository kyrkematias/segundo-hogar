// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
// import { createContext, useContext } from 'react';
// import { useState, useEffect } from 'react';
// import { auth } from "./firebase.config";

// const firebaseConfig = {
//   apiKey: 'AIzaSyDv0m8GINFjvOoKmwwY114Ts0Y8CJaRDpo',
//   authDomain: 'segundo-hogar.firebaseapp.com',
//   projectId: 'segundo-hogar',
// };

// // Inicializa Firebase
// const app = initializeApp(firebaseConfig);

// export const authContext = createContext();

// export const useAuth = () => {
//   const context = useContext(authContext);
//   if (!context) {
//     console.log('Error creating auth context');
//   }
//   return context;
// };

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (!currentUser) {
//         setUser(null);
//         console.log('No user subscribed');
//       } else {
//         setUser(currentUser);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const loginWithGitHub = async () => {
//     const provider = new GithubAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user) {
//         // Puedes realizar acciones adicionales aquí si es necesario
//       }
//     } catch (error) {
//       console.error('Error al iniciar sesión con GitHub:', error);
//     }
//   };

//   return (
//     <authContext.Provider value={{ loginWithGitHub, user }}>
//       {children}
//     </authContext.Provider>
//   );
// }
