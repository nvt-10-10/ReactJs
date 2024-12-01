import styled from "styled-components";

// StyledButtonPrimary có thể là <a> hoặc <button>
const StyledButtonPrimary = styled(({ as: Component, ...props }) => (
  <Component {...props} />
))`
  display: inline-flex;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 43px;
  background: #333;

  color: var(--Error, #fff);
  font-family: "Be Vietnam Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 19.2px */
  transition: all 0.5s ease;
  z-index: 5;
  border: none; /* Đảm bảo không có border cho button */

  &:hover {
    gap: 30px;
    background: var(--color-primary);
    color: #fff !important;
  }
  &:hover img {
    background: #333;
  }

  /* Kiểu cho button nếu muốn thêm hover khác */
  &:disabled {
    background: #999;
    color: #ccc;
  }
`;

const StyledImagePrimary = styled.img`
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 25px;
  background: rgba(234, 75, 72, 0.63);
  object-fit: contain;
  transition: all 0.5s ease;
`;

export const ButtonPrimaryStyled = {
  StyledButtonPrimary,
  StyledImagePrimary,
};
