import React from "react";
import { graphql } from "gatsby";

import MainLayout from "../components/layouts/MainLayout";
import SEO from "../components/seo";
import Hero from "../components/Hero";
import Demo from "../components/Demo";
import Example from "../components/Example";
import Perks from "../components/Perks";
import PricingCards from "../components/PricingCards";
import Slice from "../components/Slice";
import exampleInstances from "../example-instances";

export default ({ data }) => {
  let snippet = data.markdownRemark.html;
  let productData = data.allProductData.siteMetadata.licenseOptions;

  return (
    <MainLayout>
      <SEO title={""} />

      <Hero snippet={snippet} />

      <div className="relative text-center bg-gray-light p-8 pt-64 -mt-56 pb-16">
        <div className="triangle-top"></div>

        <h3 className="mb-16 mt-8 text-2xl md:text-3xl">
          "It is literally the easiest JS plugin I've ever used." - Brian
        </h3>

        <Perks />
      </div>

      <Slice heading="Unmatched Flexibility" id="examples">
        <div className="md:px-8">
          {data.examples.edges.map((edge, index) => {
            let noExtension = edge.node.fileAbsolutePath
              .split(".")
              .slice(0, -1)
              .join(".");
            let fileName = noExtension
              .split("/")
              .reverse()[0]
              .replace(/\d-/, "");
            let isLast = index + 1 === data.examples.edges.length;

            return (
              <Example
                data={edge.node}
                instance={exampleInstances[fileName]}
                isLast={isLast}
                key={edge.node.id}
              />
            );
          })}
        </div>
      </Slice>

      <Slice 
        heading="Every Option You Might Need" 
        bgClasses="bg-gray-light"
        showTriangles={true}
      >
        <div className="max-w-5xl mx-auto">
          <Demo />
        </div>
      </Slice>

      <Slice 
        heading="Easy Setup &amp; Installation" 
        id="installation"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            {data.installationSteps.edges.map((step, index) => {
              return (
                <div key={step.node.id}>
                  <div className="block text-center mb-2 md:mb-4">
                    <div>
                      <span className="self-center text-5xl">#{index + 1}</span>
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: step.node.html }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </Slice>

      <Slice
        heading="Pricing"
        bgClasses="bg-gray-light"
        outerClasses="-mb-20"
        id="pricing"
        isLast={true}
        showTriangles={true}
      >
        <PricingCards productData={productData} />
      </Slice>

    </MainLayout>
  );
};

export const query = graphql`
  fragment allProductData on Site {
    siteMetadata {
      licenseOptions {
        slug
        price
        htmlTitle
        simpleTitle
        description
      }
    }
  }
  query {
    markdownRemark(frontmatter: { name: { eq: "hero" } }) {
      html
    }
    examples: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//copy/examples/(.*).md$/" } }
      sort: { fields: [fileAbsolutePath], order: [ASC, DESC] }
    ) {
      edges {
        node {
          id
          html
          fileAbsolutePath
        }
      }
    }
    installationSteps: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//copy/installation-steps/(.*).md$/" }
      }
      sort: { fields: [fileAbsolutePath], order: [ASC, DESC] }
    ) {
      edges {
        node {
          id
          html
          fileAbsolutePath
        }
      }
    }
    allProductData: site {
      ...allProductData
    }
  }
`;
