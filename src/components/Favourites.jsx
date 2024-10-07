import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { clearFavourites, getFavouritesFromSource } from "../store/favouritesSlice";
import CountryCard from "./CountryCard";
import LoadingScreen from "./LoadingScreen";
import Header from "./Header";

export default function Favourites() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList
      // filter based on favourite countries list
      .filter((country) => favouritesList.includes(country.cca3))
      // search filter
      .filter((country) => {
        return country.name.official
          .toLowerCase()
          .includes(search.toLowerCase());
      })
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch])

  if (countriesLoading || favouritesLoading) {
    return <LoadingScreen />
  }

  return (
    <Container fluid>
      <Header title="Your favourite countries" />
      <Row className="mb-3">
        <Col className="d-flex justify-content-start">
          <Button variant="danger" onClick={() => dispatch(clearFavourites())}>Clear favourites</Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </Row>
    </Container >
  )
}
