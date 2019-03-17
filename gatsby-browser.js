/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require("prismjs/themes/prism-okaidia.css");
require("./src/scss/tailwind.scss");

exports.shouldUpdateScroll = ({
  routerProps, 
  prevRouterProps, 
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(routerProps.location);
  let isSamePage = prevRouterProps.location.pathname === routerProps.location.pathname;

  // We have a hash! So, either pop to the top (for a different page), or stay at the current position (for the same page), and then smooth-scroll to the anchor.
  if(routerProps.location.hash) {
    setTimeout(() => {
      document.querySelector(routerProps.location.hash).scrollIntoView({ behavior: "smooth" });
    }, 100);
    return isSamePage ? currentPosition : [0, 0];
  }

  return true;
}

exports.onRouteUpdate = () => {
  document.body.classList.remove("overflow-hidden");
}
