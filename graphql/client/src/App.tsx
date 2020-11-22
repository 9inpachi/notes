import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddSport from './components/AddSport';
import SportsList from './components/SportsList';
import SportsProvider from './providers/SportsProvider';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <SportsProvider>
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
      </SportsProvider>
    </ApolloProvider>
  );
}

export default App;
