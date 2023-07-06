import { InstanceMethod, Stroke } from "./types";

const isObject = (thing) => typeof thing === "object" && thing !== null;

const stringifyEach = (arr: any[]) => {
  return arr.map((item) => {
    try {
      let strignified = JSON.stringify(item);

      // Remove quotes from keys and add spacing between items.
      return strignified.replace(/\"(.+?)\":/gi, "$1: ").replace(/,/, "$1 ");
    } catch (e) {
      return item;
    }
  });
};

const getAverage = (delays: number[]): number => {
  const total = delays.reduce((a, b) => a + b);

  return Math.floor(total / delays.length);
};

export const processTemplate = (
  template,
): {
  instanceMethods: string;
  options: string;
} => {
  // remove line breaks
  template = template.replace(/(\r\n|\n|\r)/gm, "");
  // remove spaces
  template = template.replace(/(?!\))(\s+)\./g, ".");

  const instanceMethods = template.replace(
    /new TypeIt\((\'|\").+?(\'|\"),[ ]?{.+?}.*?\)/,
    "",
  );
  const options = template.match(
    /new TypeIt\((?:\'|\").+?(?:\'|\"),[ ]?({.+?}).*?\)/,
  )[1];

  return {
    instanceMethods,
    options: JSON.parse(prepAsJsonString(options)),
  };
};

export const buildInstance = ({ strokes, instance }) => {
  let template = `new TypeIt("#element", { 
    lifeLike: false, 
    speed: 0 
})
`;

  const delays = [];

  strokes.forEach(
    (
      {
        data,
        timeStamp,
        prependDelay,
      }: {
        data: string | InstanceMethod;
        timeStamp: number;
        prependDelay?: boolean;
      },
      index,
    ) => {
      const delay = Math.round(
        !index ? 0 : timeStamp - strokes[index - 1].timeStamp,
      );

      delays.push(delay);

      const insertDelay = () => {
        let calculatedDelay = delay || getAverage(delays);
        if (!calculatedDelay) return;

        instance.pause(calculatedDelay);
        template += `\t.pause(${calculatedDelay})\n`;
      };

      // Makes it possible to pass instance methods
      // with more complex arguments.
      if (isObject(data)) {
        const { methodName, args } = data as InstanceMethod;

        if (prependDelay) {
          insertDelay();
        } else {
          args[1] = args[1] || {};
          args[1]["speed"] = Math.round(delay / Math.abs(args[0]));
        }

        template += `\t.${methodName}(${stringifyEach(args).join(", ")})\n`;
        return instance[methodName](...args);
      }

      // Sometimes, the delay is `0`.
      if (delay) {
        insertDelay();
      }

      if (/%0A/i.test(encodeURI(data as string))) {
        template += `\t.break()\n`;
        return instance.break();
      }

      if ((data as string).length === 1) {
        template += `\t.type("${data}")\n`;
        return instance.type(data);
      }
    },
  );

  return { instance, template: `${template}\t.go();` };
};

export const prepAsJsonString = (str): string => {
  const keyVals = str
    // remove curly braces
    .replace(/{|}/g, "")

    // split on commas to separate key/value pairs
    .split(",")
    .map((v) => v.trim())

    // result: [ [key, value], [key, value] ]
    .map((v) => v.split(":").map((v) => v.trim()))

    // put back into colon-separated pairs wrapped in quotes
    .reduce((accum, [key, value]) => {
      return accum + `"${key}": ${value},`;
    }, "")

    // remove trailing commas
    .replace(/^,|,$/g, "")

    // guarantee double quotes
    .replace(/'/g, '"');

  return `{${keyVals}}`;
};

export const instanceMethodsToArray = (
  instanceMethods: string,
): InstanceMethod[] => {
  const splitMethods = instanceMethods
    .split(/(?:\.)(?=[a-z])/gi)
    .filter((i) => !!i);

  const instanceMethodData = splitMethods.map((method) => {
    const matches = method.match(/(^.+)\((.*?)\)/);

    const methodArguments = matches[2]
      .split(",")
      .map((arg) => arg.trim())
      .map((arg) => {
        try {
          arg = /^{.*?}$/.test(arg || null)
            ? prepAsJsonString(arg)
            : arg.replace(/^('|")|('|")$/g, "");
          return JSON.parse(arg);
        } catch (_e) {}

        return arg;
      });

    return {
      methodName: matches[1],
      args: methodArguments,
    };
  });

  return instanceMethodData.filter((m) => !/go/i.test(m.methodName));
};
