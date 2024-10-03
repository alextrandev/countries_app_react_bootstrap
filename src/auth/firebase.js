import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, deleteDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import { toast } from "react-toastify";

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
    await signInWithEmailAndPassword(auth, email, password);
    toast.success('Successfully logged in!');
  }
  catch (error) {
    // error handling block. show user a notification toast and end the function
    switch (error.code) {
      case "auth/invalid-email":
        toast.error("Invalid email");
        return;
      case "auth/invalid-credential":
        toast.error("Wrong username or password");
        return;
      default:
        toast.error("Something unexpected happened. Please try again!")
        console.log("Error", error.message);
        return;
    }
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    // use firebase db
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name, // shorthand for `name: name,`
        authProvider: "local",
        email,
    });
    toast('🌎 Welcome to countries app!');
  }
  catch (error) {
    console.log(error.code);
    // error handling and show toast notification
    switch (error.code) {
      case "auth/invalid-email":
        toast.error("Invalid email");
        return;
      case "auth/weak-password":
        toast.error("Password is too weak. Minimum 6 characters");
        return;
      case "auth/email-already-in-use":
        toast.error("Email already in use. Login or use another email");
        return;
      default:
        toast.error("Something went wrong. Please try again!");
        console.log("Error", error.message);
        return;
    }
  }
}

const logout = () => {
  signOut(auth);
  toast.success('Successfully logged out!');
}

const addFavouriteToFirebase = async (uid, name) => {
  try {
    // check if the country is already added to favourites
    const q = query(collection(db, `user/${uid}/favourites`), where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collection(db, `user/${uid}/favourites`), {name})
      toast.success('Country added to favourites');
    } else {
      toast.info('Country already in favourites');
    }
  }
  catch (error) {
    console.log("Error", error.message);
    toast.error('Cant add country to favourite, try again!');
  }
}

const removeFavouriteFormFirebase = async (uid, name) => {
  try {
    if (!name) {
      toast.error('Cant remove country from favourites, try again!');
      return;
    }
    const q = query(collection(db, `user/${uid}/favourites`), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    toast.info('Country removed from favourites');
  }
  catch (error) {
    console.log("Error", error.message);
    toast.error('Cant remove country from favourites, try again!');
  }
}

const clearFavouritesFromFireBase = async (uid) => {
  try {
    const q = query(collection(db, `user/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    toast.info('Removed all countries from favourites');
  }
  catch (error) {
    console.log(error);
    toast.error('Cant remove countries from favourites, try again!');
  }
}

export {
  auth, 
  db, 
  loginWithEmailAndPassword, 
  registerWithEmailAndPassword,
  logout,
  addFavouriteToFirebase,
  removeFavouriteFormFirebase,
  clearFavouritesFromFireBase,
};