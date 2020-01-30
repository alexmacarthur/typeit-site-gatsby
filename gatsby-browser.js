/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require("prismjs/themes/prism-okaidia.css");
require("./src/scss/tailwind-base.scss");
require("./src/scss/root.scss");
require("./src/scss/tailwind-components.scss");
require("./src/scss/tailwind-utilities.scss");

exports.shouldUpdateScroll = ({
  routerProps, 
  prevRouterProps, 
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(routerProps.location);
  let isSamePage = prevRouterProps.location.pathname === routerProps.location.pathname;

  // We have a hash! So, either pop to the top (for a different page), or stay at the current position (for the same page), and then smooth-scroll to the anchor.
  if(routerProps.location.hash) {

    // When we're about to do a smooth-scroll, fire an event to make sure that lazy-loaded
    // components are rendered, to avoid inaccurate scrolls.
    //
    // The timeout _should_ be long enough to allow the components to render before scrolling, 
    // but we could set up a Promise to guarantee this.
    window.dispatchEvent(window.expandLazyStuffEvent);
    window.expandLazyStuffEvent_hasFired = true;

    setTimeout(() => {
      document.querySelector(routerProps.location.hash).scrollIntoView({ behavior: "smooth" });
    }, 100);
    return isSamePage ? currentPosition : [0, 0];
  }

  return true;
}

exports.onClientEntry = () => {
  window.expandLazyStuffEvent = new Event('expandLazyStuff');
}

exports.onRouteUpdate = () => {
  document.body.classList.remove("overflow-hidden");
}
