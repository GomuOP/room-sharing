
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB2euHKmoL3Zdkjo7TdzYAVxCPO0WJrWA4",
    authDomain: "r-sharing.firebaseapp.com",
    projectId: "r-sharing",
    storageBucket: "r-sharing.appspot.com",
    messagingSenderId: "1036665690399",
    appId: "1:1036665690399:web:f2558e407f88e35f9a382a",
    measurementId: "G-B48FBW41V8"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); 
export const googleProvider=new GoogleAuthProvider();
export const db = getFirestore(app);