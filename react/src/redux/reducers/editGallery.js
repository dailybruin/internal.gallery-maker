
const initialState = {
	gallery: []
};

const editGallery = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_GALLERY": {
      return {
      	gallery: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default editGallery;
