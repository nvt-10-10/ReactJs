// TextDescription.js
import React from "react";
import { TextDescSectionStyle } from "./Text.styles";

export const TextDescription = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <TextDescSectionStyle
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {text}
    </TextDescSectionStyle>
  );
};
