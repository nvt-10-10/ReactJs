import React, { useState } from "react";
import iconVitrade from "../../assets/images/logo/logo-footer.png"
const Image = ({ src, alt, className = "", srcError }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const handleError = () => {
    if (imgSrc !== (srcError || iconVitrade)) {
      setImgSrc(srcError || iconVitrade);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => handleError()}
    />
  );
};

export default Image;
