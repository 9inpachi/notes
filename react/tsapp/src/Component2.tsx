import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const Component2: React.FC = () => {
  const value = useContext(UserContext);

  return (
    <div style={{ background: '#f0f0f0', flexGrow: 1, flexBasis: 0 }}>
      <h1>This is component 2. Getting the username {value?.username}</h1>
    </div>
  )
};

export default Component2;
