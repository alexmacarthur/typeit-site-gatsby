import { Link } from "gatsby";
import React from "react";
import centsToDollars from "../helpers/centsToDollars";
import Card from "./Card";

const purchaseLinks = {
  limited: process.env.GATSBY_STRIPE_LIMITED_LICENSE_LINK,
  unlimited: process.env.GATSBY_STRIPE_UNLIMITED_LICENSE_LINK,
};

export default ({
  isLight = false,
  isOnDarkBackground = false,
  optionData,
}) => {
  const { slug, htmlTitle, price, description } = optionData;
  return (
    <Card
      className="max-w-lg mx-auto h-full"
      onDarkBackground={isOnDarkBackground}
      key={slug}
    >
      <div className="bg-white py-10 h-full flex flex-col">
        <div className={`${isLight ? "mb-6" : ""}`}>
          <h3
            className={`${
              isLight
                ? "text-center leading-none text-3xl self-center flex-grow"
                : ""
            }`}
            dangerouslySetInnerHTML={{ __html: htmlTitle }}
          ></h3>
          <h4 className={`text-6xl font-bold ${!isLight ? "mb-8" : ""}`}>
            ${centsToDollars(price)}
          </h4>
        </div>

        <p className="mt-0 mb-12 text-center text-gray-mediumLight">
          {description}
        </p>

        <div className="mt-auto">
          {/* <Link to={purchaseLinks[slug]} target="_blank">
            Purchase
          </Link> */}

          <form action={process.env.GATSBY_STRIPE_CHECKOUT_URL} method="POST">
            <input type="hidden" name="slug" value={slug} />
            <button type="submit" class="button">
              Checkout
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
};
