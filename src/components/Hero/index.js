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
            .type("the mot versti", {delay: 100})
            .move(-8, {speed: 25, delay: 100})
            .type('s')
            .move('START')
            .move(1, {delay: 200})
            .delete(1)
            .type('T')
            .move(12, {delay: 200})
            .type('a', {delay: 250})
            .move('END')
            .type('le animated typing utlity')
            .move(-4)
            .type('i')
            .move('END')
            .type(' on the internet', {delay: 400})
            .delete(8, {delay: 600})
            .type('<em><strong>planet.</strong></em>');
        }}
      />

      <div dangerouslySetInnerHTML={{ __html: snippet }} style={{marginTop: '50rem'}}/>
    </div>
  );
}
