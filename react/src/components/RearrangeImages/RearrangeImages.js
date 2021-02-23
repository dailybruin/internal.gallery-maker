import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';

import ImageList from './ImageList';
import { isTouchDevice } from './utils';

import './RearrangeImages.css';

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function RearrangeImages() {
  const reduxGallery = useSelector((state) => state.editGallery.gallery); // for retrieving state
  const dispatch = useDispatch(); // for changing state

  console.log(reduxGallery);
  const addImage = () => {
    console.log('Adding entry');
    dispatch({
      type: 'EDIT_GALLERY',
      payload: [
        ...reduxGallery,
        {
          url: 'https://redux.js.org/img/redux.svg',
          caption: 'Redux',
        },
      ],
    });
  };

  const addfirstcat = () => {
    console.log('Adding entry');
    dispatch({
      type: 'EDIT_GALLERY',
      payload: [
        ...reduxGallery,
        {
          url:
            'https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg',
          caption: 'Redux',
        },
      ],
    });
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = reduxGallery[dragIndex];
    let rearrangedGallery = update(reduxGallery, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedImage],
      ],
    });
    dispatch({
      type: 'EDIT_GALLERY',
      payload: rearrangedGallery,
    });
  };

  const resetGallery = () => {
    dispatch({
      type: 'DELETE_GALLERY',
    });
  };
  return (
    <div className="rearrange-images-container">
      <h1 className="text-center">Rearrange Images</h1>
      <button onClick={addImage}> add to fake gallery </button>
      <button onClick={addfirstcat}> add first cat </button>
      <button onClick={resetGallery}>delete gallery</button>
      {reduxGallery && reduxGallery.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <DndProvider backend={backendForDND}>
        <ImageList images={reduxGallery} moveImage={moveImage} />
      </DndProvider>
    </div>
  );
}

export default RearrangeImages;
