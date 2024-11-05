import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Pagination.scss";

const getNumberOfPages = (width) => {
  if (width < 576) return 5; // Mobile
  else if (width < 768) return 6; // Small (sm)
  else if (width < 992) return 9; // Medium (md)
  else return 10; // Large (lg) or above
};

export const MyPagination = ({ Meta, position = 'left' ,onPageChange}) => {
  const [visiblePages, setVisiblePages] = useState(getNumberOfPages(window.innerWidth));

  const getPosition = (position) => {
    switch (position) {
      case "left":
        return "justify-content-start";
      case "center":
        return "justify-content-center";
      case "right":
        return "justify-content-end";
      default:
        return "justify-content-start";
    }
  };

  useEffect(() => {
    const handleResize = () => setVisiblePages(getNumberOfPages(window.innerWidth));

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!Meta || typeof Meta.page !== 'number' || typeof Meta.total_pages !== 'number') {
    return null; // Handle invalid Meta
  }

  const { page, total_pages } = Meta;

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(total_pages, startPage + visiblePages - 1);

    // Add ellipses for long pagination
    if (startPage > 1) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page}  onClick= {()=> onPageChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    if (endPage < total_pages) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    return items;
  };

  return (
    <div>
      <Pagination className={`d-flex ${getPosition(position)} custom-pagination`}>
        <Pagination.Prev disabled={page === 1} onClick= {()=> onPageChange(Meta.page -1)} />
        {renderPaginationItems()}
        <Pagination.Next disabled={page === total_pages}  onClick= {()=> onPageChange(Meta.page + 1)}/>
      </Pagination>
    </div>
  );
};