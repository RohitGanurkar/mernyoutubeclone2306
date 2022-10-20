import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCcbUXKWEhqfiUuJwI1as8RFwTAZBoDTUc",
  authDomain: "clone-16f2b.firebaseapp.com",
  projectId: "clone-16f2b",
  storageBucket: "clone-16f2b.appspot.com",
  messagingSenderId: "744048299829",
  appId: "1:744048299829:web:a7955b925711879cf0867c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;