import React from "react";
import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import { graphql, Link } from "gatsby";
import LeftArrow from "../../components/icons/LeftArrow";

const Demos = ({ data }) => {
  const demos = data.allMarkdownRemark.nodes;

  return (
    <PageLayout isContentPage={true}>
      <SEO
        title={"Demo Library"}
        description={
          "Whether it's to spark some inspiration or to get a better feel what TypeIt's capable of, here's a growing collection of low-fidelity CodePen demos."
        }
      />

      <h1>Demo Library</h1>

      <p className="mb-10">
        Whether it's to spark some inspiration or to get a better feel what
        TypeIt's capable of, here's a growing collection of low-fidelity CodePen
        demos. Have one of your own?{" "}
        <a
          href="https://github.com/alexmacarthur/typeit-site-gatsby/tree/master/src/pages/demos"
          target="_blank"
        >
          Feel free to add it
        </a>
        .
      </p>

      <div className="relative">
        <hr className="absolute border-0 border-white border-b-2 bottom-[-1.5rem] h-1 w-full z-10" />

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {demos.map((demo) => {
            const {
              html,
              frontmatter: { title },
              fields: { slug },
            } = demo;

            return (
              <li className="relative py-4">
                <h3>
                  <Link to={`/${slug}`} className="text-gray-700 leading-tight">
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

                <hr className="absolute border-0 border-b-2 bottom-[-1.5rem] h-1 w-full" />
              </li>
            );
          })}
        </ul>
      </div>
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
