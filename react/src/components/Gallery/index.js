import React, { Fragment } from "react";
import RUG from "react-upload-gallery";
import "react-upload-gallery/dist/style.css";
import axios from 'axios';

// import { initialState } from "./data";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {images : null};
    }
    render() {
        return (
            <Fragment>
            {/* <RUG action="http://example.com/upload" />
            <h1 style={style.title}>Hold Drag and Sort Items</h1> */}
            <RUG
                onChange={(images) => {
                        console.log("hey!")
                        console.log(typeof(images))
                        let formdata = new FormData()
                        formdata.append('img',images)
                        
                    this.setState({ images : images }) // save current component
                    axios.post('http://localhost:8000/django/image/',formdata)
                    .then (function (response) {
                        console.log("I sent the object?")
                        })
                    }
                }
            />
            {console.log(this.state)}
            </Fragment>
        );
    }
}

export default Gallery;

