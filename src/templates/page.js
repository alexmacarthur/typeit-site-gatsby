import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import PageLayout from "../components/layouts/PageLayout";
import Sidebar from "../components/Sidebar";
import SEO from "../components/seo";

/**
 * Get only h2 headings.
 *
 * @param {array} headings
 */
function getHeadings(headings) {
  return headings.filter(heading => {
    return heading.depth === 2;
  });
}

// Ideally, this would be done before it gets to the component level.
function generateHashes(headings, pathToPrepend) {
  return headings.map(heading => {
    // Convert to lowercase, make spaces hyphens.
    let hash = heading.value.toLowerCase().replace(/[^\w]/g, "-");
    // Remove leading & trailing hypens.
    hash = hash.replace(/^(-)+|(-)+$/g, "");
    // Prepend the hash so Gatsby doesn't take us to the home page.
    heading.hash = `${pathToPrepend}#${hash}`;
    return heading;
  });
}

export default props => {
  // The hackiest hack in the history of the internet, but best fix for the short term. 
  // Short version: Need to format HTML tables before they get to this component. 
  let [html, setHTML] = useState("");

  useEffect(() => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(props.data.markdownRemark.html, "text/html");

    doc.querySelectorAll('table').forEach((table, index, all) => {
      let rawHTML = table.outerHTML;
      let formattedHTML = rawHTML
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/(<table(?:.*?)>(?:.+?)(?:<\/table>))/g, (match) => {
          return `
          <div class='tableWrapper'>
            <span class="md:hidden block mb-4 text-base text-gray-medium">To view all columns, you may need to scroll horizontally.</span>
            <div class='tableWrapper-inner'>
              ${match}
            </div>
          </div>
        `;
        });
      table.outerHTML = formattedHTML;
    });

    // Set HTML value to our new table-formatted version.
    setHTML(doc.body.innerHTML);
  }, []);

  let headings = generateHashes(
    getHeadings(props.data.markdownRemark.headings),
    props.location.pathname
  );
  let isFullWidth = props.data.markdownRemark.frontmatter.enable_sidebar;
  let pageTitle = props.data.markdownRemark.frontmatter.title;
  let description = props.data.markdownRemark.frontmatter.description;

  return (
    <PageLayout isFullWidth={isFullWidth} headings={headings} title={pageTitle}>
      <SEO title={pageTitle} description={description} />
      <div className="lg:pl-0 px-4 -mt-12">
        <div className="flex">
          <Sidebar
            classList={"hidden lg:block flex-none py-8 -mt-8 pr-16"}
            style={{ top: "6rem" }}
            headings={headings}
          />
          <div className="mx-auto overflow-auto">
            <div className="medium-max-container mx-auto">
              <h1>{pageTitle}</h1>
              <div
                className="contentArea"
                dangerouslySetInnerHTML={{ __html: html }}
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
      headings {
        value
        depth
      }
      frontmatter {
        title
        enable_sidebar
        description
      }
    }
  }
`;
