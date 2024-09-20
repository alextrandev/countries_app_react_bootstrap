import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // this hook handle auth state from firebase
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
    }
    registerWithEmailAndPassword(name, email, password);
  }

  // TODO: Add a check to see if user if logged in and navigate to countries

  return (
    <div>
      form here
    </div>
  )
}
