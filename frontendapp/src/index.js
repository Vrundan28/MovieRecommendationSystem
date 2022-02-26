import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import ContextProvider from './context/Context'
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
    {/* <AddMovie /> */}
  </React.StrictMode >,
  document.getElementById('root')
);
