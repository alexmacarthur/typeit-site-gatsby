export default (addToTimeoutStore) => {
  return {
    "simple-string": {
      title: "Type a simple string.",
      description:
        "At it's most basic level, just target an element, define a string, and voilà.",
      options: {
        strings: "This is a simple string.",
        waitUntilVisible: true,
      },
      getBeforeInit: (instance) => instance,
    },
    "multiple-strings": {
      title: "Type multiple strings.",
      description:
        "To type multiple strings that stack on top of each other, pass an array of them.",
      options: {
        strings: ["This is a great string.", "But here is a better one."],
        speed: 50,
        waitUntilVisible: true,
      },
      getBeforeInit: (instance) => instance,
    },
    "form-inputs": {
      title: "Type into form elements.",
      description:
        "Target any input or textarea like any other element, and you're set.",
      options: {
        strings: "Alex MacArthur",
        waitUntilVisible: true,
      },
      getBeforeInit: (instance) => instance,
      element: "input",
    },
    "companion-methods": {
      title: "Type dynamic, life-like effects.",
      description:
        "Use the included instance methods to control the smallest details, including speed, deletions, pausing, and even cursor movement.",
      options: {
        speed: 50,
        waitUntilVisible: true,
      },
      //Never let yesterday use up too much of today.
      getBeforeInit: (instance) => {
        instance
          .type("Nvver", { delay: 300 })
          .move(-3)
          .delete(1)
          .type("e")
          .move(null, { to: "END" })
          .type(" let yees")
          .pause(300)
          .delete(2)
          .type("sterday use up to muc")
          .move(-4)
          .type("o")
          .move(null, { to: "END" })
          .type("h of today.")
          .pause(500)
          .break({ delay: 500 })
          .break({ delay: 500 })
          .type("<em>- Will Rogers</em>");
        return instance;
      },
    },
    "freeze-unfreeze": {
      title: "Pause & resume on demand.",
      description: "Included `freeze()` and `unfreeze()` methods make it easy.",
      allowFreeze: true,
      options: {
        strings:
          "Click the 'freeze' button to freeze and unfreeze this instance as much as you want.",
        waitUntilVisible: true,
      },
      getBeforeInit: (instance) => instance,
    },
    "after-step-callback": {
      title: "Fire code at key points of any animation.",
      description:
        "Callback methods are available for before and after each string or character is typed, as well as after the entire instance is finished.",
      options: {
        strings: ["Look, it's rainbow text!"],
        afterStep: function (instance) {
          let letters = "0123456789ABCDEF";
          let color = "#";
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          instance.getElement().style.color = color;
        },
      },
      getBeforeInit: (instance) => instance,
    },
    "exec-companion-method": {
      title: "Fire any arbitrary code whenever.",
      description:
        "If the provided callback methods aren't enough, the included `.exec()` method allows you to fire code at any point during the animation, and is async-friendly.",
      options: {
        waitUntilVisible: true,
      },
      getBeforeInit: (instance) => {
        return instance
          .type("Hold up!")
          .exec(async () => {
            //-- Return a promise that resolves after something happens.
            await new Promise((resolve, reject) => {
              let ti = setTimeout(() => {
                return resolve();
              }, 2000);

              addToTimeoutStore("exec-companion-method", ti);
            });
          })
          .type(" OK, now go.");
      },
    },
  };
};
