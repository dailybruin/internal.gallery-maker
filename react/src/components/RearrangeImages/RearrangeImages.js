import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper';

import ImageList from './ImageList';
import { isTouchDevice } from './utils';

import './RearrangeImages.css';

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

function RearrangeImages() {
  const [images, setImages] = useState([
    {
      url:
        'https://ichef.bbci.co.uk/news/1024/cpsprodpb/151AB/production/_111434468_gettyimages-1143489763.jpg',
      id: 1,
    },
    {
      url:
        'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      id: 2,
    },
  ]);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };
  return (
    <div className="rearrange-images-container">
      <h1 className="text-center">Drag and Drop Example</h1>
      {images && images.length > 0 && (
        <h3 className="text-center">Drag the Images to change positions</h3>
      )}
      <DndProvider backend={backendForDND}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </div>
  );
}

export default RearrangeImages;
