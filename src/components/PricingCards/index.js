import { Link } from "gatsby";
import React from "react";
import PricingCard from "../PricingCard";

export default ({ isLight = false, productData = [] }) => {
  return (
    <>
      <ul className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6`}>
        {productData.map(optionData => {
          return (
            <li key={optionData.slug}>
              <PricingCard isLight={isLight} optionData={optionData} />
            </li>
          );
        })}
      </ul>

      <div className="text-center mt-4">
        <Link to={"/licenses"} className="text-lg">Learn More About License Options</Link>
      </div>
    </>
  );
};
