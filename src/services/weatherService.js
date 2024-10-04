import axios from "axios";

export const fetchWeatherInfo = (country, setWeather, setWeatherLoading) => {
const api = `https://api.openweathermap.org/data/2.5/weather?`
  // pass the latitude and longtitude of the capital
  + `lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}`
  // pass other parameters and api key
  + `&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  axios
    .get(api)
    .catch(error => console.log(error))
    .then(res => setWeather(res.data))
    .finally(() => setWeatherLoading(false))
}
