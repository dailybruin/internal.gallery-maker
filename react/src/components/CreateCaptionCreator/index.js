import React from 'react'


function CreateCaptionCreator(props) {
    return (
        <div>
            
        	<form action="/action_page.php">
			  <label for="fname">First name:</label>
			  <input type="text" id="fname" name="fname"><br><br>
			  <label for="lname">Last name:</label>
			  <input type="text" id="lname" name="lname"><br><br>
			  <input type="submit" value="Submit">
			</form>

        </div>
    );
}

export default CreateCaptionCreator