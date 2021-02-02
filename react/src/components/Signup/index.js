import React, { useState } from 'react';
import SlackLogin from 'react-slack-login';

function Signup() {
  const [loggedIn, setLoggedIn] = useState(false);
  function onFailure() {
    setLoggedIn(false);
    console.log('failure');
  }
  function onSuccess(code) {
    setLoggedIn(true);
    console.log('success');
    console.log('code', code);
  }
  return (
    <div>
      <SlackLogin
        // redirectUrl="https://localhost:8000/django/oauth/slack_auth"
        redirectUrl="http://localhost:8000/django/oauth/slack_auth"
        onFailure={onFailure}
        onSuccess={onSuccess}
        // slackClientId="4526132454.1654017176119"
        slackClientId="4526132454.1654017102375"
        slackUserScope="identity.basic"
      />
      {loggedIn ? <div>Success</div> : <div>Failure</div>}
    </div>
  );
}

export default Signup;
