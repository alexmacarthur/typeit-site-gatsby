import React, { useEffect, useRef, useState } from "react";
import ListDivider from "../ListDivider";
import LazyLoader from "../LazyLoader";

export default function({ data, instance, isLast }) {
  const element = useRef(null);
  const [tiInstance, setTiInstnace] = useState(null);
  const resetInstance = () => {
    if (tiInstance) {
      tiInstance.reset().go();
    }
  };

  useEffect(() => {
    setTiInstnace(instance.func(element.current));
    
    // eslint-disable-next-line
  }, []);

  const elementFontStyles = "text-xl md:text-2xl text-gray-medium font-semibold";

  return (
    <div className="max-container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="">
          <h3 className="font-light mb-3">{instance.title}</h3>
          <p>{instance.description}</p>

          <div className="my-6 md:my-12">
            {instance.element === "input" && (
              <input
                className={elementFontStyles}
                type="text"
                ref={element}
              />
            )}

            {!instance.element && (
              <span
                className={elementFontStyles}
                ref={element}
              ></span>
            )}
          </div>
          <div>
            <button onClick={resetInstance} className="button">
              Reset
            </button>
          </div>
        </div>

          <LazyLoader>
            <div
              dangerouslySetInnerHTML={{ __html: data.html }}
            ></div>
          </LazyLoader>
      </div>

      {!isLast && 
        <ListDivider className="my-10 md:my-24" />
      }
    </div>
  );
}
