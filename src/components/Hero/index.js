import React, { useEffect } from "react";
import TypeIt from "typeit";

export default function(props) {
  let element = null;

  useEffect(() => {
    if (element === null) {
      return;
    }

    let instance = new TypeIt(element, {
      speed: 50,
      startDelay: 900
    })
      .type("The most versatile animated typing utility on the internte")
      .pause(500)
      .options({ speed: 75, deleteSpeed: 300 })
      .delete(2)
      .pause(250)
      .type("et")
      .pause(750)
      .options({ speed: 100, deleteSpeed: 75 })
      .delete(8)
      .pause(750)
      .type("<em>planet.</em>")
      .go();

      return () => {  
        instance.destroy(true);
      }
      
      // eslint-disable-next-line
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto pt-0 md:pt-20 px-3 z-10">
      <h1
        aria-label="The most versatile animated typing utility on the planet."
        className="text-center mb-20 text-4xl md:text-5xl"
        ref={el => {
          element = el;
        }}
      ></h1>
      <div dangerouslySetInnerHTML={{ __html: props.snippet }} />
    </div>
  );
}
