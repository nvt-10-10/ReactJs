import { post } from "../../utils/api";
import { saveToken } from "../../utils/authToken";

export const login = async (loginData) => {
  const response = await post("/auth/login", loginData);
  const data = response;
  if (data) {
    saveToken(data.authToken, data.refreshToken, data?.role);
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};

export const register = async (registerData) => {
  const response = await post("/auth/register", registerData);
  const data = response;
  if (data) {
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};
