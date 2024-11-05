import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "../Image/Image";
import iconApple from "../../assets/images/icons/apple.svg";
import "./Categories.scss";
import { useDispatch, useSelector } from "react-redux";

export const Categories = () => {
  const {categories,error,loading} = useSelector((state) => state.category);
  const base_url = process.env.REACT_APP_API_IMAGE;

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
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,/*  */
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    loops:false,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
    },
  };
 
  return (
    <div className="custom-slide">
      <div className="slider-container">
        <Slider {...settings}>
          {categories.map((category) => (
            <a href="#">
              <div className="d-flex flex-column justify-content-center align-items-center category-item" key={category.id}>
                <figure>
                  <Image className="icon" src={`${base_url}${category.image}`} srcError={iconApple} />
                </figure>
                <h5 className={`name ${category.active ? "active" : ""}`}>{category.name} </h5>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};
