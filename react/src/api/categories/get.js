import { get } from "../../utils/api";

export const getAllCategory = async   () => {
    try {
        const response = await get("/categories");
        if (response) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
};

