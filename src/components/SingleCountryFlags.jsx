import { Card, CardGroup, Row } from "react-bootstrap";

export default function SingleCountryFlags({ country }) {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src={country.flags.svg} />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Img variant="top" src={country.flags.svg} />
        <Card.Body>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  )
}
