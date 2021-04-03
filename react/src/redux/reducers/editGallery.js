const initialState = {
  gallery: [],
};

const editGallery = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_GALLERY': {
      return {
        gallery: action.payload,
      };
    }
    case 'DELETE_GALLERY': {
      return {
        gallery: [],
      };
    }
    case "REMOVE_GALLERY_IMAGE": {
      let newGallery = state.gallery.filter(img => img.url !== action.payload);
      return {
        gallery: newGallery
      }
    }
    case "EDIT_CAPTION": {
      // payload: {url: blah, newCaption: stuff}
      let newGallery = state.gallery.map(img => {
        if(img.url == action.payload.url)
          return {
            url: img.url,
            caption: action.payload.newCaption
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
