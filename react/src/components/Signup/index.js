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
    }
    return (
        <div>
            <SlackLogin
                redirectUrl='http://localhost:8000/django/test'
                onFailure={onFailure}
                onSuccess={onSuccess}
                slackClientId='4526132454.1654017176119'
                slackUserScope='identity.basic'
            />
            {loggedIn ? <div>Success</div> : <div>Failure</div>}
        </div>
    );
}

export default Signup;