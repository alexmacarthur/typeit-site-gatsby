import React, { useEffect, useState } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { sendGaEvent } from "../utilities";

const ConfirmationTemplate = (props) => {
  const { productData } = props.pageContext;
  const [confirmationNumber, setConfirmationNumber] = useState("");

  useEffect(() => {
    let shouldCancel = false;

    (async () => {
      let paymentId = "";
      let data;
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      try {
        paymentId = JSON.parse(window.localStorage.getItem("typeItPurchases"))[
          id
        ];
      } catch (e) {}

      if (paymentId) {
        setConfirmationNumber(paymentId);
      }

      try {
        const response = await fetch(
          `${process.env.GATSBY_STRIPE_GET_SESSION_URL}?id=${id}`
        );
        data = await response.json();
        paymentId = data.paymentId;
      } catch (e) {
        return;
      }

      const priceInDollars = productData.price / 100;

      sendGaEvent({
        action: "purchase",
        payload: {
          transaction_id: paymentId,
          value: priceInDollars,
          currency: "USD",
          items: [
            {
              id: productData.slug,
              name: productData.simpleTitle,
              category: "javascript_license",
              quantity: 1,
              price: priceInDollars,
            },
          ],
        },
      });

      window.localStorage.setItem(
        "typeItPurchases",
        JSON.stringify({
          [id]: paymentId,
        })
      );

      if (shouldCancel) return;

      setConfirmationNumber(paymentId);
    })();

    () => {
      shouldCancel = true;
    };
  }, []);

  const word = productData.friendlySlug === "limited" ? "a" : "an";

  return (
    <PageLayout isFullWidth={true}>
      <div className="mx-auto max-w-2xl pt-4 pb-8">
        <h1>Purchase complete!</h1>

        {confirmationNumber && (
          <div className="flex flex-col md:flex-row md:gap-4 items-baseline -mt-4 mb-8">
            <small className="text-gray-mediumLight block text-base">
              Confirmation Number:
            </small>
            <span className="text-base break-all">{confirmationNumber}</span>
          </div>
        )}

        <p>
          Thank you for purchasing {word} {productData.simpleTitle}, which
          enables you to use TypeIt on {productData.usageScope}.
        </p>

        <p>
          In a few moments, you'll receive an email with more detailed license
          information, as well as instructions on how to get started.
        </p>

        <p>
          If you have any questions, reach out at{" "}
          <a href="mailto:alex@macarthur.me">alex@macarthur.me</a>. To make
          things more efficient, please include your confirmation ID noted
          below:
        </p>

        <h4>One More Thing...</h4>
        <p>
          This is a fun side project that relies on kind word-of-mouth from
          people like you. If you're able, I'd <strong>greatly</strong>{" "}
          appreciate you{" "}
          <a href="https://github.com/alexmacarthur/typeit/" target="_blank">
            giving TypeIt a ⭐ on GitHub
          </a>
          , or{" "}
          <a
            target="_blank"
            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftypeitjs.com&text=Check%20out%20TypeIt%2C%20the%20most%20versatile%20JavaScript%20typewriter%20effect%20library%20on%20the%20planet.&hashtags=javascript%2Cwebanimation%2Cwebdev"
          >
            tweeting about it
          </a>
          .
        </p>
      </div>
    </PageLayout>
  );
};

export default ConfirmationTemplate;
