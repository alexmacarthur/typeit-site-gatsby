import { Link } from "gatsby";
import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
} from "react";
import { getPathWithHash, scrollTo, headingIsActive } from "./util";

const topLevelClasses = `font-normal border-b-2 border-gray pt-8 mb-4`;
const nonTopLevelClasses = `font-light hover:text-gray-medium pl-2 rounded-md`;

export default forwardRef(
  (
    {
      headings,
      menuIsOpen,
      toggleMenu,
      breadcrumbText = "",
      breadcrumbUrl = "",
    },
    sidebarRef
  ) => {
    const [path, setPath] = useState("");
    const activeHeadingRef = useRef(null);
    const activeSubheadingRef = useRef(null);

    useEffect(() => {
      setPath(getPathWithHash(window.location));
    }, []);

    useLayoutEffect(() => {
      if (!path) return;

      const activeItem =
        activeHeadingRef.current || activeSubheadingRef.current;

      if (!activeItem) return;

      const sidebarHeight = sidebarRef.current.clientHeight;
      const activeItemPosition = activeItem.getBoundingClientRect().y;
      const newPosition = activeItemPosition - sidebarHeight / 2;

      sidebarRef.current.scrollTo(0, newPosition);
    }, [path]);

    const SubHeadingList = ({
      subHeadings,
      isPrimaryHeading,
      dampen = true,
    }) => {
      return (
        <ul className={`${isPrimaryHeading ? "" : "ml-6"}`}>
          {subHeadings.map((subHeading) => {
            const isActive = headingIsActive(subHeading, path);

            return (
              <li
                key={subHeading.path}
                ref={isActive ? activeSubheadingRef : null}
              >
                <span className={`mx-5 block`}>
                  <a
                    onClick={(e) => scrollTo(e, setPath, toggleMenu)}
                    href={subHeading.path}
                    className={`block text-lg text-gray-mediumLight py-1 font-light ${nonTopLevelClasses} ${
                      isActive ? "bg-gray-light" : ""
                    }`}
                  >
                    {subHeading.value}
                  </a>
                </span>

                {(subHeading.subHeadings?.length || 0) > 0 && (
                  <SubHeadingList
                    subHeadings={subHeading.subHeadings}
                    dampen={true}
                  />
                )}
              </li>
            );
          })}
        </ul>
      );
    };

    return (
      <aside
        className={`
        left-[50%]
        lg:left-0
        transform
        -translate-x-1/2
        lg:translate-x-0
        bg-white
        block
        flex-none
        border-gray-light
        border-t-4
        lg:border-0
        opacity-0
        lg:opacity-100
        fixed
        lg:relative
        lg:top-auto
        z-[-1]
        lg:z-10
        w-full
        ${menuIsOpen ? "opacity-100" : ""}
      `}
        style={{
          zIndex: menuIsOpen ? "11" : "",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "var(--ti-nav-height)",
            height: "calc(100vh - var(--ti-nav-height))",
          }}
          className="overflow-auto pt-14 lg:pt-12 sidebar-container"
          ref={sidebarRef}
        >
          <button
            aria-label="close menu"
            className="absolute right-[.5rem] top-0 p-4 text-gray-medium flex items-center lg:hidden"
            onClick={toggleMenu}
          >
            <span className="text-base text-current inline-block pr-1">
              Close Menu
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {breadcrumbUrl && breadcrumbText && (
            <Link
              to={breadcrumbUrl}
              className="flex items-center gap-1 text-lg font-semibold mb-6 ml-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>

              {breadcrumbText}
            </Link>
          )}

          <ul>
            {headings.map((heading, index) => {
              const { depth } = heading;
              const isActive = headingIsActive(heading, path);
              const isPrimaryHeading = !depth;

              return (
                <li
                  key={heading.path}
                  ref={isActive ? activeHeadingRef : null}
                  data-depth={depth}
                >
                  <span className="block">
                    <a
                      onClick={(e) => scrollTo(e, setPath, toggleMenu)}
                      href={heading.path}
                      className={`
                      py-1
                      ml-5
                      mr-2
                      text-lg
                      block
                      text-gray-mediumLight
                      ${isPrimaryHeading ? topLevelClasses : nonTopLevelClasses}
                      ${isActive && !isPrimaryHeading ? "bg-gray-light" : ""}
                    `}
                      style={{
                        paddingTop:
                          isPrimaryHeading && index === 0 ? "0px" : "",
                      }}
                    >
                      {heading.value}
                    </a>
                  </span>

                  {(heading.subHeadings?.length || 0) > 0 && (
                    <SubHeadingList
                      subHeadings={heading.subHeadings}
                      isPrimaryHeading={isPrimaryHeading}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    );
  }
);
