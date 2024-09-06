import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.isLoading);
  console.log(countries);

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch]);

  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner />
      </Col>
    )
  }

  return (
    <Container>
      <Row className="gap-5 m-1">
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
