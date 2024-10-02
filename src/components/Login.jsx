import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { redirect, useNavigate } from "react-router-dom";
import { getFavouritesFromSource } from "../store/favouritesSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  if (user) {
    navigate("/favourites")
  }

  const handleLogin = () => {
    if (!email) {
      alert("Email is required");
      return;
    } else if (!password) {
      alert("Password is required");
      return;
    }
    loginWithEmailAndPassword(email, password)
      // redirect user to favourites page after logged in
      .then(() => getFavouritesFromSource())
      .then(() => navigate("/favourites"));
  }

  return (
    <Container fluid>
      <Row className="m-1">
        <Col className="mt-5 d-flex justify-content-center">
          <h1>Login</h1>
        </Col>
      </Row>
      <form className="p-5 pt-0">
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
    </Container>
  )
}
