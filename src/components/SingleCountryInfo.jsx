import { Card, CardGroup, ListGroup } from "react-bootstrap";

export default function SingleCountryInfo({ country }) {
  // some data processing and string manipulation
  const countryName = country.name.common;
  const countryCurrencies = Object.values(country.currencies || {})
    .map(currency => ` ${currency.name} (${currency.symbol})`)
    .join(", ");
  const countryLanguages = Object.keys(country.languages || {}).join(", ");
  const phonePrefixes = country.idd.suffixes
    .map((suffix) => country.idd.root + suffix)
    .join(", ");

  // turn boolean in to yes or no string
  const yesNo = (bool) => bool ? "Yes" : "No";

  return (
    <CardGroup style={{ width: '77%' }} className="p-0 shadow">
      <Card bg="light">
        <Card.Body>
          <Card.Title>Infos about {countryName}</Card.Title>
          <a href={`https://en.wikipedia.org/wiki/${countryName}`} className="text-black">
            Read more about {countryName} on Wikipedia &gt;
          </a>
        </Card.Body>
        <ListGroup variant="flush">
          <ListItem title={"Capital"} value={country.capital.join(", ")} />
          <ListItem title={"Region"} value={country.region} />
          <ListItem title={"Subregion"} value={country.subregion} />
          <ListItem title={"Continents"} value={country.continents} />
          <ListItem title={"Area"} value={country.area} />
          <ListItem title={"Population"} value={country.population} />
          <ListItem title={"Member of the UN"} value={yesNo(country.unMember)} />
          <ListItem title={"Languages"} value={countryLanguages} />
          <ListItem title={"Currencies"} value={countryCurrencies} />
        </ListGroup>
      </Card>
      <Card className="bg-light">
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListItem title={"Country code"} value={country.cca3} />
          <ListItem title={"Fifa code"} value={country.fifa} />
          <ListItem title={"Phone prefix"} value={phonePrefixes} />
          <ListItem title={"Independent"} value={yesNo(country.independent)} />
          <ListItem title={"Land locked"} value={yesNo(country.landlocked)} />
          <ListItem title={"Timezone"} value={country.timezones[0]} />
          <ListItem title={"Start of week"} value={country.startOfWeek} />
          <ListItem title={"Car signs"} value={country.car.signs.join(", ")} />
          <ListItem title={"Car side"} value={country.car.side} />
        </ListGroup>
      </Card>
    </CardGroup>
  )
}

function ListItem({ title, value }) {
  return (
    <ListGroup.Item className="bg-light d-flex justify-content-between">
      <span>{title}</span>
      <span>{value}</span>
    </ListGroup.Item>
  )
}