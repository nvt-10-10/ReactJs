import React from "react";
import { ButtonPrimaryStyled } from "./Button.styles";
import iconArrowRight from "../../assets/images/icons/arrow-right.svg";

const ButtonPrimary = ({ text, img = iconArrowRight, onClick, isSelected, className = "" }) => {
  return (
    <div>
      <ButtonPrimaryStyled.StyledButtonPrimary className={className} isSelected={isSelected} onClick={onClick}>
        {text}
        <ButtonPrimaryStyled.StyledImagePrimary src={img}></ButtonPrimaryStyled.StyledImagePrimary>
      </ButtonPrimaryStyled.StyledButtonPrimary>
    </div>
  );
};

export default ButtonPrimary;
