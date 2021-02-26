import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import CreateUpdateGallery from './CreateUpdateGallery';
import { RearrangeImages } from './RearrangeImages';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/create" component={CreateUpdateGallery} />
        <Route path="/update/:id" component={CreateUpdateGallery} />
        <Route path="/rearrange" component={RearrangeImages} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
