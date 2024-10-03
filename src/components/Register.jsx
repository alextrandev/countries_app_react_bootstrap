import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form, FormGroup } from "./Form";
import { toast } from "react-toastify";

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
    registerWithEmailAndPassword(name, email, password)
      .then(() => toast.success('🌎 Successfully registered. Welcome to countries app!'))
      .then(() => navigate("/favourites"));
  }

  // TODO: Add a check to see if user if logged in and navigate to countries

  return (

    <Container fluid>
      <Row className="m-1">
        <Col className="mt-5 d-flex justify-content-center">
          <h1>Register</h1>
        </Col>
      </Row>
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
          <Button onClick={handleRegister}>Register</Button>
        </div>
      </Form>
    </Container>
  )
}
