import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import SportsContext from '../contexts/SportsContext';
import { getAllSportsQuery } from '../queries';
import Sport from '../types/sport.interface';

const SportsProvider: React.FC = (props) => {
  const allSports = useQuery(getAllSportsQuery);

  const [sports, setSports] = useState<Sport[]>([]);
  const [selectedSportId, setSelectedSportId] = useState<string>("");

  useEffect(() => {
    setSports(allSports.data?.sports);
  }, [allSports.data?.sports]);

  return (
    <SportsContext.Provider value={{
      sports,
      setSports,
      selectedSportId,
      setSelectedSportId
    }}>
      {props.children}
    </SportsContext.Provider>
  );
};

export default SportsProvider;
