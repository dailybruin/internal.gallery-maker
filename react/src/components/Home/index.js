import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function Home(props) {
  // console.log('props.isLoggedIn', props.isLoggedIn);
  // console.log('props.isLoading', props.isLoading);
  return props.isLoggedIn ? (
    <div>
      <div>Home Page</div>
      <div>
        <Link to="/create">Create</Link>
      </div>
      <div>
        <Link to="/update/1">Update</Link>
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
