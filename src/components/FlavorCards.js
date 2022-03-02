import React from "react";
import { Link } from "gatsby";
import JsIcon from "./icons/JsIcon";
import WordPressIcon from "./icons/WordPressIcon";
import ReactIcon from "./icons/ReactIcon";

export default () => {
  const flavors = [
    {
      name: "Vanilla JS",
      path: "vanilla",
      logo: JsIcon,
    },
    {
      name: "WordPress",
      path: "wordpress",
      logo: WordPressIcon,
    },
    {
      name: "React",
      path: "react",
      logo: ReactIcon,
    },
  ];

  return (
    <div className="text-center">
      <ul className="flex flex-wrap justify-center -mr-12">
        {flavors.map((flavor, index) => {
          return (
            <li
              key={flavor.path}
              className="mb-12 pr-12 flex flex-col w-1/2 md:w-auto text-center last:mb-0"
            >
              <h4 className="mb-4">{flavor.name}</h4>
              <div className="w-24 h-24 mx-auto mb-6">
                <flavor.logo
                  style={{ maxWidth: "100%" }}
                  className="w-24 h-24"
                />
              </div>
              <Link
                to={`/docs/${flavor.path}`}
                className="text-gray-700 text-base hover:text-purple-400"
              >
                View the Docs
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
