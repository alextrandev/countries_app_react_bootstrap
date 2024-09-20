import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) {
      alert("Email is required");
      return;
    } else if (!password) {
      alert("Password is required");
      return;
    }
    loginWithEmailAndPassword(email, password);
  }

  return (
    <div className="d-inline-flex flex-column gap-2 p-3">
      <p>{user && `Hello user ${user.email}`}</p>
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
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button onClick={() => navigate("/register")}>Don't have an account? Register here</Button>
    </div>
  )
}
