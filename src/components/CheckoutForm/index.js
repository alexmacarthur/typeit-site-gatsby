import React, { useState, useRef } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import uuid from "uuid/v4";
import PAYMENT_STATES from "../../payment-states";
import { sendGaEvent } from "../../utilities";

const CheckoutForm = ({ stripe, setPaymentState, setErrorMessage, productData }) => {
  const formRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // It starts as "invalid" because there's no value in it yet.
  const [elementIsComplete, setElementIsComplete] = useState(false);
  const [elementHasError, setElementHasError] = useState(false);
  const [idempotencyKey] = useState(uuid());

  const handleSubmit = async e => {
    e.preventDefault();

    setIsProcessing(true);

    let { token } = await stripe.createToken();
    let emailAddress = document.forms["checkoutForm"].elements[
      "emailAddress"
    ].value.trim();

    try {
      let response = await fetch(process.env.GATSBY_LAMBDA_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          slug: productData.slug,
          emailAddress,
          token,
          idempotencyKey
        })
      });

      let payload = await response.json();
      let chargeWasSuccessful = payload.chargeStatus && payload.chargeStatus === "succeeded";

      if (chargeWasSuccessful) {
        let amountInDollars = payload.amount / 100;

        sendGaEvent("purchase", {
          transaction_id: payload.id,
          value: amountInDollars,
          currency: "USD",
          items: [
            {
              id: productData.slug,
              name: productData.simpleTitle,
              category: "javascript_license",
              quantity: 1,
              price: amountInDollars
            }
          ]
        });

        setPaymentState(PAYMENT_STATES.SUCCESSFUL);
      } else {
        setErrorMessage(`
          The charge failed with the following message: <em>${payload.message}</em>`
        );
        setPaymentState(PAYMENT_STATES.FAILED);
      }
    } catch (e) {
      setPaymentState(PAYMENT_STATES.FAILED);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        id="checkoutForm"
        className=""
      >
        <div className="-mx-3">
          <div className="mb-4 w-full px-3">
            <label htmlFor="emailAddress" className="flex flex-col">
              Email Address
              <input
                type="email"
                id="emailAddress"
                className="mt-1"
                required
              ></input>
            </label>
          </div>

          <div className="mb-4 w-full px-3">
            <label htmlFor="emailAddress" className="flex flex-col">
              Card Number
              <CardElement
                onChange={event => {
                  setElementHasError(event.error !== undefined);
                  setElementIsComplete(event.complete);
                }}
                className="p-3 mt-1"
                style={{
                  base: {
                    padding: "48px",
                    fontFamily: "Source Sans Pro, sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "18px",
                    "::placeholder": { color: "#aab7c4" },
                    ":-webkit-autofill": { color: "#32325d" }
                  },
                  invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                    ":-webkit-autofill": { color: "#fa755a" }
                  }
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-8">
          {!isProcessing && (
            <button
              className="button"
              disabled={!elementIsComplete || elementHasError}
              type="submit"
            >
              Complete Purchase
            </button>
          )}

          {isProcessing && (
            <span className="text-purple-600 block text-center">
              Processing...
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default injectStripe(CheckoutForm);
