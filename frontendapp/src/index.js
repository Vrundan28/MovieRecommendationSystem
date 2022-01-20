import React from 'react';
import ReactDOM from 'react-dom';
import AddMovie from './Components/AddMovie/AddMovie';
// import ViewMovie from './Components/ViewMovie/ViewMovie';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AddMovie />
    {/* <ViewMovie /> */}
  </React.StrictMode >,
  document.getElementById('root')
);
