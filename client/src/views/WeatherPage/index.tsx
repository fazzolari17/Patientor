import React from 'react';

// Components / Views
import SearchBar from './SearchBar';
import WeatherDetails from './WeatherDetails';

// Redux / State
import { useSelector } from 'react-redux';

// Types
import { RootState } from '../../store';

const WeatherPage = () => {
  const { weather } = useSelector((state: RootState) => state);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <SearchBar />
      </div>
      <WeatherDetails forecast={weather.dailyForecast} />
      <h1>This is the weather Page.</h1>
    </>
  );
};

export default WeatherPage;
