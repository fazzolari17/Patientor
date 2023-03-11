import * as React from 'react';

// Material ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Components / Views
import Checkbox from '../../components/CheckBox';

// Services
import weatherService from '../../services/weather';

// Redux / Reducers
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
  fetchCurrentWeatherData,
  setWeatherLocationData,
} from '../../reducers/weatherReducer';

// Helper Functions
import debounce from 'lodash.debounce';
import { v4 as uuid } from 'uuid';

// Types
import { ApiGeocodeResults } from '../../types';
import { updateUserWeatherLocationData } from '../../reducers/userReducer';
import { RootState } from '../../store';
import { parseString } from '../../utils/utils';

export default function ComboBox() {
  const [isChecked, setIsChecked] = React.useState<boolean>(true);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [apiGeocodeResults, setApiGeocodeResults] = React.useState<
    ApiGeocodeResults[] | []
  >([]);

  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state);

  const handleSetWeatherToDisplay = async (value: string | null) => {
    if (!value) return;

    const weatherLocationData = apiGeocodeResults.find((item) => {
      const separatedArray = value.split(', ');
      if (item.name === separatedArray[0] && item.state === separatedArray[1]) {
        return item;
      } else {
        return;
      }
    });

    if (!weatherLocationData) throw new Error('weather location is not found');

    const callApi = debounce(() => {
      if (weatherLocationData !== undefined) {
        dispatch(setWeatherLocationData(weatherLocationData));
        dispatch(
          fetchCurrentWeatherData(
            weatherLocationData.lat,
            weatherLocationData.lon
          )
        );
        if (isChecked) {
          dispatch(
            updateUserWeatherLocationData(
              parseString(
                'missing or incorrect user.id on weatherPage searchBar',
                user.id
              ),
              weatherLocationData
            )
          );
        }
      }
    }, 300);

    callApi();
  };

  const handleChange = (event: React.SyntheticEvent<Element, Event>): void => {
    const { target } = event;
    setSearchValue((target as HTMLInputElement).value);
  };

  React.useEffect(() => {
    const callApi = debounce(async () => {
      const response = await weatherService.fetchLatandLonFromApi(searchValue);
      setApiGeocodeResults(() => {
        if (!response) {
          return [];
        } else {
          return response;
        }
      });
    }, 1500);

    if (searchValue.length > 0) {
      callApi();
    }
  }, [searchValue]);

  const renderSearchResults = (apiGeocodeResults: ApiGeocodeResults[]) => {
    let searchResults: string[] | [];
    if (apiGeocodeResults.length < 1) {
      return (searchResults = []);
    } else {
      searchResults = apiGeocodeResults.map(
        (item) => `${item.name}, ${item.state}`
      );
      return searchResults;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Autocomplete
        disablePortal
        freeSolo={true}
        id="combo-box-demo"
        renderOption={(props, option) => {
          return (
            <li {...props} key={uuid()}>
              {option}
            </li>
          );
        }}
        onChange={(event, value) => {
          handleSetWeatherToDisplay(value);
        }}
        options={renderSearchResults(apiGeocodeResults)}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
        )}
      />
      <Checkbox
        label={'Set default weather location'}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
  );
}
