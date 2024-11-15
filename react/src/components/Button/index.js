import React from "react";
import { ButtonPrimaryStyled } from "./Button.styles";
import iconArrowRight from "../../assets/images/icons/arrow-right.svg";
import { Link } from "react-router-dom";

const ButtonPrimary = ({
  text,
  img = iconArrowRight,
  href = "",
  onClick,
  isSelected,
  className = "",
  type = "a", // Default type is 'a'
}) => {
  const child = (
    <ButtonPrimaryStyled.StyledButtonPrimary
      className={className}
      isSelected={isSelected}
      onClick={onClick}
      as={type}
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
