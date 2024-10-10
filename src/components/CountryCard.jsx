import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { addFavourite, removeFavourites } from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CountryCard({ country }) {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.favourites.favourites);
  const isFavourite = favourites.includes(country.cca3);

  return (
    <Container className="mb-4">
      <Card className="h-100 p-0 shadow-sm" bg="light">
        <Link to={`/countries/${country.cca3}`} className="link-underline link-underline-opacity-0" state={{ country: country }}>
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
        <Card.Body>
          <Link to={`/countries/${country.cca3}`} className="link-underline link-underline-opacity-0" state={{ country: country }}>
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Subtitle className="text-muted">{country.name.official}</Card.Subtitle>
          </Link>
        </Card.Body>
        <Card.Footer className="p-0 overflow-hidden">
          {isFavourite
            ? <Button
              variant="warning"
              onClick={() => dispatch(removeFavourites(country.cca3))}
              className="m-0 w-100"
              style={{ borderRadius: "0" }}
            >
              <i className="bi bi-heartbreak me-2"></i>
              Remove from favorites
            </Button>
            : <Button
              variant="primary"
              onClick={() => dispatch(addFavourite(country.cca3))}
              className="m-0 w-100"
              style={{ borderRadius: "0" }}
            >
              <i className="bi bi-heart me-2"></i>
              Add to favorites {country.flag}
            </Button>
          }
        </Card.Footer>
      </Card>
    </Container>
  )
}
