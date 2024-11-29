import React from "react";
import { ButtonPrimaryStyled } from "./Button.styles";
import iconArrowRight from "../../assets/images/icons/arrow-right.svg";
import { Link } from "react-router-dom";

const ButtonPrimary = ({
  text,
  img = iconArrowRight,
  href = "",
  onClick,
  isSelected = true,
  className = "",
  type = "a", // Default type is 'a'
  typeButton= "button"
}) => {
  const child = (
    <ButtonPrimaryStyled.StyledButtonPrimary
      className={className}
      disabled={isSelected}
      onClick={onClick}
      as={type}
      type={typeButton}
    >
      {text}
      <ButtonPrimaryStyled.StyledImagePrimary src={img} />
    </ButtonPrimaryStyled.StyledButtonPrimary>
  );

  // Sử dụng Link khi type là 'a', nếu không thì sử dụng trực tiếp button
  if (type === "a") {
    return <Link to={href}>{child}</Link>;
  }

  return child;
};

export default ButtonPrimary;
