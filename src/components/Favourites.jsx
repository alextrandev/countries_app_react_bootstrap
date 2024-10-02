import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Button, Col, Container, Row, Spinner, Form } from "react-bootstrap";
import { clearFavourites, getFavouritesFromSource } from "../store/favouritesSlice";
import SingleCountry from "./SingleCountry";

export default function Favourites() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector((state) => state.favourites.isLoading);
  const countriesLoading = useSelector((state) => state.countries.isLoading);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    countriesList = countriesList.filter((country) =>
      favouritesList.includes(country.cca3)
    );
  } else {
    countriesList = [];
  }

  // console.log(countriesList);

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
      <Row xs={2} md={3} lg={4} className="g-3">
        <Button onClick={() => dispatch(clearFavourites())}>Clear favourites</Button>
      </Row>
      <Row xs={2} md={3} lg={4} className="g-3">
        {countriesList
          // .filter((country) => {
          //   return country.name.official
          //     .toLowerCase()
          //     .includes(search.toLowerCase());
          // })
          .map((country) => (
            <SingleCountry key={country.name.common} country={country} />
          ))
        }
      </Row>
    </Container >
  )
}
