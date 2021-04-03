import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Button } from 'antd';

import classes from './index.module.css';
import GalleryList from './gallery-list';

function Home(props) {
  return props.isLoggedIn ? (
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
      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  ) : props.isLoading ? (
    <div>Loading</div>
  ) : (
    <Redirect to="/signup" />
  );
}

export default Home;
