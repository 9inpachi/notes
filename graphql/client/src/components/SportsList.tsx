import React from 'react';
import Sport from '../types/sport.interface';
import SportsContext from '../contexts/SportsContext';

const SportsList: React.FC = () => {
  return (
    <div className="all-sports m-2 my-4">
      <SportsContext.Consumer>
        {({ sports, selectedSportId, setSelectedSportId }) => (
          <>
            {sports && sports.length < 1 && <p>Error getting list</p>}
            {sports && sports.map((sport: Sport, index: number) => {
              return <button
                key={`sportList${index}`}
                className={`btn btn-outline-secondary m-1${sport.id === selectedSportId ? ' btn-secondary' : ''}`}
                data-id={sport.id}
                onClick={e => {
                  setSelectedSportId?.((e.target as any).dataset.id);
                }}
              >
                {sport.name}
              </button>;
            })}
          </>
        )}
      </SportsContext.Consumer>
    </div>
  );
};

export default SportsList;
