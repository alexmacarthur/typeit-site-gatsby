import React from "react";

export default ({ headings, classList, style }) => {
  return (
    <aside className={classList} style={style}>
      <div 
        style={{ position: "sticky", top: "7rem", height: "calc(100vh - 10rem)" }} 
        className={"overflow-auto"}
      >
        <ul>
          {headings.map(heading => {

            return (
              <li key={heading.hash}>
                <span className="inline-block">
                  <a
                    href={heading.hash}
                    className="py-2 mx-5 text-xl inline-block text-gray-mediumLight font-light hover:text-gray-medium hoverableLink"
                  >
                    {heading.value}
                  </a>
                </span>

                {heading.subHeadings.length > 0 && 
                  <ul>
                    {heading.subHeadings.map(subHeading => {
                      return (
                        <li key={subHeading.hash}>
                          <span className="ml-8 mx-5 inline-block">
                            <a
                              href={subHeading.hash}
                              className="text-base 
                              py-2 text-gray-mediumLight font-light hover:text-gray-medium hoverableLink"
                            >
                              {subHeading.value}
                            </a>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                }
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
