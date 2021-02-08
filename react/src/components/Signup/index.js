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
  let slackClientId="4526132454.1654017102375"
  let slackUserScope="identity.basic"
  let redirectUrl="http://localhost:8000/django/oauth/slack_auth"
  let url = `https://slack.com/oauth/v2/authorize?user_scope=${slackUserScope}&client_id=${slackClientId}`
    if (redirectUrl) {
      url += `&redirect_uri=${redirectUrl}`
    }
  return (
    <div>
      <a href={url}>
        Do things.
      </a>
      {loggedIn ? <div>Success</div> : <div>Failure</div>}
    </div>
  );
}

export default Signup;
