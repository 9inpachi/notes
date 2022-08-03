import React from 'react';
import ReactDOM from 'react-dom/client';
import { Search } from './components/search';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Search onSearch={console.log} />
  </React.StrictMode>
);
