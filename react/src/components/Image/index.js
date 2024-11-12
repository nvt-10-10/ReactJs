import React, { useState, memo } from "react";
import defaultImage from "../../assets/images/logo/logo-footer.png"; // ảnh default của bạn

const Image = memo(
  ({ src, alt = "", className = "", width, height, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      if (imgSrc !== defaultImage) {
        setImgSrc(defaultImage); // Luôn dùng defaultImage khi lỗi
      }
      setIsLoading(false);
    };

    return (
      <div className="relative inline-block">
        {/* Loading skeleton */}
        {isLoading && (
          <div
            style={{ width, height }}
            className="animate-pulse bg-gray-200 rounded overflow-hidden"
          />
        )}

        {/* Image */}
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className={`
          ${className}
          ${isLoading ? "opacity-0" : "opacity-100"}
          transition-opacity duration-300
        `}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = "Image";

export default Image;
