import { useQuery } from '@apollo/client';
import React from 'react';
import { getSportQuery } from '../queries';
import Sport from '../types/sport.interface';

interface Props {
  selectedSportId?: string
}

const SingleSport: React.FC<Props> = ({ selectedSportId }) => {
  const { data, error, loading } = useQuery(getSportQuery, {
    variables: { id: selectedSportId }
  });

  const selectedSport = data?.sport as Sport;

  return (
    <div className="single-sport m-2">
      {loading && <p>Loading data</p>}
      {error && <p>Error loading data</p>}
      {selectedSport && <>
        <h1>
          {selectedSport.name}
        </h1>
        <p><b>ID: </b>{selectedSport.id}</p>
        <p><b>Type: </b>{selectedSport.type}</p>
        <p><b>Type: </b>{selectedSport.rules?.join(', ')}</p>
      </>}
    </div>
  );
};

export default SingleSport;
