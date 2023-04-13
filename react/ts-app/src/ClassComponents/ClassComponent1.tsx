import React from 'react';
import { UserContext } from '../UserContext';

class ClassComponent1 extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <p>Class component 1. Username is {this.context?.username}.</p>
    );
  }
}

export default ClassComponent1;
