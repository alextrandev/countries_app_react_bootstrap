import { Card, CardGroup } from "react-bootstrap";

export default function SingleCountryFlags({ country }) {
  return (
    <CardGroup className="d-flex justify-content-center bg-light shadow text-center">
      {/* Flag and description */}
      <Card style={{ maxWidth: "75%" }} bg="light" className="p-2">
        <Card.Img
          variant="top"
          src={country.flags.svg}
          style={{ maxHeight: '400px', width: 'auto', objectFit: 'contain' }}
        />
        <Card.Body>
          <Card.Text>
            {country.flags.alt || `Flag of ${country.name.official}`}
          </Card.Text>
        </Card.Body>
      </Card>
      {/* Coat of arms image and desciption. Some countries dont have coat of arms */}
      {country.coatOfArms.svg &&
        <Card className="p-3" bg="light">
          <Card.Img
            variant="top"
            src={country.coatOfArms.svg}
            style={{ maxHeight: '400px', width: 'auto', objectFit: 'contain' }}
          />
          <Card.Body>
            <Card.Text>
              {country.coatOfArms.alt || `Coat of Arms of ${country.name.official}`}
            </Card.Text>
          </Card.Body>
        </Card>
      }
    </CardGroup>
  )
}
