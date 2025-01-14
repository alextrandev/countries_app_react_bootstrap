import { useAuthState } from "react-firebase-hooks/auth";
import { anonymousLogin, auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useEffect, useState } from "react";
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Form, FormGroup } from "./Form";
import { toast } from "react-toastify";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  // redirect when logged in
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
    <Container className="p-5 d-flex flex-column align-items-center" >
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
            className="px-4"
          >
            Login
          </Button>
          <Button variant="secondary" onClick={() => navigate("/register")}>Don't have an account? Register here</Button>
        </div>
        <p className="text-center">Or</p>
        <div className="form-group d-flex w-100">
          <Button
            variant="primary"
            onClick={anonymousLogin}
            className="w-100"
          >
            Login as anonymous user!
          </Button>
        </div>
      </Form >
    </Container>
  )
}
