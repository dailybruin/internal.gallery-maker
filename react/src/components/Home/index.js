import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import classes from './index.module.css';
import GalleryList from './gallery-list';

function Home(props) {
  return (
    <div>
      <h1>Galleries</h1>
      <div className={classes.Container}>
        <GalleryList />
      </div>
      <Button type="primary">
        <Link to="/create">New Gallery</Link>
      </Button>
      <div>
        <Link to="/rearrange">Rearrange Images</Link>
      </div>
    </div>
  );
}

export default Home;
