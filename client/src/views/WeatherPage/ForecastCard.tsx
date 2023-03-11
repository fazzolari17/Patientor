import React from 'react';

import Box from '@mui/material/Box';

export interface DailyForecast {
  day: string;
  dt_txt: string;
  key: number;
  main: {
    temp_min: string;
    temp_max: string;
    humidity: string;
  };
  weather: [
    {
      id: number;
      icon: string;
      description: string;
      main: string;
    }
  ];
}

interface Props {
  day: DailyForecast;
}
const ForecastCard = ({ day }: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid #000',
        borderRadius: '5px',
        width: '200px',
        height: '350px',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <p style={{ textAlign: 'center', justifyContent: 'center' }}>
        {`${day.day}`}
      </p>
      <img
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>{`${day.main.temp_min}° / ${day.main.temp_max}°`}</p>
      <p>
        {`Humidity
        ${day.main.humidity}%`}
      </p>
    </Box>
  );
};

export default ForecastCard;
