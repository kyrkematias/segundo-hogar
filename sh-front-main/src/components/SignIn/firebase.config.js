import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDv0m8GINFjvOoKmwwY114Ts0Y8CJaRDpo",
  authDomain: "segundo-hogar.firebaseapp.com",
  projectId: "segundo-hogar",
  storageBucket: "segundo-hogar.appspot.com",
  messagingSenderId: "376581983274",
  appId: "1:376581983274:web:961f61cfdd445b389f0753",
  measurementId: "G-3C0SMXX46S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, GithubAuthProvider, signInWithPopup };
