// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv0m8GINFjvOoKmwwY114Ts0Y8CJaRDpo",
  authDomain: "segundo-hogar.firebaseapp.com",
  projectId: "segundo-hogar",
  storageBucket: "segundo-hogar.appspot.com",
  messagingSenderId: "376581983274",
  appId: "1:376581983274:web:961f61cfdd445b389f0753",
  measurementId: "G-3C0SMXX46S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);