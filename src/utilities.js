import React from "react";

export function svgWrap(WrappedComponent) {
  return <WrappedComponent />;
}

export function sendGaEvent({
  event = "event",
  action = undefined,
  payload = undefined,
}) {
  if (!window.gtag) {
    console.log(`GA event: ${event}`);
    console.log(`GA action: ${action}`);
    console.log(payload);
    return;
  }

  window.gtag(event, action, payload);
}
