import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeather,
  faLaugh,
  faHandSpock,
  faMapSigns,
} from "@fortawesome/free-solid-svg-icons";

const componentMap = {
  Feather: <FontAwesomeIcon className="perkIcon" icon={faFeather} />,
  Laugh: <FontAwesomeIcon className="perkIcon" icon={faLaugh} />,
  Spock: <FontAwesomeIcon className="perkIcon" icon={faHandSpock} />,
  Signs: <FontAwesomeIcon className="perkIcon" icon={faMapSigns} />,
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
        return (
          <li
            key={perk.component}
            className="mb-6 pr-6 flex flex-col w-1/2 md:w-auto"
          >
            <i className="text-2xl md:text-5xl">
              {componentMap[perk.component]}
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
