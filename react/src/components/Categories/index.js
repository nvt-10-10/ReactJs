import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Categories.scss";
import { useSelector } from "react-redux";
import { CategoryItem } from "./CategoryItem";

export const Categories = ({ OnClick, categoryActive }) => {
  const { categories, error, loading } = useSelector((state) => state.category);

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="custom-arrow prev-arrow">
        &#10094; {/* Mũi tên trái */}
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button onClick={onClick} className="custom-arrow next-arrow">
        &#10095; {/* Mũi tên phải */}
      </button>
    );
  };
  const itemsCount = categories.length;
  const slidesToShow = itemsCount + 1 < 6 ? itemsCount + 1 : 6; // Show up to 6 items, or fewer if less are available
  const isSinglePage = itemsCount <= slidesToShow;
  const settings = {
    className: "center",
    infinite: !isSinglePage, // Disable infinite scrolling if there are fewer items than the slides
    centerPadding: "60px",
    slidesToShow: slidesToShow, // Dynamically set based on available items
    slidesToScroll: 1,
    // swipeToSlide: true,
    swipeToSlide: !isSinglePage,
    arrows: !isSinglePage, // Only show arrows if there are more items than the visible slides
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    loops: false,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  //localhost:9999/quote#

  return (
    <div className="custom-slide">
      <div className="slider-container">
        <Slider {...settings}>
          <a
            href="/"
            onClick={(e) => {
              OnClick(undefined, e); // Gọi hàm OnClick khi nhấn vào category
            }}
          >
            <CategoryItem
              category={{ name: "All", image: null }}
              active={!categoryActive}
            />
          </a>
          {categories.map((category) => (
            <a
              href="/"
              key={category.id}
              onClick={(e) => {
                OnClick(category.id, e); // Gọi hàm OnClick khi nhấn vào category
              }}
            >
              <CategoryItem
                category={category}
                active={category.id == categoryActive}
              />
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};
