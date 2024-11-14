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
}) => {
  return (
    <Link to={href}>
      <div>
        <ButtonPrimaryStyled.StyledButtonPrimary
          className={className}
          isSelected={isSelected}
          onClick={onClick}
          href={href}
        >
          {text}
          <ButtonPrimaryStyled.StyledImagePrimary
            src={img}
          ></ButtonPrimaryStyled.StyledImagePrimary>
        </ButtonPrimaryStyled.StyledButtonPrimary>
      </div>
    </Link>
  );
};

export default ButtonPrimary;
