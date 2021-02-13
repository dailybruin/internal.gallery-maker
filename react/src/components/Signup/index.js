import React, { useState } from 'react';
import SlackLogin from 'react-slack-login';
import './index.css';

function Signup() {
  return (
    <div className="signup-container">
      {/* <a href={url}>Do things.</a> */}
      <div className="slack-link-container">
        <a href="https://slack.com/oauth/v2/authorize?user_scope=identity.basic&client_id=4526132454.1654017102375">
          <img
            alt="Sign in with Slack"
            height="40"
            width="172"
            src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
            srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
          />
        </a>
        {/* {loggedIn ? <div>Success</div> : <div>Failure</div>} */}
      </div>
    </div>
  );
}

export default Signup;
