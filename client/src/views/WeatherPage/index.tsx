import React from 'react';

// Components / Views
import SearchBar from './SearchBar';
import WeatherDetails from './WeatherDetails';

// Redux / State
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchForecastRegardlessOfTimestamp } from '../../reducers/weatherReducer';

// Types
import { RootState } from '../../store';

// Utils
import { timeSinceLastWeatherUpdate } from '../../utils/utils';
import { DailyForecast, HourlyWeatherForecast } from '../../types/weather';

const WeatherPage = () => {
  const { weather, user } = useSelector((state: RootState) => state);
  const [dailyForecast, setDailyForecast] = React.useState<DailyForecast>(
    weather.dailyForecast
  );
  const [hourlyForecast, setHourlyForecast] =
    React.useState<HourlyWeatherForecast>(weather.hourlyForecast);
  const dispatch = useAppDispatch();

  if (!dailyForecast) {
    const dailyForecastLocalStorage = localStorage.getItem('dailyForecast');
    if (dailyForecastLocalStorage) {
      setDailyForecast(JSON.parse(dailyForecastLocalStorage));
    }
  }
  if (!hourlyForecast) {
    const hourlyForecastLocalStorage = localStorage.getItem('hourlyForecast');
    if (hourlyForecastLocalStorage) {
      setHourlyForecast(JSON.parse(hourlyForecastLocalStorage));
    }
  }

  React.useEffect(() => {
    const tenMinutes = 1000 * 60 * 10;
    if (timeSinceLastWeatherUpdate() > tenMinutes) {
      dispatch(
        fetchForecastRegardlessOfTimestamp(
          user.weatherLocationData.lat,
          user.weatherLocationData.lat
        )
      );
    }
    if (!dailyForecast) {
      const dailyForecastLocalStorage = localStorage.getItem('dailyForecast');
      if (dailyForecastLocalStorage) {
        setDailyForecast(JSON.parse(dailyForecastLocalStorage));
      }
    }
    setDailyForecast(weather.dailyForecast);

    if (!hourlyForecast) {
      const hourlyForecastLocalStorage = localStorage.getItem('hourlyForecast');
      if (hourlyForecastLocalStorage) {
        setHourlyForecast(JSON.parse(hourlyForecastLocalStorage));
      }
    }
    setHourlyForecast(weather.hourlyForecast);
  }, [
    dailyForecast,
    dispatch,
    hourlyForecast,
    user.weatherLocationData.lat,
    weather.dailyForecast,
    weather.hourlyForecast,
  ]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h2 style={{ justifySelf: 'flex-start' }}>{`5 Day Forecast: ${
          dailyForecast ? `${dailyForecast.city.name}, ` : ''
        } ${dailyForecast ? dailyForecast.city.state : ''}`}</h2>

        <SearchBar />
      </div>
      <WeatherDetails
        dailyForecast={dailyForecast}
        hourlyForecast={hourlyForecast}
      />
    </>
  );
};

export default WeatherPage;
