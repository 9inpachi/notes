import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import SportsContext from '../contexts/SportsContext';
import { getAllSportsQuery } from '../queries';

const SportsProvider: React.FC = (props) => {
  const allSports = useQuery(getAllSportsQuery);
  const [selectedSportId, setSelectedSportId] = useState<string>("");

  return (
    <SportsContext.Provider value={{
      sports: allSports.data?.sports,
      selectedSportId: selectedSportId,
      setSelectedSportId
    }}>
      {props.children}
    </SportsContext.Provider>
  );
};

export default SportsProvider;
