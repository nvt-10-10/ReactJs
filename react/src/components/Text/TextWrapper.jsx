// TextWrapper.js
import React from "react";
import { TextWrapperStyle } from "./Text.styles";
import Image from "../Image";
import decorTextWrapper from "../../assets/images/decor/mask-group.png";

export const TextWrapper = ({
  text,
  strong,
  position = "right",
  fsText = "49px",
  fsStrong = "49px",
  lhText = "122.449%",
  color,
  align,
  br = false,
}) => {
  let content;
  if (position === "left") {
    content = (
      <>
        <TextWrapperStyle.TextWrapperEm fsStrong={fsStrong}>
          {strong}
        </TextWrapperStyle.TextWrapperEm>{" "}
        {br ? <br /> : null} {text}
      </>
    );
  } else {
    content = (
      <>
        {text} {br ? <br /> : null}
        <TextWrapperStyle.TextWrapperEm fsStrong={fsStrong}>
          {strong}
        </TextWrapperStyle.TextWrapperEm>
      </>
    );
  }

  return (
    <div className="text-center mt-8">
      <TextWrapperStyle.TextWrapperH2
        lhText={lhText}
        fsText={fsText}
        align={align}
        color={color}
      >
        {content}
      </TextWrapperStyle.TextWrapperH2>
      <Image src={decorTextWrapper} className="mt-10" />
    </div>
  );
};
