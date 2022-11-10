import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import {
  getWeatherDataFromCoord,
  getCoordFromCity,
} from "../apis/open-weather";
import { useGeolocation } from "../hooks/useGeolocation";
import { Forecast } from "./Forecast";

const Weather = () => {
  const { geolocation } = useGeolocation();
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setGeolocationError = () =>
      setError("Device Geolocation access is disabled. Please enter city");
    if (typeof geolocation !== "object") {
      return;
    }
    geolocation.getCurrentPosition(
      (geoData) => {
        const { coords } = geoData;
        getWeatherDataFromCoord({
          lat: coords.latitude,
          long: coords.longitude,
        })
          .then((data) => {
            setCity(data.city.name);
            setWeatherData(data);
          })
          .catch((err) => {
            throw err;
          });
      },
      () => {
        setGeolocationError();
      }
    );
  }, [geolocation]);

  useEffect(() => {
    if (city) {
      setError();
    }
  }, [city]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!city.trim()) {
      setError("City should not be blank");
      return;
    }
    setLoading(true);
    try {
      const cityDetails = await getCoordFromCity(city);
      if (cityDetails.length === 0) {
        setError("Invalid city, please try again.");
      }
      const { lat, lon } = cityDetails[0];
      const data = await getWeatherDataFromCoord({ lat, long: lon });
      setWeatherData(data);
      setCity(data.city.name);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="container justify-content-center mb-5">
      <Form onSubmit={handleFormSubmit} className="w-75 m-auto mb-5">
        <InputGroup className="mb-1">
          <InputGroup.Text id="city-symbol">&#x1F50D;</InputGroup.Text>
          <Form.Control
            placeholder="Enter city"
            aria-label="Enter city"
            aria-describedby="city-symbol"
            onChange={handleCityChange}
            className="shadow-none"
            value={city}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Search"
            )}
          </Button>
        </InputGroup>
        <Form.Text className="text-danger text-left">{error}</Form.Text>
      </Form>

      <div className="forecast-list d-flex flex-wrap">
        {weatherData.list?.map((dailyForecast) => {
          return <Forecast data={dailyForecast} key={dailyForecast.dt} />;
        })}
      </div>
    </div>
  );
};

export default Weather;
