import { HeadingSectionStyle, TextDescSectionStyle, TitleSectionStyle, TextWrapperStyle } from "./Text.styles";
import decorTextWrapper from "../../assets/images/decor/mask-group.png";
import Image from "../Image/Image";
export const TitleSection = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <TitleSectionStyle fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
      {text}
    </TitleSectionStyle>
  );
};

export const HeadingSection = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <HeadingSectionStyle fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
      {text}
    </HeadingSectionStyle>
  );
};

export const TextDescription = ({ text, fontSize, fontWeight, lineHeight }) => {
  return (
    <TextDescSectionStyle fontSize={fontSize} fontWeight={fontWeight} lineHeight={lineHeight}>
      {text}
    </TextDescSectionStyle>
  );
};

export const TextWrapper = ({ text, strong, position = "right", fsText = "49px", fsStrong = "49px", lhText = "122.449%", color, align, br = false }) => {
  let content;
  if (position === "left") {
    content = (
      <>
        <TextWrapperStyle.TextWrapperEm fsStrong={fsStrong}>{strong}</TextWrapperStyle.TextWrapperEm> {br ? <br /> : null} {text}
      </>
    );
  } else {
    content = (
      <>
        {text} {br ? <br /> : null}
        <TextWrapperStyle.TextWrapperEm fsStrong={fsStrong}>{strong}</TextWrapperStyle.TextWrapperEm>
      </>
    );
  }

  return (
    <div className="text-center mt-8">
      <TextWrapperStyle.TextWrapperH2 lhText={lhText} fsText={fsText} align={align} color={color}>
        {content}
      </TextWrapperStyle.TextWrapperH2>
      <Image src={decorTextWrapper} className="mt-10"></Image>
    </div>
  );
};
