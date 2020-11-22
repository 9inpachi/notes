import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery } from '@apollo/client';
import AddSport from './components/AddSport';
import SportsList from './components/SportsList';
import SportsContext from './contexts/SportsContext';
import { getAllPlayersQuery, getAllSportsQuery } from './queries';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  // const allSports = useQuery(getAllSportsQuery);
  // const allPlayers = useQuery(getAllPlayersQuery);

  return (
    <SportsContext.Provider value={{
      sports: [],
      selectedSport: undefined
    }}>
      <ApolloProvider client={client}>
        <div className="container">
          <div className="row">
            <div className="edit-section col-6">
              <div className="sports">
                <h2>Sports</h2>
                {/* {allSports?.error && <p>Could not get sports</p>} */}
                <AddSport />
                <SportsList />
              </div>
            </div>
            <div className="view-section col-6">
              SOME TEXT BUT MORE
            </div>
          </div>
        </div>
      </ApolloProvider>
    </SportsContext.Provider>
  );
}

export default App;
