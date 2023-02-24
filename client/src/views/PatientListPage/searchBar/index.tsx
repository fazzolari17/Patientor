import React from 'react';

import SearchBy from './SearchBy';
import GenderSelector from './GenderSelector';
import SortPatientList from './SortPatients';
import SearchBox from './SearchBox';

interface Props {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchFilterValue: React.Dispatch<React.SetStateAction<string>>;
  searchFilterValue: string;
  setGenderFilterValue: React.Dispatch<React.SetStateAction<string[]>>;
  genderFilterValue: string[];
  sortPatientList: string;
  setSortPatientList: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({
  searchValue,
  setSearchValue,
  searchFilterValue,
  setSearchFilterValue,
  genderFilterValue,
  setGenderFilterValue,
  sortPatientList,
  setSortPatientList,
}: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      <SearchBy
        searchFilterValue={searchFilterValue}
        setSearchFilterValue={setSearchFilterValue}
      />
      <GenderSelector
        genderFilterValue={genderFilterValue}
        setGenderFilterValue={setGenderFilterValue}
      />
      <SortPatientList
        sortPatientList={sortPatientList}
        setSortPatientList={setSortPatientList}
      />
    </div>
  );
};

export default SearchBar;
