import React from "react";
import { graphql, Link } from "gatsby";
import PageLayout from "../components/layouts/PageLayout";
import SEO from "../components/seo";
import CodePen from "../components/CodePen";
import LeftArrow from "../components/icons/LeftArrow";

const Demo = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, codepen_slug },
      html,
      excerpt,
    },
  } = data;

  return (
    <PageLayout isContentPage={true}>
      <SEO title={`${title} | TypeIt Demos`} description={excerpt} />

      <Link to="/demos" className="flex items-center inline-block mb-6">
        <LeftArrow />
        Back To All Demos
      </Link>

      <h1 className="text-3xl md:text-4xl lg:text-5xl">Demo: {title}</h1>

      <div
        className="mb-10"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>

      <div className="mb-6">
        <CodePen slug={codepen_slug} />
      </div>
    </PageLayout>
  );
};

export const demoQuery = graphql`
  query DemoContent($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      frontmatter {
        title
        codepen_slug
      }
    }
  }
`;

export default Demo;
