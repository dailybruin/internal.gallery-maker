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
