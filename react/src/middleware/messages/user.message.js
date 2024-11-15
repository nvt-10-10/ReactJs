// src/middleware/messages/userMessages.js
export const user = {
  login: {
    pending: "Đang đăng nhập...",
    fulfilled: "Đăng nhập thành công!",
    rejected: (errorMessage) =>
      `Lỗi khi đăng nhập: ${errorMessage || "Có lỗi xảy ra"}`,
  },
  resgiter: {
    pending: "Đang đăng ký...",
    fulfilled: "Đăng ký thành công!",
    rejected: (errorMessage) =>
      `Lỗi khi đăng ký: ${errorMessage || "Có lỗi xảy ra"}`,
  },
};
