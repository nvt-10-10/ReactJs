import { decryptData, encryptData } from '../config/cryptoConfig';

// Lưu accessToken vào localStorage sau khi mã hóa
export function saveToken(accessToken, refreshToken) {
  const encryptedAccessToken = encryptData(accessToken);
  const encryptedRefreshToken = encryptData(refreshToken);
  localStorage.setItem('authToken', encryptedAccessToken);
  localStorage.setItem('refreshToken', encryptedRefreshToken);
}

// Lấy accessToken từ localStorage và giải mã
export function getToken() {
  const encryptedAccessToken = localStorage.getItem('authToken');
  if (encryptedAccessToken) {
    return decryptData(encryptedAccessToken);
  }
  return null;
}

// Lấy refreshToken từ localStorage và giải mã
export function getRefreshToken() {
  const encryptedRefreshToken = localStorage.getItem('refreshToken');
  if (encryptedRefreshToken) {
    return decryptData(encryptedRefreshToken);
  }
  return null;
}

// Xóa accessToken và refreshToken khỏi localStorage
export function removeToken() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem("email")
}
