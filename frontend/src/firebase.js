import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8qTCpxMBGwTKJ7g65egpXksX8O_MYKe8",
  authDomain: "fir-b386e.firebaseapp.com",
  projectId: "fir-b386e",
  storageBucket: "fir-b386e.appspot.com",
  messagingSenderId: "155898023840",
  appId: "1:155898023840:web:4ce674026d11a75afb5ec5",
  measurementId: "G-QCLTYECQV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;