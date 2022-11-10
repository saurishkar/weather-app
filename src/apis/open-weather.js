import axios from "axios";

const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const GEO_API_BASE_URL = "https://api.openweathermap.org/geo/1.0/";
const API_KEY = process.env.REACT_APP_WEATHERSTACK_ACCESS_KEY;

export const getWeatherDataFromCoord = ({ lat, long }) => {
  return axios
    .get(`${WEATHER_API_BASE_URL}/daily?lat=${lat}&lon=${long}&cnt=7&units=metric&appid=${API_KEY}`)
    .then((response) => {
      return response.data;
    });
};

export const getCoordFromCity = (city) => {
  return axios
    .get(`${GEO_API_BASE_URL}/direct?q=${city}&limit=2&appid=${API_KEY}`)
    .then((response) => {
      return response.data;
    });
};
