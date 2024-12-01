export const apiMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/pending")) {
    console.log("API Request bắt đầu:", action);
  } else if (action.type.endsWith("/fulfilled")) {
    console.log("API Request thành công:", action);
  } else if (action.type.endsWith("/rejected")) {
    console.log("API Request thất bại:", action);
  }
  return next(action);
};
