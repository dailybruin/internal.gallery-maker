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
    case 'REMOVE_GALLERY_IMAGE': {
      let newGallery = state.gallery.filter(
        (img) => img.url !== action.payload
      );
      return {
        gallery: newGallery,
      };
    }
    case 'SUBMIT_GALLERY': {
      //call backend here
      return state;
    }
    default: {
      return state;
    }
  }
};

export default editGallery;
