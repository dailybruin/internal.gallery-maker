import React from 'react'

function CreateUpdateGallery(props) {
    return (
        <div>
            {
                props.match.path === '/update/:id' ? `updates7 ${props.match.params.id}` : "create"
            }
        </div>
    );
}

export default CreateUpdateGallery