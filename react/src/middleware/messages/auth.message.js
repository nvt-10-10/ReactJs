// src/middleware/messages/userMessages.js
export const auth = {
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

  checkToken: {
    // pending: "Đang đăng ký...",
    // fulfilled: "Đăng ký thành công!",
    rejected: (errorMessage) => `Vui lòng đăng nhập để thực hiện chức năng này`,
  },
};
