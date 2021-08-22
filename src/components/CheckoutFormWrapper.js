import React, { useState, useRef } from "react";

export default ({ render }) => {
  let ref = useRef(null);
  let [isInvisible, setIsInvisible] = useState(true);
  let [fixedHeight, setFixedHeight] = useState(null);

  /**
   * When we've recieved word that the child component has rendered,
   * slide the parent wrapper open.
   */
  const fireWhenRendered = () => {
    let fixedHeight = ref.current.scrollHeight;
    setFixedHeight("0px");

    setTimeout(() => {
      setFixedHeight(`${fixedHeight}px`);

      setTimeout(() => {
        setIsInvisible(false);
      }, 100);
    }, 1);

    setTimeout(() => {
      setFixedHeight("");
    }, 151); // Based on the transition duration set via CSS.
  };

  return (
    <div
      ref={ref}
      className={isInvisible ? "opacity-0" : "opacity-1"}
      style={{
        height: fixedHeight ? fixedHeight : "",
      }}
    >
      {render(fireWhenRendered)}
    </div>
  );
};
