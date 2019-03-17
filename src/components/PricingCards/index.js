import React from "react";
import PricingCard from "../PricingCard";

export default ({ isLight = false, productData = [] }) => {
  return (
    <div className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6`} >
      {productData.map(optionData => {
        return (
          <div key={optionData.slug}>
            <PricingCard isLight={isLight} optionData={optionData} />
          </div>
        );
      })}
    </div>
  );
};
