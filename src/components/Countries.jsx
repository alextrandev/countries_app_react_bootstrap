import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { search } from "../store/countriesSlice";
import { Link } from "react-router-dom";

export default function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);

  console.log(countries);

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
      {/* search bar */}
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
      </Row>
      {/* country cards */}
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries.map(country => (
          <Card className="h-100" key={country.cca3}>
            <Link className="link-underline link-underline-opacity-0">
              <Card.Img
                variant="top"
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="rounded h-50"
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px"
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">{country.name.official}</Card.Subtitle>
                <Button variant="primary">Read more {country.flag}</Button>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </Row>
    </Container >
  )
}
