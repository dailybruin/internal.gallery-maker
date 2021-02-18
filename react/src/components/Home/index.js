import React from 'react';
import { Link } from 'react-router-dom';
import { RearrangeImages, ImageList } from '../RearrangeImages';

function Home(props) {
  return (
    <div>
      <div>Home Page</div>
      <div>
        <Link to="/create">Create</Link>
      </div>
      <div>
        <Link to="/update/1">Update</Link>
      </div>
      <RearrangeImages />
      <ImageList />
    </div>
  );
}

export default Home;
