import React from "react";

const Banner = ({ children }) => {
  return (
    <div className="bg-yellow-400 px-6 py-4 rounded-md mb-6">
      <p className="m-0">{children}</p>
    </div>
  );
};

export default Banner;
