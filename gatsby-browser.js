/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require("prismjs/themes/prism-okaidia.css");
require("./src/css/root.css");

exports.shouldUpdateScroll = ({
  routerProps,
  prevRouterProps,
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(routerProps.location);
  let isSamePage = prevRouterProps?.location?.pathname === routerProps?.location?.pathname;

  // We have a hash! So, either pop to the top (for a different page), or stay at the current position (for the same page), and then smooth-scroll to the anchor.
  if(routerProps.location.hash) {

    // When we're about to do a smooth-scroll, store that we should force
    // lazy loaded items to render NOW, in order to avoid janky scroll issues.
    window.ti_shouldExpandLazyLoadedContent = true;

    setTimeout(() => {
      try {
        let targetEl = document.querySelector(routerProps.location.hash);
        if (targetEl) window.scrollTo(0, targetEl.offsetTop - 105);
      } catch (e) {}
    }, 100);

    return isSamePage ? currentPosition : [0, 0];
  }

  return true;
}

exports.onRouteUpdate = () => {
  document.body.classList.remove("overflow-hidden");
}
