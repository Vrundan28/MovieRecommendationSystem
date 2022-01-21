import React from 'react';
import { BrowserRouter, Route}  from 'react-router-dom';
import {Switch } from 'react-router-dom';
import AddMovie from './Components/AddMovie/AddMovie';
import ViewMovie from './Components/ViewMovie/ViewMovie';
import PlayMovie from './Components/PlayMovie/PlayMovie';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

const App = () => {
  
  return (
  <>
    <BrowserRouter> 
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/Signup' component={Signup} />
            <Route path='/AddMovie' component={AddMovie} />
            <Route path='/ViewMovie/:movieId' component={ViewMovie} />
            <Route path='/PlayMovie/:movieId' component={PlayMovie} />
        </Switch>
    </BrowserRouter>
  </>);
};

export default App;
