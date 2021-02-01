import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CreateUpdateGallery.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function SelectedImage(props) {
    return (
        <div className="selected-img-container">
            <img src={props.img.small_img_url}
                alt={props.img.alt_text} 
            />
            <FontAwesomeIcon 
                className="button-overlay" 
                icon={faTimesCircle}
                onClick={() => {props.onRemoveClick(props.img)}}
            />
        </div>
    );
}

function CreateUpdateGallery(props) {
    const [selectedImagesData, setSelectedImagesData] = useState([]);
    const [wpImageData, setWpImageData] = useState([]);

    useEffect(() => {
        axios.get(`https://wp.dailybruin.com/wp-json/wp/v2/media?per_page=30`)
            .then(res => {
                let data = res.data.map(img => 
                    ({
                        source_url: img.source_url,
                        small_img_url: img.media_details.sizes['db-multimedia'].source_url,
                        alt_text: img.alt_text,
                        selected: false
                    })
                );
                setWpImageData(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const toggleImageHighlight = (clickedImg) => {
        setWpImageData(
            wpImageData.map(
                img => img.source_url === clickedImg.source_url ? {...img, selected: !img.selected} : img
            )
        );
    }

    const removeSelectedImage = (clickedImg) => {
        toggleImageHighlight(clickedImg);
        setSelectedImagesData(
            selectedImagesData.filter(img => img.source_url !== clickedImg.source_url)
        );
    }

    const handleImageClick = (clickedImg) => {
        if (clickedImg.selected) {
            removeSelectedImage(clickedImg);
        }
        else {
            let newImageData = clickedImg;
            delete newImageData.selected;
            setSelectedImagesData(
                [...selectedImagesData, newImageData]
            );
            toggleImageHighlight(clickedImg);
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
                        {
                            wpImageData.map(img => 
                                <img src={img.small_img_url} 
                                    alt={img.alt_text}
                                    className={img.selected ? "img-selected" : ""}
                                    onClick={() => handleImageClick(img)}
                                    key={img.source_url}
                                />
                            )
                        }
                    </div>
                    <div className="selected-imgs">
                        {
                            selectedImagesData.length > 0 ?
                                selectedImagesData.map(img => 
                                    <SelectedImage
                                        img={img}
                                        onRemoveClick={removeSelectedImage}
                                        key={img.small_img_url}
                                    />
                                )
                            :
                                <div>Selected images will appear here</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUpdateGallery