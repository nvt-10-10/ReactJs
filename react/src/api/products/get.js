import { get } from "../../utils/api";

export const getTop6Product = async () => {
  const response = await get("/products/top-6");
  return response;
};
