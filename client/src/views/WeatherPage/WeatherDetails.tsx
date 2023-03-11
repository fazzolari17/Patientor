import React from 'react';

// Components / Views
import ForecastCard from './ForecastCard';

// Types
import { DailyForecast } from './ForecastCard';

// Utils
import { v4 as uuid } from 'uuid';

interface Props {
  forecast: DailyForecast[];
}

const WeatherDetails = ({ forecast }: Props) => {
  const setDataFromLocalStorageIfAvailable = () => {
    const forecastLocalStorage = localStorage.getItem('dailyForecast');

    if (forecastLocalStorage) {
      forecast = JSON.parse(forecastLocalStorage);
    }
  };

  void setDataFromLocalStorageIfAvailable();

  const renderForecast = forecast.map((day) => (
    <ForecastCard key={uuid()} day={day} />
  ));

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {renderForecast}
      </div>
    </>
  );
};

export default WeatherDetails;
