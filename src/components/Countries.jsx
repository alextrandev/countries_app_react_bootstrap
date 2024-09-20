import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Form, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { search } from "../store/countriesSlice";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourites } from "../store/favouritesSlice";

export default function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);

  // console.log(countries[0]);

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch]);

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  });
  // console.log(filteredCountries); 
  // to do ... firgure out debound filter

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
            <Link to={country.cca3} className="link-underline link-underline-opacity-0" state={{ country: country }}>
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
            </Link>
            <Card.Body className="d-flex flex-column">
              <Link to={country.cca3} className="link-underline link-underline-opacity-0" state={{ country: country }}>
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">{country.name.official}</Card.Subtitle>
              </Link>
              {/* country infos */}
              <ListGroup variant="flush" className="flex-grow-1 justify-content-center">
                {/* area */}
                <ListGroup.Item>
                  <i className="bi bi-tree me-2"> {country.area.toLocaleString()} km2</i>
                </ListGroup.Item>
                {/* capital */}
                <ListGroup.Item>
                  <i className="bi bi-geo me-2"> Capital: {country.capital}</i>
                </ListGroup.Item>
                {/* population */}
                <ListGroup.Item>
                  <i className="bi bi-people me-2"> Population: {country.population.toLocaleString()}</i>
                </ListGroup.Item>
                {/* languages */}
                <ListGroup.Item>
                  <i className="bi bi-mic me-2">
                    {/* just a html space character (&nbsp;) */}
                    &nbsp;{Object.values(country.languages || {}).join(", ")}
                  </i>
                </ListGroup.Item>
                {/* currencies */}
                <ListGroup.Item>
                  <i className="bi bi-cash-coin me-2">
                    {Object.values(country.currencies || {})
                      .map(currency => ` ${currency.name} (${currency.symbol})`)
                      .join(", ")
                    }
                  </i>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="primary" onClick={() => dispatch(addFavourite(country.cca3))}>Add to favorites {country.flag}</Button>
              <Button variant="warning" onClick={() => dispatch(removeFavourites(country.cca3))}>Remove from favorites</Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container >
  )
}