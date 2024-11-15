// src/middleware/messages/quoteMessages.js

export const quote = {
  create: {
    pending: "Đang tạo yêu cầu báo giá...",
    fulfilled: "Tạo yêu cầu báo giá thành công!",
    rejected: (errorMessage) =>
      `Lỗi khi tạo yêu cầu báo giá: ${errorMessage || "Có lỗi xảy ra"}`,
  },

  update: {
    pending: "Đang cập nhật yêu cầu báo giá...",
    fulfilled: "Cập nhật yêu cầu báo giá thành công!",
    rejected: (errorMessage) =>
      `Lỗi khi cập nhật yêu cầu báo giá: ${errorMessage || "Có lỗi xảy ra"}`,
  },

  resgiter: {
    pending: "Đang đăng ký yêu cầu báo giá...",
    fulfilled: "Đăng ký yêu cầu báo giá thành công!",
    rejected: (errorMessage) =>
      `Lỗi khi đăng ký yêu cầu báo giá: ${errorMessage || "Có lỗi xảy ra"}`,
  },
};
