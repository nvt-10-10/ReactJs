import { get } from "../../utils/api";
import {
  getRefreshToken,
  getToken,
  removeToken,
  saveToken,
} from "../../utils/authToken";

export const checkToken = async () => {
  const authToken = getToken();
  const result = await get("/auth/checkToken", authToken);
  if (!result.sucess) {
    const refreshToken = getRefreshToken();
    const resultRefreshToken = await get("/auth/refreshToken", refreshToken);
    if (!resultRefreshToken) return false;
    saveToken(
      resultRefreshToken.data.authToken,
      resultRefreshToken.data.refreshToken
    );
  }
  return true;
};

export const logout = async () => {
  removeToken();
};
