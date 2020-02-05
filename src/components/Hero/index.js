import React from "react";
import TypeIt from "typeit-react";

export default function({snippet}) {
  return (
    <div className="relative max-w-3xl mx-auto pt-0 md:pt-20 px-3 z-10">
      <TypeIt 
        element={"h1"}
        className="text-center mb-20 text-4xl md:text-5xl"
        aria-label="The most versatile animated typing utility on the planet."
        options={{
          speed: 50,
          startDelay: 900
        }}
        getBeforeInit={(instance) => {
          return instance
            .type("The most versatile animated typing utility on the internte")
            .pause(500)
            .options({speed: 75, deleteSpeed: 300 })
            .delete(2)
            .pause(250)
            .type("et")
            .pause(750)
            .options({speed: 100, deleteSpeed: 75 })
            .delete(8)
            .pause(750)
            .type("<em>planet.</em>");
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: snippet }} />
    </div>
  );
}
