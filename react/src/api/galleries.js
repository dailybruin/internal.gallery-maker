import axios from "axios";
import { API_ROOT } from "constants/api";

// for CSRF headers
// https://docs.djangoproject.com/en/dev/ref/csrf/#ajax
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function generate_csrf_headers(){
  return {
    headers: {
      "X-CSRFToken": getCookie('csrftoken')
    }
  }
}

export const APIListGalleries = async (perPage, offset) => {
    const res = await axios.get(
        `${API_ROOT}/gallery/?limit=${perPage}&offset=${offset}`
    );
    return res;
};

export const APIDeleteGallery = async (id) => {
    const res = await axios.delete(`${API_ROOT}/gallery/${id}`, generate_csrf_headers());
    return res;
};
