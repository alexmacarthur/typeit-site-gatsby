import React from "react";

export default (props) => {
  let { children, className, onDarkBackground, ...otherProps } = props;
  let outerPadding = onDarkBackground ? "p-0 md:p-0" : "p-3 md:p-3";
  let innerPadding = onDarkBackground ? "p-2 md:p-7" : "p-3 md:p-10";

  return (
    <div
      className={`rounded bg-white text-center ${outerPadding} ${className}`}
      {...otherProps}
    >
      <div
        className={`rounded border-4 border-gray-100 h-full ${innerPadding}`}
      >
        {children}
      </div>
    </div>
  );
};
