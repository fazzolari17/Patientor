import {
  ForecastWeatherData,
  IndividualForecastData,
  findMostFrequent,
} from './utils';

const getDayOfWeek = (day: number): string => {
  switch (day) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tue';
    case 3:
      return 'Wed';
    case 4:
      return 'Thu';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return 'Missing';
  }
};

export const reduceForecastToDailyForecast = (
  forecast: ForecastWeatherData,
) => {
  interface ForecastObject {
    0: IndividualForecastData[];
    1: IndividualForecastData[];
    2: IndividualForecastData[];
    3: IndividualForecastData[];
    4: IndividualForecastData[];
    5: IndividualForecastData[];
    6: IndividualForecastData[];
  }

  let forecastObject: ForecastObject = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  const consolidateEachDayIntoArray = () => {
    forecast.list.forEach((item) => {
      const day = new Date(item.dt * 1000).getDay();

      forecastObject = {
        ...forecastObject,
        [day]: [...forecastObject[day as keyof typeof forecastObject], item],
      };
    });
  };

  const reduceEachKeyIntoSingleObject = () => {
    interface IndividualReducedForecast {
      dt: string;
      main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        weather: IndividualForecastData['weather'][0];
      };
    }

    interface ReducedForecastObject {
      0: IndividualReducedForecast | Record<string, never>;
      1: IndividualReducedForecast | Record<string, never>;
      2: IndividualReducedForecast | Record<string, never>;
      3: IndividualReducedForecast | Record<string, never>;
      4: IndividualReducedForecast | Record<string, never>;
      5: IndividualReducedForecast | Record<string, never>;
      6: IndividualReducedForecast | Record<string, never>;
    }

    let reducedForecastObject: ReducedForecastObject = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
    };

    const objectLength = Object.keys(forecastObject).length;

    for (let i = 0; i < objectLength; i++) {
      if (forecastObject[i as keyof typeof forecastObject].length === 0) {
        // console.log(i, forecastObject[i as keyof typeof forecastObject]);
        reducedForecastObject = {
          ...reducedForecastObject,
          [i]: {},
        };
        continue;
      }

      const lengthOfDay =
        forecastObject[i as keyof typeof forecastObject].length;
      const dt_txt = forecastObject[i as keyof typeof forecastObject][0].dt_txt;

      const humidityArr: number[] = [];
      const lowArr: number[] = [];
      const highArr: number[] = [];
      const weatherArr: Array<IndividualForecastData['weather']> = [];

      forecastObject[i as keyof typeof forecastObject].forEach((day) => {
        humidityArr.push(day.main.humidity);
        lowArr.push(day.main.temp_min);
        highArr.push(day.main.temp_max);
        weatherArr.push(day.weather);
      });

      const humidity: number = humidityArr.reduce((a, b) => a + b, 0);
      const temp_min: number = lowArr.sort((a, b) => a - b)[0];
      const temp_max: number = highArr.sort((a, b) => b - a)[0];
      const weather: IndividualForecastData['weather'][0] =
        findMostFrequent(weatherArr);

      reducedForecastObject = {
        ...reducedForecastObject,
        [i]: {
          main: {
            temp_min: temp_min.toFixed(),
            temp_max: temp_max.toFixed(),
            humidity: (humidity / lengthOfDay).toFixed(),
          },
          weather: [weather],
          dt_txt,
          day: getDayOfWeek(i),
          key: i,
        },
      };
    }

    let result = Object.keys(reducedForecastObject).map((key: unknown) => ({
      ...reducedForecastObject[key as keyof typeof reducedForecastObject],
    }));

    result = result.filter((item) => {
      if (item.main) {
        return item;
      }
      return;
    });
    console.log(result);
    return result;
  };

  consolidateEachDayIntoArray();
  reduceEachKeyIntoSingleObject();
  return reduceEachKeyIntoSingleObject();
};
