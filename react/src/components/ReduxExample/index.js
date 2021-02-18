import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

function ReduxExample(props) {
    const reduxGallery = useSelector(state => state.editGallery.gallery)  // for retrieving state
    const dispatch = useDispatch() // for changing state
    

    console.log(reduxGallery)
    const func = () => {
        console.log("Adding entry")
        dispatch({
            type: "EDIT_GALLERY",
            payload: [...reduxGallery, {
                url: "https://redux.js.org/img/redux.svg",
                caption: "Redux"
            }]
        })
    }


    return (
        <div>
            <div>Redux Example Page</div>
            <button onClick={func}> test </button>
            <div>
                {reduxGallery.map((img, i) =>
                    <div key={i}>
                        <img width="100" src={img.url} alt="non"/>
                        <span> {img.caption} </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReduxExample