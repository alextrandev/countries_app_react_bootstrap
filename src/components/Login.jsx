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
    <form className="p-5">
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="form-control"
        />
      </div>
      <div className="form-group d-flex gap-3 py-3">
        <Button
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button variant="secondary" onClick={() => navigate("/register")}>Don't have an account? Register here</Button>
      </div>
      <div className="form-group">
      </div>
    </form >
  )
}
