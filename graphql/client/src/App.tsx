import React from 'react';
import { ApolloProvider } from '@apollo/client';
import AddSport from './components/AddSport';
import SportsList from './components/SportsList';
import SportsProvider from './providers/SportsProvider';
import SingleSport from './components/SingleSport';
import SportsContext from './contexts/SportsContext';
import { client } from './constants/apollo-client';

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <SportsProvider>
        <div className="container">
          <div className="row">
            <div className="edit-section col-6">
              <div className="sports">
                <h2>Sports</h2>
                <hr />
                <AddSport />
                <hr />
                <h3>Existing Sports</h3>
                <SportsList />
              </div>
            </div>
            <div className="view-section col-6">
              <SportsContext.Consumer>
                {({ selectedSportId }) => {
                  if (selectedSportId) {
                    return <SingleSport selectedSportId={selectedSportId} />;
                  }
                }}
              </SportsContext.Consumer>
            </div>
          </div>
        </div>
      </SportsProvider>
    </ApolloProvider>
  );
}

export default App;
