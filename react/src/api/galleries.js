import axios from "axios";
import { API_ROOT } from "constants/api";

export const APIListGalleries = async (perPage, offset) => {
    const res = await axios.get(
        `${API_ROOT}/gallery/?limit=${perPage}&offset=${offset}`
    );
    return res;
};

export const APIDeleteGallery = async (id) => {
    const res = await axios.delete(`${API_ROOT}/gallery/${id}`);
    return res;
};

export const upload = (e,image,image_name,title,content) => {
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    e.preventDefault();
    // console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', image, image_name);
    form_data.append('title', title);
    form_data.append('content', content);
    let url = API_ROOT + '/gallery/upload';
    const headers = {
        'content-type': 'multipart/form-data'
        // 'Authorization': 'JWT fefege...'
      };
    axios.post(url, form_data, {
      headers: headers
    })
        .then(res => {
          // let response = res.
          // console.log(res.data);
          let data_was_uploaded_properly = res.data["ok"];
          if (data_was_uploaded_properly)
            alert("Successful update!");
          else
            alert(res.data["message"]);
          
        })
        .catch(err => console.log(err))
  };
