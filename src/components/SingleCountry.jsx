import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import AiTrivialsCard from "./AiTrivialsCard";
import SingleCountryFlags from "./SingleCountryFlags";
import SingleCountryWeather from "./SingleCountryWeather";

export default function SingleCountry(props) {
  const location = useLocation();
  const country = props.country ?? location.state.country;

  return (
    <>
      <Container fluid className="p-5 d-flex flex-column gap-5">
        <Container >
          <Header title={`${country.name.common} ${country.flag}`} />
          <Row className="text-center">
            <h4>{`Official name: ${country.name.official}`}</h4>
          </Row>
        </Container>
        <SingleCountryFlags country={country} />
        <AiTrivialsCard country={country} />
        <Row className="px-3">
          <SingleCountryWeather country={country} />
        </Row>
      </Container>
    </>
  )
}
