import React, { useEffect, useRef, useState } from "react";
import ListDivider from "../ListDivider";
import LazyLoader from "../LazyLoader";

export default function({ data, instance, isLast, exampleSlug }) {
  const element = useRef(null);
  const [tiInstance, setTiInstance] = useState(null);
  const [isFrozen, setisFrozen] = useState(false);

  /**
   * Destroy the instance and clear arbitray timeouts.
   */
  const resetInstance = () => {
    if(!tiInstance) {
      return;
    }

    // Reset the instance itself. 
    tiInstance.reset().go();

    // Destroy any timeouts created by callbacks and 
    // special instance methods. 
    if (!window.ti_exampleTimeouts[exampleSlug]) {
      return;
    }

    window.ti_exampleTimeouts[exampleSlug].forEach(item => {
      clearTimeout(item);
      return false;
    }); 

    window.ti_exampleTimeouts[exampleSlug] = [];
  };

  /**
   * Freeze and unfreeze the instance.
   */
  const toggleFreeze = () => {
    if(!tiInstance) {
      return;
    }

    if (tiInstance.is('frozen')) {
      tiInstance.unfreeze();
    } else {
      tiInstance.freeze();
    }

    setisFrozen(!isFrozen);
  }

  useEffect(() => {
    setTiInstance(instance.func(element.current));
    
    // eslint-disable-next-line
  }, []);

  const elementFontStyles = "text-xl md:text-2xl text-gray-medium font-light";

  return (
    <div className="max-container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="">
          <h3 className="font-light mb-3">{instance.title}</h3>
          <p>{instance.description}</p>

          <div className="my-6 md:my-12 bg-gray-light p-8">
            {instance.element === "input" && (
              <>
                <label>
                  Name: {"  "}
                  <input
                    className={elementFontStyles + " ml-2"}
                    type="text"
                    ref={element}
                  />
                </label>
              </>
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

            {instance.allowFreeze && 
              <button onClick={toggleFreeze} className="button ml-2">
                {isFrozen ? 'Unfreeze' : 'Freeze'}
              </button>
            }
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
