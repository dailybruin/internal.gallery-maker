import axios from "axios";
import { API_ROOT } from "constants/api";

export const APIListGalleries = async (perPage, offset) => {
    const res = await axios.get(
        `${API_ROOT}/galleries/?limit=${perPage}offset=${offset}`
    );
    return res;
};
