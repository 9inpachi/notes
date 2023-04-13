import React from 'react';
import ClassComponent1 from './ClassComponents/ClassComponent1';
import ClassComponent2 from './ClassComponents/ClassComponent2';
import Component1 from './Component1';
import Component2 from './Component2';
import { UserContext } from './UserContext';

function App() {
  return (
    <UserContext.Provider
      value={{
        username: 'test',
        email: 'test@test.com',
        firstName: 'testFirst',
        lastName: 'testLast'
      }}
    >
      <div style={{
        display: 'flex',
        alignContent: 'space-around'
      }}>
        <Component1 />
        <Component2 />
      </div>
      <ClassComponent1 />
      <ClassComponent2 />
    </UserContext.Provider>
  );
}

export default App;
