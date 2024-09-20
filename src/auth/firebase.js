import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countries-app-react-bootstrap.firebaseapp.com",
  projectId: "countries-app-react-bootstrap",
  storageBucket: "countries-app-react-bootstrap.appspot.com",
  messagingSenderId: "1033920134001",
  appId: "1:1033920134001:web:43eab6f4e1d283bff754d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch (error) {
    console.log(error);
    alert(error.message);
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // use firebase db
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        // shorthand for `name: name,`
        name,
        authProvider: "local",
        email,
    })
  }
  catch (error) {
    console.log(error);
    alert(error.message);
  }
}

const logout = () => {
  signOut(auth);
}

export {
  auth, 
  db, 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword,
  logout
};