import React from 'react';

// Material ui
import Box from '@mui/material/Box';

// Types
import {
  IndividualDailyForecastWeather,
  IndividualHourlyForecast,
} from '../../types/weather';

// Components / Views
import HourlyWeather from './HourlyWeather';

interface Props {
  hourlyForecast: IndividualHourlyForecast[];
  day: IndividualDailyForecastWeather;
  handleClick: () => void;
  cardWidth: string;
  isOpen: boolean;
}

const ForecastCard = ({
  day,
  handleClick,
  cardWidth,
  isOpen,
  hourlyForecast,
}: Props) => {
  const renderHourlyForecast = hourlyForecast.map((data) => (
    <HourlyWeather key={data.dt} hourlyWeather={data} />
  ));

  return (
    <>
      {isOpen ? (
        <Box
          sx={{
            border: '1px solid #000',
            borderRadius: '5px',
            width: cardWidth,
            height: 'fit-content',
            margin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'width 3.5s ease-in-out',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <p
            style={{
              width: '100%',
              marginLeft: '2rem',
              justifyContent: 'flex-start',
              fontWeight: '600',
            }}
          >
            {`${day.day} ${day.dt_txt.slice(5).substring(3, 5)}`}
          </p>
          {renderHourlyForecast}
        </Box>
      ) : (
        <Box
          sx={{
            border: '1px solid #000',
            borderRadius: '5px',
            width: cardWidth,
            height: '350px',
            margin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transition: 'width 3.5s ease-in-out',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <p
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              fontWeight: '600',
            }}
          >
            {`${day.day} ${day.dt_txt.slice(5).substring(3, 5)}`}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
            alt="weather icon"
          />
          <p>{`${day.main.temp_min}° / ${day.main.temp_max}°`}</p>
          <p>
            {`Humidity
              ${day.main.humidity}%`}
          </p>
        </Box>
      )}
    </>
  );
};

export default ForecastCard;
