import { useMutation, useQuery } from '@apollo/client';
import React, { useContext } from 'react';
import SportsContext from '../contexts/SportsContext';
import { deleteSportQuery, getSportQuery } from '../queries';
import Sport from '../types/sport.interface';

interface Props {
  selectedSportId?: string
}

const SingleSport: React.FC<Props> = ({ selectedSportId }) => {
  const { data, error, loading } = useQuery(getSportQuery, {
    variables: { id: selectedSportId }
  });

  const selectedSport = data?.sport as Sport;


  const [deleteSport] = useMutation(deleteSportQuery);

  const { sports, setSports, setSelectedSportId } = useContext(SportsContext);

  const deleteSingleSport = () => {
    deleteSport({
      variables: {
        id: selectedSport.id
      }
    }).then((res) => {
      if (sports) {
        setSports?.([...sports].filter((sport) => sport.id !== selectedSport.id));
      }
      setSelectedSportId?.('');
    });
  }

  return (
    <div className="single-sport m-2">
      {loading && <p>Loading data</p>}
      {error && <p>Error loading data</p>}
      {selectedSport && <>
        <h1>{selectedSport.name}</h1>
        <p><b>ID: </b>{selectedSport.id}</p>
        <p><b>Type: </b>{selectedSport.type}</p>
        <p><b>Rules: </b>{selectedSport.rules?.join(', ')}</p>
        <button
          className="btn btn-danger"
          onClick={deleteSingleSport}
        >
          Delete
        </button>
      </>}
    </div>
  );
};

export default SingleSport;
