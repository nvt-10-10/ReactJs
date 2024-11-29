// HeadingSection.js
import React from "react";
import { HeadingSectionStyle } from "./Text.styles";

export const HeadingSection = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <HeadingSectionStyle
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
    >
      {text}
    </HeadingSectionStyle>
  );
};
