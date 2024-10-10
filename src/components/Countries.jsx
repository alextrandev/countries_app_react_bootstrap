import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import { search } from "../store/countriesSlice";
import CountryCard from "./CountryCard";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Pagination from "./Pagination";
import { getFavouritesFromSource } from "../store/favouritesSlice";
import { debounce } from "../functions/functions";
import { useLocation } from "react-router-dom";

export default function Countries() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hash = location.hash;

  const countries = useSelector(state => state.countries.countries);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);
  const currentPagination = useSelector(state => state.countries.currentPagination);

  // filter countries based on link hash (continent)
  let filteredCountries = countries;
  if (["#europe", "#asia", "#americas", "#africa", "#oceania", "#antarctic"].includes(hash)) {
    // simple country filter based on region field. slice the hash because it have a # at the start
    filteredCountries = countries.filter(country => country.region.toLowerCase() == hash.slice(1).toLowerCase())
  }

  useEffect(() => {
    dispatch(getFavouritesFromSource());
  }, [dispatch])

  // debounced search function
  const debouncedSearch = useCallback(debounce((value) => {
    dispatch(search(value));
  }, 450), [dispatch]);

  // filtering countries based on search
  const searchedFilteredCountries = filteredCountries.filter(country => {
    return country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  });

  // pagination math
  const COUNTRY_PER_PAGE = 15;
  // ceil here to ensure no float on the last pagination count
  const paginationCount = Math.ceil(searchedFilteredCountries.length / COUNTRY_PER_PAGE);
  const paginationStartingIndex = (currentPagination - 1) * COUNTRY_PER_PAGE;
  const paginationEndingIndex = paginationStartingIndex + COUNTRY_PER_PAGE;
  // below check is to disable pagination when searching
  const displayingCountries = searchedFilteredCountries.slice(paginationStartingIndex, paginationEndingIndex);

  if (countriesLoading || favouritesLoading) {
    return <LoadingScreen />
  }

  return (
    <Container fluid className="p-5">
      <Header title="View all countries" />
      <Card className="shadow">
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#all">
            <Nav.Item>
              <Nav.Link href="#all">All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#europe">Europe</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#asia">Asia</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#americas">Americas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#africa">Africa</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#oceania">Oceania</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#antarctic">Antarctic</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Row className="gap-5 m-1">
            {/* pagination bar */}
            <Col>
              <Pagination count={paginationCount} />
            </Col>
            {/* search bar */}
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
          {/* countriy cards container */}
          <Row xs={1} md={3} lg={5}>
            {displayingCountries.map(country => (
              <CountryCard country={country} key={country.cca3} />
            ))}
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <Pagination count={paginationCount} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}
