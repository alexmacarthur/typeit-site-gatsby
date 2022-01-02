import React from "react";
import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import { graphql } from "gatsby";
import CodePen from "../../components/CodePen";

const Demos = ({ data }) => {
  const demos = data.allMarkdownRemark.nodes;

  return (
    <PageLayout>
      <SEO title={"Demo Library"} />
      Demos will go here.
      <CodePen slug="jzybpB" />
      <script
        async
        src="https://cpwebassets.codepen.io/assets/embed/ei.js"
      ></script>
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
