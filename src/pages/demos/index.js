import React from "react";
import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import { graphql } from "gatsby";

const Demos = ({ data }) => {
  const demos = data.allMarkdownRemark.nodes;

  console.log(demos);

  return (
    <PageLayout>
      <SEO title={"Demo Library"} />
      Demos will go here.
    </PageLayout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(demos)/" } }) {
      nodes {
        frontmatter {
          enable_sidebar
          title
        }
      }
    }
  }
`;

export default Demos;
