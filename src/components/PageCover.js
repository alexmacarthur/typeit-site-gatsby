import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default ({ render, setPageCoverContents }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className={`
                    h-full 
                    w-full
                    bg-white
                    left-0
                    top-0
                    fixed
                    z-50
                    flex
                    justify-center
                    overflow-auto
                    items-center
                `}
    >
      <div className="p-4">
        <div>{render()}</div>
        <div className="absolute translate-half left-50 mt-3">
          <button
            onClick={() => setPageCoverContents("")}
            className="flex items-center closeLink mt-4"
          >
            <FontAwesomeIcon icon={faTimes} />

            <span className="text-base ml-2">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
