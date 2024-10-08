import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { fetchWeatherInfo } from "../services/weatherService";


export default function SingleCountryWeather({ country }) {
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
    <Row className="d-flex flex-column align-items-center">
      <Card style={{ width: '15rem' }} className="shadow" bg="light">
        <Card.Img
          variant="top"
          style={{
            width: "150px",
            height: "150px",
            alignSelf: "center",
            scale: "120%"
          }}
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <Card.Body>
          <Card.Title>{weather.name}</Card.Title>
          <Card.Text>
            {dateTimeString}<br />
            {capitalized(weather.weather[0].description)}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush pb-4">
          {/* temperature */}
          <ListGroup.Item className="bg-light">
            <i className="bi bi-thermometer-half me-2 w-10"> Temperature: {roundTemp(weather.main.temp)}&deg;C</i>
          </ListGroup.Item>
          {/* feel like */}
          <ListGroup.Item className="bg-light">
            <i className="bi bi-emoji-smile me-2"> Feel like: {roundTemp(weather.main.feels_like)}&deg;C</i>
          </ListGroup.Item>
          {/* temp high */}
          <ListGroup.Item className="bg-light">
            <i className="bi bi-thermometer-sun me-2"> High: {roundTemp(weather.main.temp_max)}&deg;C</i>
          </ListGroup.Item>
          {/* temp low */}
          <ListGroup.Item className="bg-light">
            <i className="bi bi-thermometer-snow me-2"> Low: {roundTemp(weather.main.temp_min)}&deg;C</i>
          </ListGroup.Item>
          {/* temp low */}
          <ListGroup.Item className="bg-light">
            <i className="bi bi-moisture me-2"> Humidity: {weather.main.humidity}</i>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Row>
  )
}
