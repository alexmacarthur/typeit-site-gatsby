import React, { useEffect, useState } from "react";
import TypeIt from "typeit-react";

export default function ({ snippet }) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(true);
  });

  return (
    <div className="relative max-w-3xl mx-auto pt-0 md:pt-20 px-3 z-10">
      <style>{".hero-animation .place { font: inherit; }"}</style>
      <TypeIt
        as={"h1"}
        className="hero-animation text-center mb-20 text-4xl md:text-5xl font-light max-w-xl mx-auto"
        aria-label="The most versatile animated typing utility on the planet."
        options={{
          speed: 50,
          startDelay: 900,
        }}
        getBeforeInit={(instance) => {
          return instance
            .type("the mot versti", { delay: 100 })
            .move(-8, { delay: 100 })
            .type("s", { delay: 400 })
            .move(null, { to: "START", instant: true, delay: 300 })
            .move(1, { delay: 200 })
            .delete(1)
            .type("T", { delay: 225 })
            .pause(200)
            .move(2, { instant: true })
            .pause(200)
            .move(5, { instant: true })
            .move(5, { delay: 200 })
            .type("a", { delay: 350 })
            .move(null, { to: "END" })
            .type("le typing utlity")
            .move(-4, { delay: 150 })
            .type("i")
            .move(null, { to: "END" })
            .type(' on the <span class="place">internet</span>', { delay: 400 })
            .delete(".place", { delay: 800, instant: true })
            .type('<em><strong class="font-semibold">planet.</strong></em>', {
              speed: 100,
            });
        }}
      />
      <div
        className={`transition-all duration-500 delay-300 ${
          isDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </div>
  );
}
