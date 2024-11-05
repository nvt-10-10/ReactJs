import axiosInstance from "../config/axiosConfig";

// Hàm GET
export const get = async (url,header, params = {}, config = {}) => {
  try {
    const response = await axiosInstance.get(url, { params, ...config });
    return response.data;
  } catch (error) {
    // Xử lý lỗi hoặc trả về lỗi
    throw error;
  }
};

// Hàm POST
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    // Xử lý lỗi hoặc trả về lỗi
    throw error;
  }
};

// Hàm PATCH
export const patch = async (url, data = {}, config = {}) => {
  try {
    const response = await axiosInstance.patch(url, data, config);
    return response.data;
  } catch (error) {
    // Xử lý lỗi hoặc trả về lỗi
    throw error;
  }
};

// Hàm DELETE
export const del = async (url, config = {}) => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    // Xử lý lỗi hoặc trả về lỗi
    throw error;
  }
};
