import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import CreateUpdateGallery from './CreateUpdateGallery';
import Signup from './Signup';
import { RearrangeImages } from './RearrangeImages';
import { API_ROOT } from '../constants/api';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getAuthentication();
  });
  const getAuthentication = async () => {
    let response = await fetch(
      `${API_ROOT}/oauth/get_logged_in`
    );
    // console.log('response', response);
    let text = await response.text();
    text = JSON.parse(text);
    console.log('response text', text["ok"]);
    if (text["ok"]) {
      setLoggedIn(true);
      setLoading(false);
      console.log('set to true');
    } else {
      setLoggedIn(false);
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/create" component={CreateUpdateGallery} />
        <Route path="/update/:id" component={CreateUpdateGallery} />
        <Route path="/signup" component={Signup} />
        <Route path="/rearrange" component={RearrangeImages} />
        <Route
          path="/"
          render={() => <Home isLoggedIn={loggedIn} isLoading={isLoading} />}
        />
        
      </Switch>
    </div>
  );
}

export default App;
