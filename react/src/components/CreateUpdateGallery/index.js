import React from 'react'

import CreateCaptionCreator from './CreateCaptionCreator'


function CreateUpdateGallery(props) {
    return (
        <div>

        	<CreateCaptionCreator />

            {
                props.match.path === '/update/:id' ? `update ${props.match.params.id}` : "create"
            }
        </div>
    );
}

export default CreateUpdateGallery