import { post } from "../../utils/api";
import { getRefreshToken, removeToken, saveToken } from "../../utils/authToken";

const login = async (loginData) => {
  const response = await post("/auth/login", loginData);
  const data = response;
  console.log({response});
  if (data) {
    saveToken(data.authToken);
    saveToken(data.refreshToken);
    return {
      success: true,
    };
  }
  return {
    success: false,
    message: response.EM,
  };
};

const logout = async () => {
  const email = localStorage.getItem("email");
  const refreshToken =  getRefreshToken();
  const response = await post("/auth/logout", {
    email,
    refresh_token: refreshToken,
  });

  if (response.DT) {
    removeToken();
    return {
      success:true
    }
  } else {
    return {
      success:false ,
      message: response.EM
    }
  }
};

export const createAuth = {
  login,
  logout,
};
