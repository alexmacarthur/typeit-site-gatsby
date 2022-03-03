import React from "react";
import LazyLoader from "./LazyLoader";

const CodePen = ({ slug, name = "" }) => {
  const height = 450;

  return (
    <LazyLoader>
      <p
        className="codepen"
        data-height={height}
        data-theme-id="dark"
        data-default-tab="js,result"
        data-slug-hash={slug}
        data-user="alexmacarthur"
        style={{
          height: `${height}px`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid",
          margin: "1em 0",
          padding: "1em",
        }}
      >
        <span>
          Sexe the Pen{" "}
          <a href={`https://codepen.io/alexmacarthur/pen/${slug}`}>{name}</a> by
          Alex MacArthur (
          <a href="https://codepen.io/alexmacarthur">@alexmacarthur</a>) on{" "}
          <a href="https://codepen.io">CodePen</a>.
        </span>
      </p>

      <script
        async
        src="https://cpwebassets.codepen.io/assets/embed/ei.js"
      ></script>
    </LazyLoader>
  );
};
export default CodePen;
