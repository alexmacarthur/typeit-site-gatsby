import React, { useState } from "react";
import ListDivider from "../ListDivider";
import LazyLoader from "../LazyLoader";
import TypeIt from "typeit-react";

export default function ({ data, instance, isLast, exampleSlug }) {
  const [tiInstance, setTiInstance] = useState(null);
  const [isFrozen, setisFrozen] = useState(false);

  /**
   * Destroy the instance and clear arbitray timeouts.
   */
  const resetInstance = () => {
    if (!tiInstance) {
      return;
    }

    // Reset the instance itself.
    tiInstance.reset().go();

    // Destroy any timeouts created by callbacks and
    // special instance methods.
    if (!window.ti_exampleTimeouts[exampleSlug]) {
      return;
    }

    window.ti_exampleTimeouts[exampleSlug].forEach((item) => {
      clearTimeout(item);
      return false;
    });

    window.ti_exampleTimeouts[exampleSlug] = [];
  };

  /**
   * Freeze and unfreeze the instance.
   */
  const toggleFreeze = () => {
    if (!tiInstance) {
      return;
    }

    if (tiInstance.is("frozen")) {
      tiInstance.unfreeze();
    } else {
      tiInstance.freeze();
    }

    setisFrozen((v) => !v);
  };

  const elementFontStyles = "text-xl md:text-2xl text-gray-700 font-extralight";

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
        <div className="">
          <h3 className="font-extralight mb-3">{instance.title}</h3>
          <p>{instance.description}</p>

          <div className="my-6 md:my-12 bg-gray-100 p-8">
            {instance.element === "input" && (
              <label>
                Name: {"  "}
                <LazyLoader>
                  <TypeIt
                    as={"input"}
                    type="text"
                    options={instance.options}
                    getBeforeInit={(tiInstance) => {
                      return instance.getBeforeInit(tiInstance);
                    }}
                    getAfterInit={(instance) => {
                      setTiInstance(instance);
                      return instance;
                    }}
                    className={elementFontStyles}
                  />
                </LazyLoader>
              </label>
            )}

            {!instance.element && (
              <LazyLoader>
                <TypeIt
                  className={elementFontStyles}
                  options={instance.options}
                  getBeforeInit={(tiInstance) => {
                    return instance.getBeforeInit(tiInstance);
                  }}
                  getAfterInit={(instance) => {
                    setTiInstance(instance);
                    return instance;
                  }}
                />
              </LazyLoader>
            )}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={resetInstance} className="button">
              Reset
            </button>

            {instance.allowFreeze && (
              <button onClick={toggleFreeze} className="button">
                {isFrozen ? "Unfreeze" : "Freeze"}
              </button>
            )}
          </div>
        </div>

        <LazyLoader>
          <div dangerouslySetInnerHTML={{ __html: data.html }}></div>
        </LazyLoader>
      </div>

      {!isLast && <ListDivider className="my-10 md:my-24" />}
    </div>
  );
}
