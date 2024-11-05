import { get } from "../../utils/api";

export const getTop4Supplier = async () => {
  const response = await get("/users/top-4");
  return response;
};

export const getTop12Supplier = async (page = 1, search, category, country) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (country) params.append("country", country);

  const apiUrl = `/users/top-12?${params.toString()}`;
  const response = await get(apiUrl);
  return response;
};
