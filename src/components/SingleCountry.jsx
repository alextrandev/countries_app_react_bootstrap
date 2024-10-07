import { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { fetchWeatherInfo } from "../services/weatherService";
import Header from "./Header";

export default function SingleCountry(props) {
  const location = useLocation();
  const country = props.country ?? location.state.country;

  const [weather, setWeather] = useState({});
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    fetchWeatherInfo(country, setWeather, setWeatherLoading);
  }, [country.capital]);

  const utcDate = new Date(); // get current utc date time
  const localDate = new Date(utcDate.getTime() + weather.timezone * 1000);
  const dateTimeString = localDate.toLocaleString();
  const roundTemp = t => Math.round(t);
  const capitalized = s => s[0].toUpperCase() + s.slice(1);

  if (weatherLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container fluid className="p-5">
        <Header title={country.name.common} />
        <Row className="d-flex flex-column align-items-center">
          <Col className="mt-5 d-flex flex-column justify-content-center">
            <Card.Img
              variant="top"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="rounded h-50"
              style={{
                objectFit: "cover",
                minHeight: "200px",
                maxHeight: "50px",
                maxWidth: "200px"
              }}
            />
            <Card.Title>{weather.name}</Card.Title>
            <Card.Subtitle className="mb-5 text-muted">
              {dateTimeString}<br />
              {capitalized(weather.weather[0].description)}
            </Card.Subtitle>
          </Col>
          <Col>
            <ListGroup variant="flush" className="flex-grow-1 justify-content-center">
              {/* temperature */}
              <ListGroup.Item>
                <i className="bi bi-thermometer-half me-2 w-10"> Temperature: {roundTemp(weather.main.temp)}&deg;C</i>
              </ListGroup.Item>
              {/* feel like */}
              <ListGroup.Item>
                <i className="bi bi-emoji-smile me-2"> Feel like: {roundTemp(weather.main.feels_like)}&deg;C</i>
              </ListGroup.Item>
              {/* temp high */}
              <ListGroup.Item>
                <i className="bi bi-thermometer-sun me-2"> High: {roundTemp(weather.main.temp_max)}&deg;C</i>
              </ListGroup.Item>
              {/* temp low */}
              <ListGroup.Item>
                <i className="bi bi-thermometer-snow me-2"> Low: {roundTemp(weather.main.temp_min)}&deg;C</i>
              </ListGroup.Item>
              {/* temp low */}
              <ListGroup.Item>
                <i className="bi bi-moisture me-2"> Humidity: {weather.main.humidity}</i>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}
