import React from "react";

export function svgWrap(WrappedComponent) {
  return <WrappedComponent />;
}

export function sendGaEvent(action, payload) {
  if (!window.gtag) {
    console.log(`GA action: ${action}`);
    console.log(payload);
    return;
  }

  window.gtag("event", action, payload);
}
