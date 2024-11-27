import React, { useState } from "react";
import iconVitrade from "../../assets/images/logo/logo-footer.png";
const Image = ({ src, alt, className = "", srcError, onClick }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const handleError = () => {
    if (imgSrc !== (srcError || iconVitrade)) {
      setImgSrc(srcError || iconVitrade);
    }
  };

  return (
    <img
      src={imgSrc || iconVitrade}
      alt={alt || "image"}
      className={className}
      onError={() => handleError()}
      onClick={onClick}
    />
  );
};

export default Image;
