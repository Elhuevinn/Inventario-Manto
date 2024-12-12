import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQbIPpTUa-8awX021ltaXJqqsZSqia5FM",
  authDomain: "inventario-manto-a648e.firebaseapp.com",
  projectId: "inventario-manto-a648e",
  storageBucket: "inventario-manto-a648e.firebasestorage.app",
  messagingSenderId: "306722298300",
  appId: "1:306722298300:web:14f9713f90520fcd39f3b9",
  measurementId: "G-JTLXTQM3FV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db  };