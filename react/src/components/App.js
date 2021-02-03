import React from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom"
import Home from './Home'
import CreateUpdateGallery from './CreateUpdateGallery'
import {useEffect} from 'react';
import axios from 'axios';
//https://gallery.dailybruin.com/django/get_gallery_data/1

function App() {
  useEffect(() => {
    axios.get(`http://localhost:8000/django/get_gallery_data/1`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/create" component={CreateUpdateGallery}/>
        <Route path="/update/:id" component={CreateUpdateGallery}/>
        <Route path="/" component={Home}/>
      </Switch>
    </div>
  );
}

export default App;