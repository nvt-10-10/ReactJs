// TitleSection.js
import React from "react";
import { TitleSectionStyle } from "./Text.styles";

export const TitleSection = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <TitleSectionStyle
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {text}
    </TitleSectionStyle>
  );
};
