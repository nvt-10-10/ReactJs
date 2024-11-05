// Text.styles.js

import styled, { css } from "styled-components";

import { respondTo } from "../../utils/media";

const generateResponsiveStyles = (propName, propValue) => {
  return (
    propValue &&
    css`
      ${Object.entries(propValue).map(
        ([breakpoint, value]) => css`
          ${respondTo(breakpoint)} {
            ${propName}: ${value};
          }
        `
      )}
    `
  );
};

const defaultText = css`
  color: ${({ color, defaultColor }) => `var(${color}, ${defaultColor})`};
  font-family: ${(fontFamily) => fontFamily || "Be Vietnam Pro"};
  font-style: ${(fontStyle) => fontStyle || "normal "};
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  line-height: ${({ lineHeight }) => lineHeight || "normal"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  text-transform ${({ textTransform }) => textTransform || "inherit"};

    // Responsive styles
  ${generateResponsiveStyles("font-size", ({ fontSize }) => fontSize)}
  ${generateResponsiveStyles("font-weight", ({ fontWeight }) => fontWeight)}
  ${generateResponsiveStyles("line-height", ({ lineHeight }) => lineHeight)}
  ${generateResponsiveStyles("text-align", ({ textAlign }) => textAlign)}
`;

export const Text = styled(({ as: Component, ...props }) => <Component {...props} />)`
  ${defaultText}
`;
// Title Section Style
export const TitleSectionStyle = styled.p`
  color: var(--primary-color, #e31e25);
  font-family: "Be Vietnam Pro";
  font-size: ${({ fontSize }) => fontSize || "15px"};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  line-height: ${({ lineHeight }) => lineHeight || "normal"};
  text-transform: uppercase;
  ${generateResponsiveStyles("font-size", ({ fontSize }) => fontSize)}
  ${generateResponsiveStyles("font-weight", ({ fontWeight }) => fontWeight)}
  ${generateResponsiveStyles("line-height", ({ lineHeight }) => lineHeight)}
  ${generateResponsiveStyles("text-align", ({ textAlign }) => textAlign)}
`;

// Heading Section Style
export const HeadingSectionStyle = styled.h2`
  color: var(--text-color-heading, #1a1a1a);
  font-family: "Be Vietnam Pro";
  font-size: ${({ fontSize }) => fontSize || "49px"};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  line-height: ${({ lineHeight }) => lineHeight || "122.449%"};
  text-transform: capitalize;
  ${generateResponsiveStyles("font-size", ({ fontSize }) => fontSize)}
  ${generateResponsiveStyles("font-weight", ({ fontWeight }) => fontWeight)}
  ${generateResponsiveStyles("line-height", ({ lineHeight }) => lineHeight)}
  ${generateResponsiveStyles("text-align", ({ textAlign }) => textAlign)}
`;

// Text Description Section Style
export const TextDescSectionStyle = styled.p`
  color: #666;
  text-align: justify;
  font-family: "Be Vietnam Pro";
  font-size: ${({ fontSize }) => fontSize || "18px"};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || 400};
  line-height: ${({ lineHeight }) => lineHeight || "177.778%"};
  ${generateResponsiveStyles("font-size", ({ fontSize }) => fontSize)}
  ${generateResponsiveStyles("font-weight", ({ fontWeight }) => fontWeight)}
  ${generateResponsiveStyles("line-height", ({ lineHeight }) => lineHeight)}
  ${generateResponsiveStyles("text-align", ({ textAlign }) => textAlign)}
`;

const TextWrapperH2 = styled.h2`
  color: #1a1a1a;
  font-family: "Be Vietnam Pro";
  font-size: ${({ fsText }) => fsText || "49px"};
  font-style: normal;
  text-transform: capitalize;
  font-weight: 200;
  line-height: ${({ lhText }) => lhText || "122.449%"};
`;

const TextWrapperEm = styled.em`
  color: #1a1a1a;
  font-family: "Be Vietnam Pro";
  font-size: ${({ fsStrong }) => fsStrong || "49px"};
  font-style: normal;
  text-transform: capitalize;
  font-weight: 700;
  line-height: 122.449%;
`;
export const TextWrapperStyle = {
  TextWrapperH2,
  TextWrapperEm,
};
