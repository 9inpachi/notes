import React from 'react';
import { useQuery } from '@apollo/client';
import { getAllSportsQuery } from '../queries';
import Sport from '../types/sport.interface';

const SportsList: React.FC = () => {
  const { error, data } = useQuery(getAllSportsQuery);

  return (
    <div className="all-sports m-5">
      {error && <p>Error getting list</p>}
      {data?.sports && data.sports.map((sport: Sport, index: number) => {
        return <button
          key={`sportList${index}`}
          className="btn btn-secondary m-1"
        >
          {sport.name}
        </button>;
      })}
    </div>
  );
};

export default SportsList;
