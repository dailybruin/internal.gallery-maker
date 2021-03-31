import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import './SelectImages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { SERVER_URL } from '../../server_url';
import { Pagination } from "antd";

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

//returns array of selected image urls from redux state
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

const setImageData = (imageData, selectedImages) => {
    return imageData.map(img => 
        ({
            sourceURL: img.source_url,
            selected: selectedImages.includes(img.source_url)
        })
    );
}

const make_reducer = (reduxGallery) => 
    (state, action) => {
        let newImageData, selectedImages;

        switch (action.type) {
            case 'updatePage':
                selectedImages = reduxGallery.map(img => img.url);
                newImageData = setImageData(action.payload, selectedImages);
                return { ...state, imageData: newImageData }

            case 'updatePageAndSetSelectedFields':
                let [imageData, selectedImagesData] = action.payload;
                selectedImages = selectedImagesData.map(img => img.img_url);
                newImageData = setImageData(imageData, selectedImages);
                return {...state, imageData: newImageData }
            
            case 'toggleSelectedField':
                newImageData = state.imageData.map(
                    img => img.sourceURL === action.payload ? {...img, selected: !img.selected} : img
                );
                return { ...state, imageData: newImageData }

            default:
                return state;
    }
}

function SelectImages(props) {
    const reduxGallery = useSelector(state => state.editGallery.gallery);
    const reduxDispatch = useDispatch();
    const [state, dispatch] = useReducer(make_reducer(reduxGallery), initialState);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PER_PAGE);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (props.updateID >= 0) {
            axios.all([
                axios.get(`https://wp.dailybruin.com/wp-json/wp/v2/media?page=1&per_page=${DEFAULT_PER_PAGE}&orderby=date`),
                axios.get(`${SERVER_URL}/django/gallery/${props.updateID}`)
            ])
                .then(axios.spread((wpRes, galleryRes) => {
                    dispatch({ type: 'updatePageAndSetSelectedFields', payload: [wpRes.data, galleryRes.data.images]});
                    let newReduxGallery = galleryRes.data.images.map(img => ({url: img.img_url, caption: ""}));
                    reduxDispatch({
                        type: "EDIT_GALLERY",
                        payload: [...newReduxGallery]
                    });
                }))
                .catch(err => {
                    console.log(err);
                });
        }
    }, [props.updateID, reduxDispatch]);

    useEffect(() => {
        axios.get(`https://wp.dailybruin.com/wp-json/wp/v2/media?page=${page}&per_page=${pageSize}&orderby=date`)
            .then(res => {
                dispatch({ type: 'updatePage', payload: res.data });
                setTotalItems(res.headers["x-wp-total"]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [page, pageSize]);

    const removeSelectedImage = (clickedImgURL) => {
        dispatch({ type: 'toggleSelectedField', payload: clickedImgURL });
        reduxDispatch({
            type: "REMOVE_GALLERY_IMAGE",
            payload: clickedImgURL
        });
    }

    const handleImageClick = (clickedImg) => {
        if (clickedImg.selected) {
            removeSelectedImage(clickedImg.sourceURL);
        } 
        else {
            dispatch({ type: 'toggleSelectedField', payload: clickedImg.sourceURL });
            reduxDispatch({
                type: "EDIT_GALLERY",
                payload: [...reduxGallery, {
                    url: clickedImg.sourceURL,
                    caption: ""
                }]
            });
        }
    }

    const handlePageSizeChange = (current, size) => {
        /*adjust page number so the first image on the page previously viewed is still on the new page*/
        let oldPerPage = pageSize;
        let oldPage = current;
        let newPageSize = size;
        let curImageNum = (((oldPage - 1) * oldPerPage) + 1) / newPageSize
        let newPage = Math.ceil(curImageNum/newPageSize);
        setPageSize(newPageSize);
        setPage(newPage);
    }

    const handlePageChange = (newPage, newPageSize) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }

    return (
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
            <div className="pagination-container">
                <Pagination
                    onChange={handlePageChange}
                    onShowSizeChange={handlePageSizeChange}
                    total={totalItems}
                    current={page}
                    pageSize={pageSize}
                    showQuickJumper
                    showSizeChanger
                    showTotal={(total, range) => {
                        return `Showing images ${range[0]}-${range[1]} of ${total}`;
                    }}
                />
            </div>
        </div>
    );
}

export default SelectImages