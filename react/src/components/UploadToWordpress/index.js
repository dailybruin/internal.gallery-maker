// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../../constants/api';
import { upload } from '../../api/galleries';

class UploadToWordpress extends Component{
    state = {
        title: '',
        content: '',
        image: null
      };
    
      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };
    
      handleImageChange = (e) => {
        this.setState({
          image: e.target.files[0]
        })
      };
    
      handleSubmit = (e) => {
        console.log(e);
        let image = this.state.image;
        let image_name = this.state.image.name;
        let title = this.state.title;
        let content = this.state.content;
        upload(e,image,image_name,title,content);
      };
    
      render() {
        return (
          <div className="App">
            <form onSubmit={this.handleSubmit}>
              <p>
                <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
              </p>
              <p>
                <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} />
    
              </p>
              <p>
                <input type="file"
                       id="image"
                       accept="image/png, image/jpeg"
                       onChange={this.handleImageChange} required/>
              </p>
              <input type="submit"/>
            </form>
          </div>
        );
      }

};

export default UploadToWordpress;