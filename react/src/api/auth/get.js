import { get } from "../../utils/api";
import {
  getRefreshToken,
  getToken,
  removeToken,
  saveToken,
} from "../../utils/authToken";

export const checkToken = async () => {
  const authToken = getToken();
  const apiUrl = `/auth/check-token/${authToken}`;

  const result = await get(apiUrl);
  console.log({ result, apiUrl });

  if (!result.success) {
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
