import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useState } from "react";
import { Button } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

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
    <div>
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
    </div>
  )
}
