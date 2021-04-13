import React from 'react';
import { Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

function LoginWrapper({
  component: Component,
  isLoggedIn,
  isLoading,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : isLoading ? (
          <div>Loading</div>
        ) : (
          <Redirect to="/signup" />
        )
      }
    />
  );
}

export default LoginWrapper;
