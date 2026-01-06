// src/components/Container.tsx
// Container.jsx
import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={`px-4 sm:px-6 lg:px-1  lg:mt-[120px]  ${className} `}
     
    >
      {children}
    </div>
  );
};

export default Container;
