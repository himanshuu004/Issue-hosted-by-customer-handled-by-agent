import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA218G5vWH0fMnsZeIJjrCuVXkDQUyi4No",
    authDomain: "new-demo-4f354.firebaseapp.com",
    projectId: "new-demo-4f354",
    storageBucket: "new-demo-4f354.firebasestorage.app",
    messagingSenderId: "537776859599",
    appId: "1:537776859599:web:4dda89ba5a191499444aba"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);





