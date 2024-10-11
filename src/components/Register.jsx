import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, FormGroup } from "./Form";
import { toast } from "react-toastify";
import Header from "./Header";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // this hook handle auth state from firebase
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  // redirect on logged in
  useEffect(() => {
    if (user) {
      navigate("/favourites");
    }
  }, [user, navigate]);

  const handleRegister = () => {
    // stop the function and show a toast
    if (!name || !email || !password) {
      toast.warn('Please fill in all fields');
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  }

  return (
    <Container className="p-5 d-flex flex-column align-items-center" >
      <Header title="Register" />
      <Form >
        <FormGroup name="Full name" id="fullname">
          <input
            type="text"
            id="fullname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="form-control"
          />
        </FormGroup>
        <FormGroup name="E-mail" id="email">
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
          <Button className="w-100" onClick={handleRegister}>Register</Button>
        </div>
      </Form>
    </Container>
  )
}
