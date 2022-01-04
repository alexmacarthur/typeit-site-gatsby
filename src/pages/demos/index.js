import React from "react";
import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import { graphql } from "gatsby";
import CodePen from "../../components/CodePen";

const Demos = ({ data }) => {
  const demos = data.allMarkdownRemark.nodes;

  console.log(demos);

  return (
    <PageLayout>
      <SEO title={"Demo Library"} />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demos.map((demo) => {
          const {
            html,
            frontmatter: { title, codepen_slug },
          } = demo;

          return (
            <li>
              <h3>{title}</h3>

              {/* <CodePen slug={codepen_slug} /> */}

              <div
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
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
      }
    }
  }
`;

export default Demos;
