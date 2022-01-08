import React from "react";
import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import { graphql, Link } from "gatsby";
import LeftArrow from "../../components/icons/LeftArrow";

const Demos = ({ data }) => {
  const demos = data.allMarkdownRemark.nodes;

  return (
    <PageLayout isContentPage={true}>
      <SEO title={"Demo Library"} />

      <h1>Demo Library</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {demos.map((demo) => {
          const {
            html,
            frontmatter: { title },
            fields: { slug },
          } = demo;

          return (
            <li>
              <h3>
                <Link to={`/${slug}`} className="text-gray-700">
                  {title}
                </Link>
              </h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />

              <div>
                <Link to={`/${slug}`} className="inline-flex items-center">
                  See It
                  <LeftArrow classes="rotate-180 ml-1" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </PageLayout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(demos)/" } }) {
      nodes {
        html
        frontmatter {
          title
          codepen_slug
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default Demos;
