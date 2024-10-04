import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Form, Row } from "react-bootstrap";
import { search } from "../store/countriesSlice";
import CountryCard from "./CountryCard";
import LoadingScreen from "./LoadingScreen";

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
    return <LoadingScreen />
  }

  return (
    <Container fluid>
      {/* Header */}
      <Row className="gap-5 m-1">
        <Col className="mt-5 d-flex justify-content-center">
          <h1>View all Countries</h1>
        </Col>
      </Row>
      {/* search bar */}
      <Row className="gap-5 m-1">
        <Col className="mb-2 d-flex justify-content-end">
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
          <CountryCard country={country} key={country.cca3} />
        ))}
      </Row>
    </Container >
  )
}
