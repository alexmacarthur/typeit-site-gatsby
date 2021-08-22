import React from "react";
import { graphql } from "gatsby";

import template from "../helpers/template";

import MainLayout from "../components/layouts/MainLayout";
import SEO from "../components/seo";
import Hero from "../components/Hero";
import Demo from "../components/Demo";
import ExampleList from "../components/ExampleList";
import Perks from "../components/Perks";
import PricingCards from "../components/PricingCards";
import Slice from "../components/Slice";
import FlavorCards from "../components/FlavorCards";

const IndexPage = ({ data }) => {
  let snippet = data.markdownRemark.html;
  let productData = data.allProductData.siteMetadata.licenseOptions;
  let { typeItVersion } = data.allProductData.siteMetadata;
  let { homeSlices } = data.allProductData.siteMetadata;

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
        <ExampleList examples={data.examples} />
      </Slice>

      <Slice
        heading="Every Option You Might Need"
        description={
          "For a full description of each option, <a href='/docs/vanilla/usage#configuration-options'>see here.</a>"
        }
        bgClasses="bg-gray-light"
        id="options"
        showTriangles={true}
      >
        <div className="max-w-5xl mx-auto">
          <Demo />
        </div>
      </Slice>

      <Slice heading="Easy Setup &amp; Installation" id="installation">
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
                    dangerouslySetInnerHTML={{
                      __html: template(step.node.html, { typeItVersion }),
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </Slice>

      <Slice
        heading="Available in Multiple Flavors"
        bgClasses="bg-gray-light"
        id="flavors"
        showTriangles={true}
        description={homeSlices.flavors.description}
      >
        <FlavorCards />
      </Slice>

      <Slice
        heading="Pricing"
        id="pricing"
        isLast={true}
        description={homeSlices.pricing.description}
      >
        <PricingCards productData={productData} />
      </Slice>
    </MainLayout>
  );
};

export const query = graphql`
  fragment allProductData on Site {
    siteMetadata {
      typeItVersion
      homeSlices {
        pricing {
          description
        }
        flavors {
          description
        }
      }
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

export default IndexPage;
