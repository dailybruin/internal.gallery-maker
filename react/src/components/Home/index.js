import React from "react";
import { Link } from "react-router-dom";

import classes from "./index.module.css";
import GalleryList from "./gallery-list";

function Home(props) {
    return (
        <div>
            <h3>Galleries</h3>
            <div className={classes.Container}>
                <GalleryList />
            </div>
            <button>
                <Link to="/create">New Gallery</Link>
            </button>
        </div>
    );
}

export default Home;
