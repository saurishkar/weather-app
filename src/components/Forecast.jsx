import dayjs from "dayjs";
import Card from "react-bootstrap/Card";

export const Forecast = ({ data }) => {
  const { temp, dt, weather = [] } = data;
  const { max, min } = temp;
  const readableDateTime = dayjs.unix(dt).format("ddd, MMM D");
  const avgTemperature = Math.round((max + min) / 2);
  const { description, icon: weatherIcon } = weather[0];
  return (
    <Card
      className="mx-3 p-4 my-3 m-auto text-center"
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title>
          <h1>
            <span className="text-primary">{avgTemperature}</span>
            <span>
              <sup>&#8451;</sup>
            </span>
          </h1>
        </Card.Title>
        <Card.Subtitle className="text-muted">{readableDateTime}</Card.Subtitle>
        <Card.Text className="mt-5">
          <h6 className="weather-description text-bold">{description}</h6>
          <img src={`https://openweathermap.org/img/w/${weatherIcon}.png`} alt="weather icon" />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
