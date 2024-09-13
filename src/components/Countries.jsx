import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { search } from "../store/countriesSlice";

export default function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);

  console.log(searchInput);
  // console.log(countries);

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch]);

  // loading screen
  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        />
      </Col>
    )
  }

  return (
    <Container fluid>
      <Row className="gap-5 m-1">
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={e => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
        {countries.map(country => (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={country.flags.svg} />
            <Card.Body>
              <Card.Title>{country.name.common}</Card.Title>
              <Card.Text>{country.name.official}</Card.Text>
              <Button variant="primary">Read more {country.flag}</Button>
            </Card.Body>
          </Card>
        ))
        }
      </Row>
    </Container>
  )
}
