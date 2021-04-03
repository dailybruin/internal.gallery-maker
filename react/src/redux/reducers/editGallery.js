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
            credit: action.payload.newCredit
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
