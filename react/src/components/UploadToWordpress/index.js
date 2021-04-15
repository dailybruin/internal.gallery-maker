// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import { API_ROOT } from '../../constants/api';
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
        axios.defaults.xsrfCookieName = 'csrftoken';
        axios.defaults.xsrfHeaderName = 'X-CSRFToken';
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('image', this.state.image, this.state.image.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        let url = API_ROOT + '/gallery/upload';
        const headers = {
            'content-type': 'multipart/form-data'
            // 'Authorization': 'JWT fefege...'
          };
        axios.post(url, form_data, {
          headers: headers
        })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => console.log(err))
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
                       accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
              </p>
              <input type="submit"/>
            </form>
          </div>
        );
      }

};

export default UploadToWordpress;