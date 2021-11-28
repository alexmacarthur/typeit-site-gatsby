import React from "react";

export function svgWrap(WrappedComponent) {
  return <WrappedComponent />;
}

export function sendEvent(eventName, eventProps) {
  eventProps.branch_name = process.env.GATSBY_BRANCH || "local";

  if (!window.plausible || process.env.NODE_ENV === "development") {
    return console.log({
      event_name: eventName,
      event_data: eventProps,
    });
  }

  plausible(eventName, {
    props: eventProps,
  });
}
