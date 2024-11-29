import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.scss"; // Đường dẫn đến file CSS của bạn

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Đang tải, vui lòng chờ...</p>
      </div>
    </div>
  );
};

export default Loading;
