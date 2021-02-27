import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import CreateUpdateGallery from "./CreateUpdateGallery";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/create" component={CreateUpdateGallery} />
                <Route path="/update/:id" component={CreateUpdateGallery} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
