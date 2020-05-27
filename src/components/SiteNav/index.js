import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "gatsby";
import PageHeadingContext from "../../PageHeadingContext";
import ToggleButton from './ToggleButton';
import { sendGaEvent } from "../../utilities";
import toggleOverflow from "../../helpers/toggleOverflow";

export default ({ pixelAnchorRef }) => {
  const headingCtx = useContext(PageHeadingContext);
  const navItemRef = useRef(null);
  const pageHeadings = headingCtx.headings ? headingCtx.headings : [];
  console.log(pageHeadings);
  const pageTitle = headingCtx.title;
  const hasPageHeadings = pageHeadings.length > 0;
  const [subNavTopPadding, setSubNavTopPadding] = useState(0);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navRef = useRef(null);

  // @todo: These should live in gatsby-config.js.
  const links = [
    {
      title: "Pricing",
      path: "/#pricing"
    },
    {
      title: "Installation",
      path: "/#installation"
    },
    {
      title: "Examples",
      path: "/#examples"
    },
    {
      title: "Flavors",
      path: "/#flavors"
    },
    {
      title: "Documentation",
      path: "/docs", 
      nested: [
        {
          title: "JavaScript Library", 
          path: "/docs"
        },
        {
          title: "React Component", 
          path: "/docs/react"
        }, 
        {
          title: "WordPress Plugin", 
          path: "/docs/wordpress"
        }
      ]
    }
  ];

  const SelfClosingLink = props => {
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

  const toggleMenu = e => {
    e.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    let padding = `${navItemRef.current.getBoundingClientRect().height}`;
    setSubNavTopPadding(padding);

    const observer = new IntersectionObserver(
      ([e]) => {
        if (navRef.current) {
          navRef.current.classList.toggle(
            "isSticky",
            e.boundingClientRect.y < 0
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(pixelAnchorRef.current);
    // eslint-disable-next-line
  }, []);

  // Whenever the menu state changes, make sure to set overflow appropriately.
  useEffect(() => {
    toggleOverflow(menuIsOpen);
    // eslint-disable-next-line
  }, [menuIsOpen]);

  return (
    <nav
      ref={navRef}
      className={`h-24 flex items-center absolute justify-between px-5 py-3 pb-4 z-20 top-0 w-full bg-white`}
    >
      <span className="flex-initial text-5xl font-thin logo">
        <SelfClosingLink to="/" className="text-gray font-thin">
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
            left-0
            h-full
            w-full
            bg-white
            translate-left
            lg:translate-none
            overflow-scroll
            lg:overflow-visible
            pt-8
            md:p-0
            ${menuIsOpen ? "translate-none" : ""}
          `}
        >
          <ul className="self-start mx-auto lg:-mx-3 lg:mt-0 block lg:flex mb-8 lg:mb-0">

            {links.map(link => {
              return (
                <li
                  key={link.path}
                  ref={navItemRef}
                  className={`siteNavListItem flex px-5 flex-col lg:flex-row items-center font-light justify-center mb-5 lg:mb-0 relative`}
                >
                  <SelfClosingLink
                    to={link.path}
                    className="siteNavLink self-center text-2xl text-gray-mediumLight hover:text-gray z-10 relative"
                  >
                    {link.title}
                  </SelfClosingLink>

                  {link.nested &&
                    <ul 
                      className="siteSubNav relative lg:absolute bg-white lg:shadow py-10 px-2 pb-6 rounded-sm lg:hidden" 
                      style={{ paddingTop: `calc(${subNavTopPadding}px + 1rem)`, top: `-5px`}}
                    >
                      {link.nested.map(l => {
                        return (
                          <li key={l.path} className="text-center py-1">
                            <SelfClosingLink
                              to={l.path}
                              className="text-xl text-gray-mediumLight hover:text-gray"
                            >
                              {l.title}
                            </SelfClosingLink>
                          </li>
                        )
                      })}
                    </ul>
                  }
                </li>
              );
            })}

            <li className="flex px-5 justify-center siteNavListItem">
              <SelfClosingLink
                to="/licenses"
                className="button slim self-center"
                onClick={() => {
                  sendGaEvent("click", {
                    event_category: "purchase_cta_button",
                    event_label: "main nav"
                  });
                }}
              >
                Purchase a License
              </SelfClosingLink>
            </li>
          </ul>

          {pageHeadings.length > 0 && (
            <ul className="self-start lg:hidden">
              {hasPageHeadings && (
                <li className="px-5 mb-5 mt-10 text-center">
                  <h4 className="font-thin text-3xl">{pageTitle}</h4>
                </li>
              )}
              {pageHeadings.map(heading => {
                return (
                  <li
                    key={heading.hash}
                    className="px-5 font-light justify-center mb-5 lg:mb-0 text-center"
                  >
                    <SelfClosingLink
                      to={heading.hash}
                      className="text-2xl text-gray-mediumLight hover:text-gray"
                    >
                      {heading.value}
                    </SelfClosingLink>

                    {heading.subHeadings && 
                      <ul className="block">
                        {heading.subHeadings.map(subHeading => {
                          return (
                            <li className="py-1">
                              <SelfClosingLink
                                to={subHeading.hash}
                                className="text-xl text-gray-mediumLight hover:text-gray"
                              >
                                {subHeading.value}
                              </SelfClosingLink>
                            </li>
                          )
                        })}
                      </ul>
                    }
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};
