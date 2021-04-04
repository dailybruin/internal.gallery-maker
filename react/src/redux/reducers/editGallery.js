import { SERVER_URL } from '../../server_url.js';
import axios from 'axios';

const initialState = {
  gallery: [],
  name: '',
  description: '',
  layout: 'alt',
};
/*
    gallery: 
      [
        url: string;
        caption: string;
      ]; // i think?
      name: string;
      layout: string;
      description: string;
  */

const editGallery = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_GALLERY': {
      return {
        ...state,
        gallery: action.payload,
      };
    }
    case 'DELETE_GALLERY': {
      return initialState;
    }
    case 'REMOVE_GALLERY_IMAGE': {
      let newGallery = state.gallery.filter(
        (img) => img.url !== action.payload
      );
      return {
        ...state,
        gallery: newGallery,
      };
    }
    case 'SUBMIT_GALLERY_CREATE': {
      axios
        .post(`${SERVER_URL}/django/gallery/create_or_update_gallery`, {
          name: state.name,
          layout: state.layout,
          description: state.description,
          images: state.gallery,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return state;
    }
    case 'SUBMIT_GALLERY_EDIT': {
      axios
        .post(`${SERVER_URL}/django/gallery/create_or_update_gallery`, {
          id: action.payload,
          name: state.name,
          layout: state.layout,
          description: state.description,
          images: state.gallery,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return state;
    }
    case 'RESET_GALLERY': {
      return initialState;
    }
    case 'EDIT_DESCRIPTION': {
      return {
        ...state,
        description: action.payload
      }
    }
    case 'EDIT_NAME': {

      return {
        ...state,
        name: action.payload
      }
    }
    case 'EDIT_LAYOUT': {
      return {
        ...state,
        layout: action.payload
      }
    }
    case "EDIT_CAPTION": {
      // payload: {url: blah, newCaption: stuff}
      let newGallery = state.gallery.map(img => {
        if(img.url == action.payload.url)
          return {
            ...img,
            caption: action.payload.newCaption
          }
        return img
      })

      return {
        ...state,
        gallery: newGallery
      }
    }
    case "EDIT_CREDIT": {
      // payload: {url: blah, newCredit: stuff}
      // url identifies which image we are editing
      let newGallery = state.gallery.map(img => {
        if(img.url == action.payload.url)
          return {
            ...img,
            credits: action.payload.newCredit
          }
        return img
      })

      return {
        ...state,
        gallery: newGallery
      }
    }
    default: {
      return state;
    }
  }
};

export default editGallery;
