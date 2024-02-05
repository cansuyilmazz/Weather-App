import React, { useState } from "react";
import Container from "react-bootstrap/Container";

const Weather = () => {
  const [inputData, setInputData] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const apiKey = "6f16b0e2cdda58f2c1e3b286b9f53dee";

  const getResult = async (inputData) => {
    try {
      setWeatherData(null);
      let query = `${apiUrl}?q=${inputData}&units=metric&lang=tr&appid=${apiKey}`;
      await fetch(query)
        .then((response) => {
          if (!response.ok) {
            throw new Error("City is not found");
          }
          return response.json();
        })
        .then((weather) => setWeatherData(weather));
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getResult(inputData);
    }
  };
  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center p-5 text-center">
      {!weatherData ? (
        <div className="weather-details">
          <div className="title d-flex justify-content-around align-items-center p-4">
            <img
              src="./image/startsIcon.png"
              alt="startsIcon"
              className="start-weather-icon"
            />
            <h1 className="display-4 fw-bold ">Hava Durumu</h1>
          </div>
          <input
            type="text"
            placeholder="Şehir giriniz..."
            className="ps-3 p-1 m-3 ms-5 fst-italic text-dark"
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Şehir giriniz..."
            className="ps-3 p-1 m-3 fst-italic text-dark"
            onChange={(e) => setInputData(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div className="weather-details d-flex justify-content-around align-items-center">
            <div>
              <img
                src={getWeatherIconUrl(weatherData.weather[0].icon)}
                alt="Weather Icon"
                className="weather-icon"
              />
            </div>
            <div>
              <div className="p-4">
                <p className="fs-1 fw-bold text-dark">
                  {weatherData.name},
                  <span className="fs-5">{weatherData.sys.country}</span>
                </p>

                <p className="fs-2">
                  Sıcaklık: {Math.round(weatherData.main.temp)} ℃
                </p>
                <p className="fs-3">{weatherData.weather[0].description}</p>
                <p p className="fs-4">
                  {Math.round(weatherData.main.temp_min)}°C /
                  {Math.round(weatherData.main.temp_max)}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Weather;
