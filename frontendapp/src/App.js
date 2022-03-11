import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import AddMovie from './Components/AddMovie/AddMovie';
import PlayMovie from './Components/PlayMovie/PlayMovie';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from './Components/Home/Home';
import SearchMovie from './Components/SearchMOvie/SearchMovie';
import ShowMovie from './Components/ShowMovie/ShowMovie';
import Recommendations from './Components/Recommendations/Recommendations';
import Profile from './Components/Profile/Profile';
import UserPreferences from './Components/UserPreferences/UserPreferences';
import EditMovie from './Components/EditMovie/EditMovie';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import Getrecommendations1 from './Components/getRecommendations1/Getrecommendations1'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Login' component={Login} />
          <Route path='/Signup' component={Signup} />
          <Route path='/AddMovie' component={AddMovie} />
          <Route path='/ViewMovie/:movieId' component={ShowMovie} />
          <Route path='/PlayMovie/:movieId' component={PlayMovie} />
          <Route path='/searchMovie' component={SearchMovie} />
          <Route path='/Recommendation' component={Recommendations} />
          <Route path='/Profile' component={Profile} />
          <Route path='/EditMovie/:movieId' component={EditMovie} />
          <Route path='/AdminPanel' component={AdminPanel} />
          <Route path='/UserPreferences' component={UserPreferences} />
          <Route path='/getRecommendations1' component={Getrecommendations1} />
        </Switch>
      </BrowserRouter>
      {/* <Home /> */}
    </>);
};

export default App;
