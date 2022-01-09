import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PageHeadingContext from "../../PageHeadingContext";
import ToggleButton from "./ToggleButton";
import toggleOverflow from "../../helpers/toggleOverflow";
import Search from "../Search";
import GitHubButton from "react-github-btn";
import SearchIcon from "../icons/SearchIcon";

const Up = () => {
  return (
    <svg
      viewBox="0 0 531.74 460.5"
      overflow="visible"
      enableBackground="new 0 0 531.74 460.5"
      className="stroke-current text-gray-100"
    >
      <polygon
        strokeWidth="40px"
        fill="#ffffff"
        points="0.866,460 265.87,1 530.874,460"
      />
    </svg>
  );
};

export default () => {
  const navLinkData = useStaticQuery(graphql`
    query NavItemQuery {
      site {
        siteMetadata {
          navItems {
            title
            path
            nested {
              title
              path
            }
          }
        }
      }
    }
  `);
  const { navItems: links } = navLinkData.site.siteMetadata;
  const headingCtx = useContext(PageHeadingContext);
  const navItemRef = useRef(null);
  const pageHeadings = headingCtx.headings ? headingCtx.headings : [];
  const pageTitle = headingCtx.title;
  const hasPageHeadings = pageHeadings.length > 0;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navRef = useRef(null);

  const SelfClosingLink = (props) => {
    let onClick = props.onClick ? props.onClick : () => {};

    return (
      <Link
        {...props}
        onClick={() => {
          setMenuIsOpen(false);
          onClick();
        }}
      >
        {props.children}
      </Link>
    );
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  // Whenever the menu state changes, make sure to set overflow appropriately.
  useEffect(() => {
    toggleOverflow(menuIsOpen);
    // eslint-disable-next-line
  }, [menuIsOpen]);

  return (
    <>
      {showSearch && (
        <>
          <div
            className="fixed z-50 top-50 opacity-50 left-50 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 w-screen h-screen"
            onClick={() => setShowSearch(false)}
          ></div>
          <Search setShowSearch={setShowSearch} />
        </>
      )}

      <nav
        ref={navRef}
        className={`sticky top-[0] h-24 flex items-center justify-between px-5 py-10 z-20 top-0 w-full bg-white`}
      >
        <span className="flex-initial text-5xl font-extralight logo">
          <SelfClosingLink to="/" className="font-extralight text-gray-700">
            TypeIt
          </SelfClosingLink>
        </span>

        <div className="flex align-middle">
          <ToggleButton menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} />

          <div
            className={`
            lg:flex
            justify-center
            fixed
            lg:relative
            top-0
            left-[0]
            h-full
            w-full
            bg-white
            translate-left
            lg:translate-none
            overflow-scroll
            lg:overflow-visible
            pt-8
            lg:p-0
            ${menuIsOpen ? "translate-none" : ""}
          `}
          >
            <ul className="self-start mx-auto lg:-mx-3 lg:mt-0 block lg:flex mb-8 lg:mb-0">
              {links.map((link) => {
                return (
                  <li
                    key={link.path}
                    ref={navItemRef}
                    className={`siteNavListItem flex px-5 flex-col lg:flex-row ld:items-center font-extralight mb-5 lg:mb-0 relative`}
                  >
                    <SelfClosingLink to={link.path} className="siteNavLink">
                      {link.title}
                    </SelfClosingLink>

                    {link.nested && (
                      <div
                        className={`relative lg:absolute top-[99%] left-[50%] transform -translate-x-1/2 pt-4`}
                      >
                        <div className="siteSubNav bg-white rounded-sm lg:border-4 border-gray-100 w-max lg:hidden">
                          <div className="relative">
                            <i className="hidden lg:block absolute block w-10 h-10 left-[50%] top-[-1rem] transform -translate-x-1/2">
                              <Up />
                            </i>
                            <ul className="relative py-0 lg:py-6 px-4 lg:px-8 bg-white space-y-4">
                              {link.nested.map((l) => {
                                return (
                                  <li key={l.path} className="text-center">
                                    <SelfClosingLink
                                      to={l.path}
                                      className="text-xl text-gray-700 hover:text-gray-800 font-extralight"
                                    >
                                      <span className="lg:hidden inline-block mr-2">
                                        &mdash;
                                      </span>{" "}
                                      {l.title}
                                    </SelfClosingLink>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}

              <li className="siteNavListItem">
                <button
                  aria-label="open search"
                  className="flex items-center"
                  onClick={() => {
                    setShowSearch(true);
                    setMenuIsOpen(false);
                  }}
                >
                  <SearchIcon className="h-8 w-8" />
                  <span className="text-xl text-gray-700 hover:text-gray-800 font-extralight inline lg:hidden pl-3">
                    Search
                  </span>
                </button>
              </li>

              <li className="siteNavListItem justify-center siteNavListItem mt-10 lg:mt-0">
                <GitHubButton
                  href="https://github.com/alexmacarthur/typeit"
                  data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                  data-icon="octicon-star"
                  data-size="large"
                  aria-label="Star =TypeIt on GitHub"
                >
                  Star
                </GitHubButton>
              </li>

              <li className="siteNavListItem justify-center siteNavListItem mt-10 md:mt-0">
                <SelfClosingLink
                  to="/licenses/purchase"
                  className="button slim self-center"
                >
                  Purchase a License
                </SelfClosingLink>
              </li>
            </ul>

            {pageHeadings.length > 0 && (
              <ul className="self-start lg:hidden">
                {hasPageHeadings && (
                  <li className="px-5 mb-5 mt-10 text-center">
                    <h4 className="font-extralight text-3xl">{pageTitle}</h4>
                  </li>
                )}
                {pageHeadings.map((heading) => {
                  return (
                    <li
                      key={heading.hash}
                      className="px-5 font-extralight justify-center mb-5 lg:mb-0 text-center"
                    >
                      <SelfClosingLink
                        to={heading.hash}
                        className="siteNavLink"
                      >
                        {heading.value}
                      </SelfClosingLink>

                      {heading.subHeadings && (
                        <ul className="block">
                          {heading.subHeadings.map((subHeading) => {
                            return (
                              <li className="py-1">
                                <SelfClosingLink
                                  to={subHeading.hash}
                                  className="text-xl text-gray-700 hover:text-gray-800"
                                >
                                  {subHeading.value}
                                </SelfClosingLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
