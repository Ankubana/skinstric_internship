import React from "react";
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonLoader = ({ width = "100%", height = "20px", borderRadius = "4px" }) => {
  return (
    <div
      className="skeleton-loader"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default SkeletonLoader; 