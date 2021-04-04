import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import "./caption.css"

// helper component
function CaptionImagePair(props){


   // its a little awkward that there is local state and there redux state
   // the reason I didn't want to just have each caption image pair read the redux state 
   // is because it would require each CaptionImagePair to look through the gallery array
   // and check if their caption changed every time a single character is typed in
   // this will cost O(n^2) where n is the number of images. 
   // In this approach, the parent component provides the initial credits and captions
   // so no array checks in this component

   // if later on, we decide to use only redux state, here is a selector we can use
    // function selectCaption(state) {
   //   const gallery =  state.editGallery.gallery;
   //   matching_images = gallery.filter(img => img.url === img_url)
   //   if(matching_images.length == 0)
   //       return null
   //   else
   //       return matching_images[0].caption;
   // }
   // const caption = useSelector(selectCaption); // for retrieving caption for this image


   const [caption, setCaption] = useState(props.initialCaption)
   const [credit, setCredit] = useState(props.initialCredit)

   const dispatch = useDispatch()

   function updateStateAndReduxCaption(value){
        setCaption(value)
        dispatch({
            type: "EDIT_CAPTION",
            payload: {
                url: props.img_url,
                newCaption: value
            }
        })
   }

   function updateStateAndReduxCredit(value){
    setCredit(value)
    dispatch({
        type: "EDIT_CREDIT",
        payload: {
            url: props.img_url,
            newCredit: value
        }
    })
   }

   return (
    <div className="image-caption-row">
        <img className="caption-image" src={props.img_url}/>
        <div>
            <h4>Caption: </h4>
            <textarea value={caption} onChange={e => updateStateAndReduxCaption(e.target.value)}/>

            <h4>Credit: </h4>
            <textarea value={credit} onChange={e => updateStateAndReduxCredit(e.target.value)}/>
        </div>
    </div>
   )
}


const selectorForGallery = state => state.editGallery.gallery;
const equalityCheck = (newState, state) => {
    // console.log("old state")
    // console.log(state);
    console.log("new state")
    console.log(newState);

    if(state.length != newState.length)
        return false;
    for(let i = 0; i < state.length; i++) {
        if(state[i].url != newState[i].url)
            return false;
    }
    return true;
}

function CaptionsForm() {
    // if we don't use a custom equality check
    // then too many re renders will be triggered

    // When the CaptionImagePair changes redux state, the array
    // is replace with a copy. By default, the equality check
    // checks references so it will certainly think the array has changed
    // however, as long as the image urls don't change, we don't need to re run this
    // so in order to prevent this, we use a custom equality check which actually
    // compares the img urls in the old state and the new redux state.
    const gallery =  useSelector(selectorForGallery, equalityCheck); 


    return (<div className="caption-container">
        <h2> Captions and Credits </h2>
        {gallery.map(img => <CaptionImagePair 
            key={img.url} 
            img_url={img.url} 
            initialCaption={img.caption}
            initialCredit={img.credits}

            />)}
    </div>)


}

export default CaptionsForm;