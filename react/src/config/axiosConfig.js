import axios from 'axios';
import{ getToken, getRefreshToken, saveToken, removeToken }   from '../utils/authToken';

// Tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  withCredentials: true, 
});

// Xử lý request
axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Xử lý response
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;

    // Kiểm tra nếu có lỗi và lỗi đó là 401
    if (response && response.status === 401 && !response.config.__isRetryRequest) {
      response.config.__isRetryRequest = true; // Đánh dấu để tránh vòng lặp vô hạn

      // Số lần thử lại tối đa
      const maxRetries = 3;
      const retryCount = response.config.__retryCount || 0;

      if (retryCount < maxRetries) {
        response.config.__retryCount = retryCount + 1;

        try {
          // Thực hiện yêu cầu làm mới token
          const refreshToken = getRefreshToken(); // Hàm giả định để lấy refresh token
          const refreshResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, { refreshToken });
          const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data; // Giả định phản hồi chứa accessToken và refreshToken

          // Lưu token mới vào localStorage
          saveToken(accessToken, newRefreshToken);

          // Thực hiện lại yêu cầu gốc với token mới
          response.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(response.config);
        } catch (refreshError) {
          removeToken();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // Nếu số lần thử lại đã vượt quá giới hạn, xóa token và đưa người dùng đến trang đăng nhập
        removeToken();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
