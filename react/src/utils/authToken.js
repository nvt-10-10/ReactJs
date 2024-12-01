import { decryptData, encryptData } from "../config/cryptoConfig";

// Lưu accessToken vào localStorage sau khi mã hóa
export function saveToken(accessToken, refreshToken, role) {
  const encryptedAccessToken = encryptData(accessToken);
  const encryptedRefreshToken = encryptData(refreshToken);
  console.log({ role });

  const encryptedRole = encryptData(role);
  localStorage.setItem("authToken", encryptedAccessToken);
  localStorage.setItem("refreshToken", encryptedRefreshToken);
  localStorage.setItem("role", encryptedRole);
}

// Lấy accessToken từ localStorage và giải mã
export function getToken() {
  const encryptedAccessToken = localStorage.getItem("authToken");
  if (encryptedAccessToken) {
    return decryptData(encryptedAccessToken);
  }
  return null;
}

// Lấy refreshToken từ localStorage và giải mã
export function getRefreshToken() {
  const encryptedRefreshToken = localStorage.getItem("refreshToken");
  if (encryptedRefreshToken) {
    return decryptData(encryptedRefreshToken);
  }
  return null;
}

export function getRole() {
  const encryptedRole = localStorage.getItem("role");
  if (encryptedRole) {
    return decryptData(encryptedRole);
  }
  return null;
}

// Xóa accessToken và refreshToken khỏi localStorage
export function removeToken() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("email");
}
