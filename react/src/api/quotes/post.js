import { post } from "../../utils/api";

export const create = async (data) => {
  return await post("/quotes", data, {}, true);
};
