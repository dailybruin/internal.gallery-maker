import React, { useState } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import CreateUpdateGallery from './CreateUpdateGallery';
import Signup from './Signup';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Switch>
        <Route path="/create" component={CreateUpdateGallery} />
        <Route path="/update/:id" component={CreateUpdateGallery} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} isLoggedIn={loggedIn} />
      </Switch>
    </div>
  );
}

export default App;
