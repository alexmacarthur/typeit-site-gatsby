import React, { useState, useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import centsToDollars from "../helpers/centsToDollars";
import PAYMENT_STATES from "../payment-states";
import SEO from "../components/seo";
import PageLayout from "../components/layouts/PageLayout";
import CheckoutFormWrapper from "../components/CheckoutFormWrapper";
import CheckoutForm from "../components/CheckoutForm";

const ProductTemplate = (props) => {
  const emailString =
    '<a href="mailto:alex@macarthur.me">alex@macarthur.me</a>';
  const errorMessageEnding = `<br><br>Please either refresh the page to try again, or email ${emailString} to get this all figured out.`;
  const { thisProductData } = props.pageContext;
  const [paymentState, setPaymentState] = useState(PAYMENT_STATES.NOT_STARTED);
  const [errorMessage, setErrorMessage] = useState(
    `Not exactly sure what wrong there.`
  );
  const [shouldRenderForm, setShouldRenderForm] = useState(false);

  useEffect(() => {
    setShouldRenderForm(true);
  }, []);

  return (
    <PageLayout>
      <SEO title={thisProductData.simpleTitle} />

      <div className="container-top-padding container-bottom-padding">
        <div className="text-center">
          <h1
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: thisProductData.htmlTitle }}
          ></h1>
          <p className="mb-12">{thisProductData.description}</p>
        </div>

        <div className="max-w-lg mx-auto py-10 md:p-10 rounded border-4 border-gray-light bg-white">
          {paymentState === PAYMENT_STATES.FAILED && (
            <div className="px-5">
              <h3>Sorry, something went wrong!</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: errorMessage + errorMessageEnding,
                }}
              />
            </div>
          )}

          {paymentState === PAYMENT_STATES.SUCCESSFUL && (
            <div className="px-5">
              <h3>Thanks for purchasing!</h3>
              <p>
                You should be getting an email containing license information
                and instructions on getting started.
              </p>
              <p>
                If you don't mind, I'd greatly appreciate a{" "}
                <a
                  href="https://github.com/alexmacarthur/typeit"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  star on GitHub!
                </a>
              </p>
            </div>
          )}

          {paymentState === PAYMENT_STATES.PAYPAL && (
            <div className="px-5">
              <h3>Thanks for purchasing with PayPal!</h3>

              <p>
                Once I see you've sent a payment, I'll send over an email with
                license information and instructions on getting started. But no
                need to wait!{" "}
                <a
                  href="https://github.com/alexmacarthur/typeit"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  You can get the source code right now on GitHub.
                </a>
              </p>

              <p
                dangerouslySetInnerHTML={{
                  __html: `In the meantime, don't be afraid to reach out with questions by emailing me at ${emailString}!`,
                }}
              ></p>
            </div>
          )}

          {paymentState === PAYMENT_STATES.NOT_STARTED && (
            <>
              <div className="mb-10 px-5">
                <div className="max-w-lg mx-auto">
                  <h2 className="mb-4 text-4xl">
                    <strong>
                      Total: ${centsToDollars(thisProductData.price)}
                    </strong>
                  </h2>
                  <p>
                    After checkout is complete, you'll be sent an email with
                    license information and instructions on how to start using
                    TypeIt.
                  </p>
                </div>
              </div>

              <div className="px-5">
                {shouldRenderForm && (
                  <CheckoutFormWrapper
                    render={(fireWhenRendered) => {
                      return (
                        <StripeProvider
                          apiKey={process.env.GATSBY_STRIPE_PUBLISHABLE_KEY}
                        >
                          <Elements>
                            <CheckoutForm
                              fireWhenRendered={fireWhenRendered}
                              paymentState={paymentState}
                              setPaymentState={setPaymentState}
                              setErrorMessage={setErrorMessage}
                              productData={thisProductData}
                            />
                          </Elements>
                        </StripeProvider>
                      );
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductTemplate;
