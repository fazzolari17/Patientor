import React from 'react';

// Components / Views
import ForecastCard from './ForecastCard';
import Error from '../../components/Error';

// Types
import { DailyForecast } from '../../types/weather';
import { HourlyWeatherForecast } from '../../types/weather';

interface Props {
  dailyForecast: DailyForecast;
  hourlyForecast: HourlyWeatherForecast;
}

const WeatherDetails = ({ dailyForecast, hourlyForecast }: Props) => {
  const [cardWidth, setCardWidth] = React.useState<string>('200px');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setCardWidth('200px');
    } else {
      setCardWidth('100%');
    }
  };
  // Returns Error if api has an issue with response need a more elegant solution for this problem This fixes the issue with the page not loading if the api doesn't return correct information
  if (!dailyForecast) {
    return (
      <Error
        message={
          'There is an error displaying this page please contact customer support and report'
        }
      />
    );
  }

  const renderForecast = dailyForecast.list.map((day) => {
    const filteredHourlyForecast = hourlyForecast.list.filter((item) => {
      const hourlyDay = new Date(item.dt * 1000).getUTCDay();
      if (hourlyDay === day.key) {
        return item;
      }
    });
    return (
      <ForecastCard
        hourlyForecast={filteredHourlyForecast}
        handleClick={handleClick}
        key={day.id}
        day={day}
        cardWidth={cardWidth}
        isOpen={isOpen}
      />
      // </Link>
    );
  });

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
