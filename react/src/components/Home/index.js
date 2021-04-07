import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Button } from 'antd';

import classes from './index.module.css';
import GalleryList from './gallery-list';
import SubmitButton from '../SubmitButton';
import GalleryBasicInfo from '../GalleryBasicInfo';

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
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Home;
