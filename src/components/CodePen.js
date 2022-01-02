import React from "react";
import LazyLoader from "./LazyLoader";

const CodePen = ({ slug, name = "" }) => {
  return (
    <LazyLoader>
      <p
        class="codepen"
        data-height="300"
        data-theme-id="dark"
        data-default-tab="html,result"
        data-slug-hash={slug}
        data-user="alexmacarthur"
        style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
      >
        <span>
          See the Pen{" "}
          <a href={`https://codepen.io/alexmacarthur/pen/${slug}`}>{name}</a> by
          Alex MacArthur (
          <a href="https://codepen.io/alexmacarthur">@alexmacarthur</a>) on{" "}
          <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>
    </LazyLoader>
  );
};
export default CodePen;
