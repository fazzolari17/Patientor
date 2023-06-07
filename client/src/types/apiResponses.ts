export interface IndividualForecastFromApi {
  dt: unknown;
  main: {
    temp: unknown;
    feels_like: unknown;
    temp_min: unknown;
    temp_max: unknown;
    pressure: unknown;
    sea_level: unknown;
    grnd_level: unknown;
    humidity: unknown;
    temp_kf: unknown;
  };
  weather: [
    {
      id: unknown;
      main: unknown;
      description: unknown;
      icon: unknown;
    }
  ];
  clouds: {
    all: unknown;
  };
  wind: {
    speed: unknown;
    deg: unknown;
    gust: unknown;
  };
  visibility: unknown;
  pop: unknown;
  sys: {
    pod: unknown;
  };
  dt_txt: unknown;
}

export interface ForecastResponseFromApi {
  timestamp: unknown;
  cod: unknown;
  message: unknown;
  cnt: unknown;
  list: IndividualForecastFromApi[];
  city: {
    id: unknown;
    name: unknown;
    coord: {
      lat: unknown;
      lon: unknown;
    };
    country: unknown;
    population: unknown;
    timezone: unknown;
    sunrise: unknown;
    sunset: unknown;
  };
}
