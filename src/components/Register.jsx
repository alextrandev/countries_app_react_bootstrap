import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // this hook handle auth state from firebase
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  if (user) {
    navigate("/favourites")
  }

  const handleRegister = () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  }

  // TODO: Add a check to see if user if logged in and navigate to countries

  return (
    <div className="d-inline-flex flex-column gap-2 p-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button
        onClick={handleRegister}
      >
        Register
      </Button>
    </div>
  )
}
