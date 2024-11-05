import { css } from "styled-components";

const breakpoints = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1320px",
};

// Hàm respondTo
const respondTo = (breakpoint, type = "min") => {
  const size = breakpoints[breakpoint];

  if (size) {
    return (content) => css`
      @media (${type}-width: ${size}) {
        ${content};
      }
    `;
  }
  return null;
};

export { respondTo };
