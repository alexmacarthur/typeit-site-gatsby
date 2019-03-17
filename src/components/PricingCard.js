import React from "react";
import { Link } from "gatsby";
import centsToDollars from "../helpers/centsToDollars";
import Card from "./Card";
import { sendGaEvent } from "../utilities";

export default ({
  isLight = false,
  isOnDarkBackground = false,
  optionData
}) => {
  return (
    <Card
      className="max-w-lg mx-auto h-full"
      onDarkBackground={isOnDarkBackground}
      key={optionData.slug}
    >
      <div className="bg-white py-10 h-full">
        <div className={`${isLight ? "mb-6" : ""}`}>
          <h3
            className={`${
              isLight
                ? "text-center pl-4 leading-none text-3xl self-center flex-grow"
                : ""
            }`}
            dangerouslySetInnerHTML={{ __html: optionData.htmlTitle }}
          ></h3>
          <h4 className={`text-6xl font-bold ${!isLight ? "mb-8" : ""}`}>
            ${centsToDollars(optionData.price)}
          </h4>
        </div>

        <p className="mt-4 mb-8 text-center text-gray-mediumLight">
          {optionData.description}
        </p>

        <Link
          to={`/checkout/${optionData.slug}`}
          className="button"
          onClick={() => {
            sendGaEvent("click", {
              event_category: "purchase_cta_button",
              event_label: optionData.slug
            });
          }}
        >
          Purchase License
        </Link>
      </div>
    </Card>
  );
};
