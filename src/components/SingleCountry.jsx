import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function SingleCountry() {
  // const cca3 = useParams().cca3;
  const location = useLocation();
  const dispatch = useDispatch();
  const country = location.state.country;
  console.log(country);
  // const navigate = useNavigate();

  const [weather, setWeather] = useState({});
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        // base weather api url
        `https://api.openweathermap.org/data/2.5/weather?`
        // pass the latitude and longtitude of the capital
        + `lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}`
        // pass other parameters and api key
        + `&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      .catch(error => console.log(error))
      .then(res => {
        setWeather(res.data);
        setWeatherLoading(false);
      })
  }, [country.capital]);
  const utcDate = new Date(); // get current utc date time
  const localDate = new Date(utcDate.getTime() + weather.timezone * 1000);
  const dateTimeString = localDate.toLocaleString();
  const roundTemp = t => Math.round(t);
  const capitalized = s => s[0].toUpperCase() + s.slice(1);

  // need to handle error when user go to single page without visiting the countries page

  // loading screen
  if (weatherLoading) {
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
    <>
      <Card className="h-100">
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
        <Card.Body className="d-flex flex-column">
          <Card.Title>{weather.name}</Card.Title>
          <Card.Subtitle className="mb-5 text-muted">
            {dateTimeString}<br />
            {capitalized(weather.weather[0].description)}
          </Card.Subtitle>
          <ListGroup variant="flush" className="flex-grow-1 justify-content-center">
            {/* temperature */}
            <ListGroup.Item>
              <i className="bi bi-tree me-2"> Temperature: {roundTemp(weather.main.temp)}&deg;C</i>
            </ListGroup.Item>
            {/* feel like */}
            <ListGroup.Item>
              <i className="bi bi-geo me-2"> Feel like: {roundTemp(weather.main.feels_like)}&deg;C</i>
            </ListGroup.Item>
            {/* temp high */}
            <ListGroup.Item>
              <i className="bi bi-people me-2"> High: {roundTemp(weather.main.temp_max)}&deg;C</i>
            </ListGroup.Item>
            {/* temp low */}
            <ListGroup.Item>
              <i className="bi bi-people me-2"> Low: {roundTemp(weather.main.temp_min)}&deg;C</i>
            </ListGroup.Item>
            {/* temp low */}
            <ListGroup.Item>
              <i className="bi bi-people me-2"> Humidity: {weather.main.humidity}</i>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )
}
