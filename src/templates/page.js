import React, { useState, useRef } from "react";
import { graphql, Link } from "gatsby";
import PageLayout from "../components/layouts/PageLayout";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";
import Banner from "../components/Banner";

const ToggleButton = ({ toggleMenu, menuIsOpen }) => {
  return (
    <button
      onClick={toggleMenu}
      className={`-mt-12 mb-8 sticky border-t-4 border-b-4 border-gray-100 items-center flex justify-between lg:hidden bg-white text-gray-700 px-8 py-2 h-16 ml-auto z-10 ${
        menuIsOpen ? "opacity-0" : "opacity-100"
      }`}
      aria-label={"open docs menu"}
      style={{
        width: "100vw",
        top: "calc(var(--ti-nav-height) - 2px)",
        transform: "translateX(-1.5rem)",
      }}
    >
      <span>Section Menu</span>

      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </div>
    </button>
  );
};

const PageTemplate = (props) => {
  let html = props.pageContext.html;
  let { headings } = props.pageContext;
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleMenu = () => {
    ["overflow-hidden", "lg:overflow-auto"].forEach((c) => {
      document.body.classList.toggle(c, !menuIsOpen);
    });

    sidebarRef.current && sidebarRef.current.scrollTo(0, 0);
    setMenuIsOpen(!menuIsOpen);
  };

  const {
    enable_sidebar,
    title,
    subtitle,
    description,
    version,
    sidebar_breadcrumb_text,
    sidebar_breadcrumb_url,
  } = props.data.markdownRemark.frontmatter;

  const shouldShowSidebar = headings.length > 0 && enable_sidebar;

  return (
    <PageLayout
      isContentPage={true}
      isFullWidth={shouldShowSidebar}
      headings={headings}
      title={title}
    >
      <SEO title={title} description={description} />
      <div className="px-4">
        <div
          className={`lg:grid gap-6`}
          style={{
            gridTemplateColumns: `${shouldShowSidebar ? "20rem 1fr" : "1fr"}`,
          }}
        >
          {shouldShowSidebar && (
            <Sidebar
              breadcrumbText={sidebar_breadcrumb_text}
              breadcrumbUrl={sidebar_breadcrumb_url}
              headings={headings}
              menuIsOpen={menuIsOpen}
              toggleMenu={toggleMenu}
              ref={sidebarRef}
            />
          )}

          <div className={`lg:overflow-auto pb-8`}>
            <div className="medium-max-container mx-auto">
              {shouldShowSidebar && (
                <ToggleButton menuIsOpen={menuIsOpen} toggleMenu={toggleMenu} />
              )}

              {version && (
                <Banner>
                  Heads up! You're viewing the documentation for an older
                  version of TypeIt. For the latest,{" "}
                  <Link
                    to="/docs"
                    className="text-gray-700 font-semibold hover:text-gray-700"
                  >
                    go here.
                  </Link>
                </Banner>
              )}

              <h1>{title}</h1>
              {subtitle && <small>{subtitle}</small>}
              <div
                className="contentArea"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export const pageQuery = graphql`
  query PageContent($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        version
        enable_sidebar
        description
        sidebar_breadcrumb_text
        sidebar_breadcrumb_url
      }
    }
  }
`;

export default PageTemplate;
