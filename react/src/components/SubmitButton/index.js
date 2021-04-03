import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

const SubmitButton = (props) => {
  //   const reduxGallery = useSelector((state) => state.editGallery.gallery); // for retrieving state
  const dispatch = useDispatch(); // for changing state
  const submitGallery = () => {
    if (props.id) {
      dispatch({
        type: 'SUBMIT_GALLERY_EDIT',
        payload: props.id,
      });
    } else {
      dispatch({
        type: 'SUBMIT_GALLERY_CREATE',
      });
    }
    //do other stuff after
    dispatch({
      type: 'RESET_GALLERY',
    });
  };
  return <Button onClick={() => submitGallery()}>Submit</Button>;
};

export default SubmitButton;