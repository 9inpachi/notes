import React from 'react';
import { UserContext } from '../UserContext';

class ClassComponent2 extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {user => (
          <p>Class component 2. User email is {user?.email}.</p>
        )}
      </UserContext.Consumer>
    );
  }
}

export default ClassComponent2;
