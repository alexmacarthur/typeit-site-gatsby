import React, { useState, useRef, useContext } from "react";
import TypeIt from "typeit";
import defaultOptions from "./defaultOptions";
import PageCoverContext from "../../PageCoverContext";
import { sendGaEvent } from "../../utilities";

export default function() {
  const demoModalRef = useRef(null);
  const { setPageCoverContents } = useContext(PageCoverContext);
  const [values, updateValues] = useState(
    defaultOptions.reduce((opts, opt) => {
      opts[opt.label] = opt.value;
      return opts;
    }, {})
  );

  const submit = function(e) {
    e.preventDefault();

    let valuesCopy = { ...values };
    document.body.classList.add("overflow-hidden");

    if (!valuesCopy.strings) {
      valuesCopy.speed = 10;
      valuesCopy.strings =
        "You didn't set a string, so you get one that contains the word <em>butt.</em>";
    }

    setTimeout(() => {
      new TypeIt(demoModalRef.current, valuesCopy).go();
    }, 50);

    setPageCoverContents(
      <div className="text-center">
        <h3 className="mb-6">Here's your example:</h3>
        <span ref={demoModalRef}></span>
      </div>
    );
  };

  const isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  const formatValueTypes = values => {
    for (let key in values) {
      if (key !== "strings") {
        let value = values[key];

        if (isNumeric(value)) {
          values[key] = Number(value);
        } else {
          values[key] = value.toString() === "true";
        }
      }
    }

    return values;
  };

  const updateInput = event => {
    let updatedValues = { ...values };
    let inputValue = event.target.value;

    if (event.target.id === "strings") {
      inputValue = inputValue.replace(/\r|\n/g, "<br>");
    }

    updatedValues[event.target.id] = inputValue;
    updatedValues = formatValueTypes(updatedValues);
    updateValues(updatedValues);
  };

  return (
    <div className="max-w-6xl m-auto relative">
      <form className="flex flex-wrap -mx-4 -my-3" onSubmit={submit}>
        {defaultOptions.map(option => {
          return (
            <div
              className={`px-4 py-3 ${
                option.type === "text" ? "w-full" : "w-1/2"
              }`}
              key={option.label}
            >
              <label className="flex flex-col">
                {option.label}

                {option.type === "number" && (
                  <input
                    type={option.type}
                    defaultValue={values[option.label]}
                    id={option.label}
                    onBlur={updateInput}
                    className="mt-2 w-full"
                  />
                )}

                {option.type === "boolean" && (
                  <select
                    id={option.label}
                    onBlur={updateInput}
                    defaultValue={values[option.label] ? "true" : "false"}
                    className="mt-2 w-full"
                  >
                    <option value={"true"}>true</option>
                    <option value={"false"}>false</option>
                  </select>
                )}

                {option.type === "text" && (
                  <textarea
                    rows="3"
                    id={option.label}
                    placeholder="Enter one or multiple strings per line. You can use HTML too!"
                    onBlur={updateInput}
                    className="mt-2 w-full font-thin"
                  ></textarea>
                )}
              </label>
            </div>
          );
        })}

        <div className="px-4 py-3 w-full">
          <button
            className="button"
            type="submit"
            onClick={() => {
              sendGaEvent("submit", {
                event_category: "demo_form",
                event_label: values.strings
              });
            }}
          >
            Start Demo
          </button>
        </div>
      </form>
    </div>
  );
}
