import React from "react";

export default ({ headings, classList, style }) => {
  return (
    <aside className={classList} style={style}>
      <div style={{ position: "sticky", top: "7rem" }}>
        <ul>
          {headings.map(heading => {
            return (
              <li key={heading.hash}>
                <a
                  href={heading.hash}
                  className="
                                    py-2
                                    px-5
                                    text-xl
                                    inline-block
                                    text-gray-mediumLight
                                    font-light
                                    hover:text-gray-medium
                                    hoverableLink
                                "
                >
                  {heading.value}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
