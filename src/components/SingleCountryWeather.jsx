import { Card, ListGroup } from "react-bootstrap";
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
    <Card style={{ width: '20%' }} className="shadow p-0" bg="light">
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
        <ListItem icon="thermometer-half" text="Temperature" stat={`${roundTemp(weather.main.temp)}°C`} />
        {/* feel like */}
        <ListItem icon="emoji-smile" text="Feel like" stat={`${roundTemp(weather.main.feels_like)}°C`} />
        {/* temp high */}
        <ListItem icon="thermometer-sun" text="High" stat={`${roundTemp(weather.main.temp_max)}°C`} />
        {/* temp low */}
        <ListItem icon="thermometer-snow" text="Low" stat={`${roundTemp(weather.main.temp_min)}°C`} />
        {/* humidity */}
        <ListItem icon="moisture" text="Humidity" stat={weather.main.humidity} />
      </ListGroup>
    </Card>
  )
}

function ListItem({ icon, text, stat }) {
  return (
    <ListGroup.Item className="bg-light d-flex justify-content-between">
      <div className="d-flex gap-2">
        <i className={`bi bi-${icon} ml-2`} />
        <p className="p-0 m-0">{text}:</p>
      </div>
      <p className="p-0 m-0">{stat}</p>
    </ListGroup.Item>
  )
}
