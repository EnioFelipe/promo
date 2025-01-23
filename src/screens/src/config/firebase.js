import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW2svjHGt4pFn68rKLcsqam-fbKHqG55c",
  authDomain: "satisfying-1bc35.firebaseapp.com",
  projectId: "satisfying-1bc35",
  storageBucket: "satisfying-1bc35.firebasestorage.app",
  messagingSenderId: "939365214977",
  appId: "1:939365214977:web:2806961d24910b595c0900"
};

const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);

export {app, auth_mod};
