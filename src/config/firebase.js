
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuGTat1Fgy70ZPldXylXZEbJUo1084rHw",
  authDomain: "todo-3a683.firebaseapp.com",
  projectId: "todo-3a683",
  storageBucket: "todo-3a683.appspot.com",
  messagingSenderId: "8968899086",
  appId: "1:8968899086:web:9a90710bc1221c251b0a5f",
  measurementId: "G-JW1SK7T2Z2"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); 
export const googleProvider=new GoogleAuthProvider();
export const db = getFirestore(app);