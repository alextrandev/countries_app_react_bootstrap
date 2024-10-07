import { useAuthState } from "react-firebase-hooks/auth";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getFavouritesFromSource } from "../store/favouritesSlice";
import { Form, FormGroup } from "./Form";
import { toast } from "react-toastify";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/favourites");
    }
  }, [user, navigate]);

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
  };

  return (
    <Container fluid className="p-5">
      <Header title="Login" />
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
