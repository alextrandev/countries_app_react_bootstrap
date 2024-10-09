import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Form, Row } from "react-bootstrap";
import { search } from "../store/countriesSlice";
import CountryCard from "./CountryCard";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";

export default function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);
  const isLoading = useSelector(state => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);

  useEffect(() => {
    dispatch(initializeCountries())
  }, [dispatch]);

  // debounce function
  function debounce(func, timeout = 450) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  // debounced search function
  const debouncedSearch = useCallback(debounce((value) => {
    dispatch(search(value));
  }, 450), [dispatch]);

  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  });

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Container fluid className="p-5">
      <Header title="View all countries" />
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
              onChange={e => debouncedSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      {/* sountry cards */}
      <Row xs={1} md={3} lg={5}>
        {filteredCountries.map(country => (
          <CountryCard country={country} key={country.cca3} />
        ))}
      </Row>
    </Container>
  )
}
