import { get } from "../../utils/api";

export const getTop16Quote = async (page = 1) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  const apiUrl = `/quotes/top-12?${params.toString()}`;
  const response = await get(apiUrl);
  return response;
};
