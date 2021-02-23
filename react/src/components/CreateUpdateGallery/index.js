import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import './CreateUpdateGallery.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { store } from '../../redux/configureStore'

const DEFAULT_PER_PAGE = 50;

function SelectedImage(props) {
    return (
        <div className="selected-img-container">
            <img src={props.sourceURL}
                alt=""
            />
            <span 
                className="fa-layers fa-fw button-overlay"
                onClick={() => {props.onRemoveClick(props.sourceURL)}}
            >
                <FontAwesomeIcon icon={faCircle} color="white" />
                <FontAwesomeIcon icon={faTimesCircle} />
            </span>
        </div>
    );
}

//retrieve redux state
const selectReduxGallery = (state) => {
    return state.editGallery.gallery;
}

//returns array of selected image urls from redux store
const selectSelectedImages = (state) => {
    return state.map((el) => el.url);
}

/*
state for displayed image data is handled by reducer.
necessary because the effect which makes a GET request to the WP endpoint
previously used the selected images state to determine if any of the fetched
images had already been selected by the user. However, this meant that the 
effect was dependent on the selected images state, so it ran every time a user 
selected an image. This means the GET request was made every time the user selected
an image, which we don't want. To ensure the effect isn't dependent on the selected 
images state, I had to move the state update logic for selected images and image data
to a reducer.
*/
const initialState = { imageData: [] }

const toggleSelectedField = (imgURL, imageData) => {
    return imageData.map(
        img => img.sourceURL === imgURL ? {...img, selected: !img.selected} : img
    )
}

const setImageData = (imageData, selectedImages) => {
    return imageData.map(img => 
        ({
            sourceURL: img.source_url,
            selected: selectedImages.includes(img.source_url)
        })
    );
}

const reducer = (state, action) => {
    let newImageData, selectedImages;
    let reduxDispatch = store.dispatch;
    let reduxGallery = selectReduxGallery(store.getState());

    switch (action.type) {
        case 'updatePage':
            selectedImages = reduxGallery.map(img => img.url);
            newImageData = setImageData(action.payload, selectedImages);
            return { ...state, imageData: newImageData }

        case 'updatePageAndSetSelectedImages':
            let [imageData, selectedImagesData] = action.payload;
            selectedImages = selectedImagesData.map(img => img.img_url);
            newImageData = setImageData(imageData, selectedImages);
            let newReduxGallery = selectedImages.map(imgURL => ({url: imgURL, caption: ""}));
            reduxDispatch({
                type: "EDIT_GALLERY",
                payload: [...reduxGallery, ...newReduxGallery]
            });
            return {...state, imageData: newImageData }
         
        case 'removeSelectedImage':
            newImageData = toggleSelectedField(action.payload, state.imageData);
            reduxDispatch({
                type: "REMOVE_GALLERY_IMAGE",
                payload: action.payload
            })
            return { ...state, imageData: newImageData }

        case 'addSelectedImage':
            newImageData = toggleSelectedField(action.payload, state.imageData);
            reduxDispatch({
                type: "EDIT_GALLERY",
                payload: [...reduxGallery, {
                    url: action.payload,
                    caption: ""
                }]
            });
            return { ...state, imageData: newImageData }

        default:
            return state;
    }
}

function CreateUpdateGallery(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const reduxGallery = useSelector(state => state.editGallery.gallery);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
    const [pageInput, setPageInput] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (props.match.path === '/update/:id') {
            axios.all([
                axios.get(`https://wp.dailybruin.com/wp-json/wp/v2/media?page=1&per_page=${DEFAULT_PER_PAGE}&orderby=date`),
                axios.get(`https://gallery.dailybruin.com/django/gallery/${props.match.params.id}`)
            ])
                .then(axios.spread((wpRes, galleryRes) => {
                    dispatch( { type: 'updatePageAndSetSelectedImages', payload: [wpRes.data, galleryRes.data.images]} );
                }))
                .catch(err => {
                    console.log(err);
                });
        }
    }, [props.match.path, props.match.params.id]);

    useEffect(() => {
        axios.get(`https://wp.dailybruin.com/wp-json/wp/v2/media?page=${page}&per_page=${perPage}&orderby=date`)
            .then(res => {
                dispatch({ type: 'updatePage', payload: res.data });
                setTotalPages(res.headers["x-wp-totalpages"]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [page, perPage]);

    const removeSelectedImage = (clickedImgURL) => {
        dispatch({ type: 'removeSelectedImage', payload: clickedImgURL });
    }

    const handleImageClick = (clickedImg) => {
        if (clickedImg.selected) {
            dispatch({ type: 'removeSelectedImage', payload: clickedImg.sourceURL });
        } 
        else {
            dispatch({ type: 'addSelectedImage', payload: clickedImg.sourceURL });
        }
    }

    const updatePage = (newPage) => {
        setPage(newPage);
        setPageInput(newPage);
    }

    const handlePageSubmit = e => {
        e.preventDefault();
        updatePage(pageInput);
    }

    const handlePerPageChange = e => {
        /*adjust page number so the first image on the page previously viewed is still on the new page*/
        let oldPerPage = perPage;
        let oldPage = page;
        let newPerPage = e.target.value;
        let curImageNum = (((oldPage - 1) * oldPerPage) + 1) / newPerPage
        let newPage = Math.ceil(curImageNum/newPerPage);
        setPerPage(newPerPage);
        updatePage(newPage);
    }

    const setNextPage = (offset) => {
        if (offset === -1 && page > 1) {
            updatePage(page - 1);
        }
        else if (offset === 1 && page < totalPages) {
            updatePage(page + 1);
        }
    }

    return (
        <div>
            <div>
                {props.match.path === '/update/:id' ? `update ${props.match.params.id}` : "create"}
            </div>
            <div>
                <div className="columns">
                    <div className="img-grid">
                        <p>
                            Select images to put in the gallery (don't worry about order now; you can reorder them later!)
                        </p>
                        {
                            state.imageData.map(img => 
                                <img src={img.sourceURL} 
                                    alt=""
                                    className={img.selected ? "img-selected" : ""}
                                    onClick={() => handleImageClick(img)}
                                    key={img.sourceURL}
                                />
                            )
                        }
                    </div>
                    <div className="pagination-container">
                        <button 
                            className="pag-button"
                            onClick={() => setNextPage(-1)}
                        >
                            Previous
                        </button>
                        <div className="pag-input-container">
                            <form className="pag-input" onSubmit={handlePageSubmit}>
                                <label>
                                    Page 
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max={totalPages}
                                        value={pageInput}
                                        onChange={e => setPageInput(e.target.value)}
                                    />
                                </label>
                            </form>
                            <form className="pag-input">
                                <label>
                                    Images Per Page 
                                    <select 
                                        value={perPage} 
                                        onChange={handlePerPageChange} 
                                        id="perPage"
                                    >
                                        <option value="10">10</option>
                                        <option value="25">20</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                        <option value="100">100</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <button 
                            className="pag-button"
                            onClick={() => setNextPage(1)}
                        >
                                Next
                        </button>
                    </div>
                    <div className="selected-imgs">
                        {
                            selectSelectedImages(reduxGallery).length > 0 ?
                                <div>
                                    <p>{`Selected images: ${selectSelectedImages(reduxGallery).length}`}</p>
                                    {
                                        selectSelectedImages(reduxGallery).map(imgURL => 
                                            <SelectedImage
                                                sourceURL={imgURL}
                                                onRemoveClick={removeSelectedImage}
                                                key={imgURL}
                                            />
                                        )
                                    }   
                                </div>
                            :
                                <p>Selected images will appear here</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUpdateGallery