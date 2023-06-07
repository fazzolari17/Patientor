import { Box } from '@material-ui/core';
import React from 'react';
import { IndividualHourlyForecast } from '../../types/weather';

interface Props {
  hourlyWeather: IndividualHourlyForecast;
}
const HourlyWeather = ({ hourlyWeather }: Props) => {
  const {
    clouds: { all },
    dt,
    dt_txt,
    main: {
      temp,
      feels_like,
      grnd_level,
      humidity,
      pressure,
      temp_kf,
      temp_max,
      temp_min,
    },
    pop,
    sys: { pod },
    weather: [{ id, main, description, icon }],
    wind: { speed, deg, gust },
  } = hourlyWeather;
  console.log(
    all,
    dt,
    dt_txt,
    temp,
    feels_like,
    grnd_level,
    humidity,
    pressure,
    temp_kf,
    temp_max,
    temp_min,
    pop,
    pod,
    id,
    main,
    description,
    icon,
    speed,
    deg,
    gust
  );

  const time = (forecastTime: number) => {
    const time = new Date(forecastTime * 1000)
      .toISOString()
      .slice(11)
      .substring(0, 5);

    switch (time) {
      case '00:00':
        return '12 AM';
      case '03:00':
        return '3 AM';
      case '06:00':
        return '6 AM';
      case '09:00':
        return '9 AM';
      case '12:00':
        return '12 PM';
      case '15:00':
        return '3 PM';
      case '18:00':
        return '6 PM';
      case '21:00':
        return '9 PM';
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem 0 1rem',
        width: '100%',
        height: 'fit-content',
      }}
    >
      {/* Time / Temp */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '8%',
        }}
      >
        <>{time(dt)}</>
        <span style={{ marginLeft: '1rem', fontWeight: '600' }}>
          {temp.toFixed()}°
        </span>
      </div>
      {/* Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '65%',
        }}
      >
        <img
          style={{ width: '40px', height: '40px' }}
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
        <>{description}</>
      </div>
      {/* Wind Direction and Speed */}
      <div
        style={{
          width: '7%',
        }}
      >
        {`${speed.toFixed()} MPH `}
        {/* {windDirection(deg)} */}
        {/* {gust} */}
      </div>
    </Box>
  );
};

export default HourlyWeather;
