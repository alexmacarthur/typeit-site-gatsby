import React from "react";
import { graphql } from "gatsby";
import template from "../helpers/template";
import PageLayout from "../components/layouts/PageLayout";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";


export default props => {
  let html = props.pageContext.html;
  let { headings } = props.pageContext;

  let {
    enable_sidebar, 
    title, 
    subtitle, 
    description
  } = props.data.markdownRemark.frontmatter;
  let { typeItVersion } = props.data.site.siteMetadata;

  return (
    <PageLayout 
      isFullWidth={enable_sidebar}
      headings={headings}
      title={title}
    >
      <SEO title={title} description={description} />
      <div className="lg:pl-0 px-4 -mt-12">
        <div className="flex">
          <Sidebar
            classList={"hidden lg:block flex-none py-8 -mt-8 pr-16"}
            style={{ top: "6rem", width: "20rem" }}
            headings={headings}
          />
          <div className="mx-auto overflow-auto">
            <div className="medium-max-container mx-auto">
              <h1>{title}</h1>
              {subtitle && <small>{subtitle}</small>}
              <div
                className="contentArea"
                dangerouslySetInnerHTML={{ __html: template(html, { typeItVersion }) }}
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
    site {
      siteMetadata {
        typeItVersion
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        enable_sidebar
        description
      }
    }
  }
`;
