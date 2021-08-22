import React from "react";

export const getPathWithHash = (location) => {
  const { pathname, hash } = location;

  return `${pathname.replace(/\/$/, "")}${hash}`;
};

export const scrollTo = (e, setPath, toggleMenu) => {
  const [, heading] = e.target.href.split("#");
  const headingNode = document.querySelector(`#${heading}`);

  if (!headingNode) {
    return true;
  }

  e.preventDefault();

  const headingTop = Math.abs(
    headingNode.getBoundingClientRect().top + window.scrollY
  );

  window.history.pushState({}, "", e.target.href);
  setPath(getPathWithHash(window.location));
  toggleMenu();

  scroll({
    top: headingTop - 120,
    behavior: "smooth",
  });
};

export const headingIsActive = (heading, path) => {
  return heading.path === path;
};
