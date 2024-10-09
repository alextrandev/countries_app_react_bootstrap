import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row } from "react-bootstrap";
import { search } from "../store/countriesSlice";
import CountryCard from "./CountryCard";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";
import Pagination from "./Pagination";
import { getFavouritesFromSource } from "../store/favouritesSlice";

export default function Countries() {
  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector(state => state.countries.search);
  const currentPagination = useSelector(state => state.countries.currentPagination);

  useEffect(() => {
    dispatch(getFavouritesFromSource());
  }, [dispatch])

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

  // filtering countries based on search
  const filteredCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  });

  // pagination math
  const COUNTRY_PER_PAGE = 15;
  // ceil here to ensure no float on the last pagination count
  const paginationCount = Math.ceil(countries.length / COUNTRY_PER_PAGE);
  const paginationStartingIndex = (currentPagination - 1) * COUNTRY_PER_PAGE;
  const paginationEndingIndex = paginationStartingIndex + COUNTRY_PER_PAGE;
  // below check is to disable pagination when searching
  let isDisabled, displayingCountries
  if (searchInput) {
    isDisabled = true;
    displayingCountries = filteredCountries;
  } else {
    displayingCountries = filteredCountries.slice(paginationStartingIndex, paginationEndingIndex);
    isDisabled = false;
  }

  if (countriesLoading || favouritesLoading) {
    return <LoadingScreen />
  }

  return (
    <Container fluid className="p-5">
      <Header title="View all countries" />
      {/* search bar */}
      <Row className="gap-5 m-1">
        <Col>
          <Pagination count={paginationCount} isDisabled={isDisabled} />
        </Col>
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
        {displayingCountries.map(country => (
          <CountryCard country={country} key={country.cca3} />
        ))}
      </Row>
    </Container>
  )
}
