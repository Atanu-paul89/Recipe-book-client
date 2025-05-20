
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj6GMiG6VjoziUBllcspK-z3benJt6UHI",
  authDomain: "a10-recipe-book.firebaseapp.com",
  projectId: "a10-recipe-book",
  storageBucket: "a10-recipe-book.firebasestorage.app",
  messagingSenderId: "791039331428",
  appId: "1:791039331428:web:4a880709c0a62bf39aa371"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);