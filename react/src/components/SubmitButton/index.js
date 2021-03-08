import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SubmitButton = (props) => {
  //   const reduxGallery = useSelector((state) => state.editGallery.gallery); // for retrieving state
  const dispatch = useDispatch(); // for changing state

  const submitGallery = () => {
    dispatch({
      type: 'SUBMIT_GALLERY',
    });
    //do other stuff after
  };
  return <Button onClick={() => submitGallery()}>Submit</Button>;
};

export default SubmitButton;
