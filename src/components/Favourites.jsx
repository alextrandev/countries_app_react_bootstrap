import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { clearFavourites, getFavouritesFromSource } from "../store/favouritesSlice";
import CountryCard from "./CountryCard";

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
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
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
      <Row className="g-3">
        <Col className="mt-4 d-flex justify-content-center">
          <Button onClick={() => dispatch(clearFavourites())}>Clear favourites</Button>
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
