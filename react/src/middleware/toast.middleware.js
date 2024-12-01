// src/middleware/toastMiddleware.js

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import messages from "./messages"; // Import tất cả các thông báo từ index.js

const toastMiddleware = (store) => (next) => (action) => {
  const actionParts = action.type.split("/"); // Tách action type thành các phần
  const [entity, actionType, status] = actionParts;

  // Tìm thông báo dựa trên các phần của action
  const toastConfig = messages?.[entity]?.[actionType]?.[status];

  if (toastConfig) {
    if (status === "pending") {
      toast.info(toastConfig, { autoClose: 3000 });
    } else if (status === "fulfilled") {
      showToast("success", toastConfig, 3000);
    } else if (status === "rejected") {
      console.log({ action });

      showToast(
        "error",
        // typeof toastConfig === "function"
        //   ? toastConfig(action.payload)
        //   : toastConfig,
        toastConfig(action.payload),
        3000
      );
    }
  }

  return next(action);
};

const showToast = (type, message) => {
  toast?.[type](message, {
    autoClose: 3000,
    position: toast?.POSITION?.TOP_RIGHT,
  });
};

export default toastMiddleware;
