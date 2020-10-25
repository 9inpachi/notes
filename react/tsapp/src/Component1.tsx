import React from 'react';
import { UserContext } from './UserContext';

const Component1: React.FC = () => {
  return (
    <div style={{ background: 'cyan', flexGrow: 1, flexBasis: 0 }}>
      <UserContext.Consumer>
        {user => (
          <h1>This is component 1. The user email is {user?.email}.</h1>
        )}
      </UserContext.Consumer>
    </div>
  );
};

export default Component1;
