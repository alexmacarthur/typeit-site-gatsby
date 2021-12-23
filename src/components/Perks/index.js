import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Bolt from "../icons/Bolt";
import Happy from "../icons/Happy";
import Flexible from "../icons/Flexible";
import Clipboard from "../icons/Clipboard";

const iconComponents = {
  Bolt,
  Happy,
  Flexible,
  Clipboard,
};

export default function () {
  const perksData = useStaticQuery(graphql`
    query PerksQuery {
      site {
        siteMetadata {
          perks {
            text
            component
          }
        }
      }
    }
  `);

  return (
    <ul className="flex flex-wrap justify-center -mr-6 -mt-6">
      {perksData.site.siteMetadata.perks.map((perk) => {
        const Icon = iconComponents[perk.component];

        return (
          <li
            key={perk.component}
            className="mb-6 pr-6 flex flex-col w-1/2 md:w-auto"
          >
            <i className="text-2xl md:text-5xl flex justify-center items-center text-gray-mediumLight mb-3">
              <Icon className="h-12 w-12" />
            </i>
            <span className="ml-2 text-gray-mediumLight text-lg md:text-xl">
              {perk.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
