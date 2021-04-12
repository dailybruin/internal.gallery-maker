import { API_ROOT } from '../constants/api';
import axios from 'axios';

const submitGalleryCreate = async (
  name,
  layout,
  description,
  gallery,
  successCallback,
  failureCallback
) => {
  axios
    .post(`${API_ROOT}/gallery/create_or_update_gallery`, {
      name: name,
      layout: layout,
      description: description,
      images: gallery,
    })
    .then((res) => {
      console.log(res);
      console.log('got to .then');
      successCallback();
    })
    .catch((err) => {
      console.log('got to .catch', err);
      failureCallback();
    });
};

const submitGalleryEdit = async (
  id,
  name,
  layout,
  description,
  gallery,
  successCallback,
  failureCallback
) => {
  axios
    .post(`${API_ROOT}/gallery/create_or_update_gallery`, {
      id: id,
      name: name,
      layout: layout,
      description: description,
      images: gallery,
    })
    .then((res) => {
      console.log(res);
      console.log('got to .then');
      successCallback();
    })
    .catch((err) => {
      console.log('got to .catch', err);
      failureCallback();
    });
};

export { submitGalleryCreate, submitGalleryEdit };
