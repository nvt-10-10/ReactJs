import { get } from "../../utils/api";

const getImage = async (image) => {
    const response =get(`/images/${image}`);
    return response;
}

export const imageApi = {
    getImage
}