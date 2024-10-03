import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getFavouritesFromSource } from "../store/favouritesSlice";
import { Form, FormGroup } from "./Form";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  if (user) {
    navigate("/favourites")
  }

  const handleLogin = () => {
    // stop the function and give noti if any field is not filled
    if (!email) {
      toast.warn('Email is required');
      return;
    } else if (!password) {
      toast.warn('Password is required');
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
      <Form>
        <FormGroup name="Email address" id="email">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="form-control"
          />
        </FormGroup>
        <FormGroup name="Password" id="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
          />
        </FormGroup>
        <div className="form-group d-flex gap-3 py-3">
          <Button
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button variant="secondary" onClick={() => navigate("/register")}>Don't have an account? Register here</Button>
        </div>
      </Form >
    </Container>
  )
}
