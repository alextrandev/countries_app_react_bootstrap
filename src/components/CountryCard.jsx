import { ListGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { addFavourite, removeFavourites } from "../store/favouritesSlice";
import { useDispatch } from "react-redux";

export default function CountryCard({ country }) {
  const dispatch = useDispatch();

  return (
    <Card className="h-100">
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
  )
}
