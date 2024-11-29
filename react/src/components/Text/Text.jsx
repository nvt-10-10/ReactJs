import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const generateResponsiveStyles = (propName, propValue) => {
  if (!propValue || typeof propValue !== "object") return ""; // Không trả về nếu không có giá trị hợp lệ

  return Object.entries(propValue).map(
    ([breakpoint, value]) => css`
      @media (min-width: ${breakpoint === "xs"
          ? "0px"
          : breakpoint === "sm"
          ? "576px"
          : breakpoint === "md"
          ? "768px"
          : breakpoint === "lg"
          ? "992px"
          : breakpoint === "xl"
          ? "1200px"
          : "1320px"}) {
        ${propName}: ${value};
      }
    `
  );
};

const defaultText = css`
  ${({ color }) => color && `color: ${color};`}
  ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily};`}
  ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle};`}
  ${({ fw }) =>
    fw && typeof fw !== "object"
      ? `font-weight: ${fw};`
      : generateResponsiveStyles("font-weight", fw)}
  ${({ lh }) =>
    lh && typeof lh !== "object"
      ? `line-height: ${lh};`
      : generateResponsiveStyles("line-height", lh)}
  ${({ textAlign }) =>
    textAlign && typeof textAlign !== "object"
      ? `text-align: ${textAlign};`
      : generateResponsiveStyles("text-align", textAlign)}
  ${({ fs }) =>
    fs && typeof fs !== "object"
      ? `font-size: ${fs};`
      : generateResponsiveStyles("font-size", fs)}

  // max-width
  ${({ maxWidth }) =>
    maxWidth && typeof maxWidth !== "object"
      ? `max-width: ${maxWidth};`
      : generateResponsiveStyles("max-width", maxWidth)}

  // min-width
  ${({ minWidth }) =>
    minWidth && typeof minWidth !== "object"
      ? `min-width: ${minWidth};`
      : generateResponsiveStyles("min-width", minWidth)}

  // max-height
  ${({ maxHeight }) =>
    maxHeight && typeof maxHeight !== "object"
      ? `max-height: ${maxHeight};`
      : generateResponsiveStyles("max-height", maxHeight)}

  // min-height
  ${({ minHeight }) =>
    minHeight && typeof minHeight !== "object"
      ? `min-height: ${minHeight};`
      : generateResponsiveStyles("min-height", minHeight)}

  // padding
  ${({ padding }) =>
    padding && typeof padding !== "object"
      ? `padding: ${padding};`
      : generateResponsiveStyles("padding", padding)}

  // margin
  ${({ margin }) =>
    margin && typeof margin !== "object"
      ? `margin: ${margin};`
      : generateResponsiveStyles("margin", margin)}

  // border
  ${({ border }) =>
    border && typeof border !== "object"
      ? `border: ${border};`
      : generateResponsiveStyles("border", border)}

  // border-radius
  ${({ borderRadius }) =>
    borderRadius && typeof borderRadius !== "object"
      ? `border-radius: ${borderRadius};`
      : generateResponsiveStyles("border-radius", borderRadius)}

  // box-shadow
  ${({ boxShadow }) =>
    boxShadow && typeof boxShadow !== "object"
      ? `box-shadow: ${boxShadow};`
      : generateResponsiveStyles("box-shadow", boxShadow)}
`;

const TextStyle = styled(({ as: Component = "p", ...props }) => (
  <Component {...props} />
))`
  ${defaultText}
`;

// Component Text now accepts children as the default prop
const Text = ({
  as,
  color,
  fontFamily,
  fontStyle,
  fw,
  lh,
  textAlign,
  textTransform,
  fs,
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  padding,
  margin,
  border,
  borderRadius,
  boxShadow,
  children, // Using children prop for content
  className,
}) => {
  return (
    <TextStyle
      as={as}
      color={color}
      fontFamily={fontFamily}
      fontStyle={fontStyle}
      fw={fw}
      lh={lh}
      textAlign={textAlign}
      textTransform={textTransform}
      fs={fs}
      maxWidth={maxWidth}
      minWidth={minWidth}
      maxHeight={maxHeight}
      minHeight={minHeight}
      padding={padding}
      margin={margin}
      border={border}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      className={className}
    >
      {children} {/* Render children as content */}
    </TextStyle>
  );
};

Text.propTypes = {
  as: PropTypes.elementType,
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontStyle: PropTypes.string,
  fw: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lh: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "right", "center", "justify"]),
  textTransform: PropTypes.string,
  fs: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Updated to allow object for breakpoints
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  border: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  boxShadow: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired, // Using children instead of content
};

export { Text };
