import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import SEO from "../../components/seo";
import PageLayout from "../../components/layouts/PageLayout";
import PricingCards from "../../components/PricingCards";

const Licenses = () => {
  const data = useStaticQuery(graphql`
    query ProductDataQuery {
      site {
        ...allProductData
      }
    }
  `);

  const allProductData = data.site.siteMetadata.licenseOptions;
  const objectifiedProductData = {};

  allProductData.forEach((product) => {
    objectifiedProductData[product.slug] = product;
  });

  return (
    <PageLayout isContentPage={true} isFullWidth={true}>
      <SEO title={"Purchase a License for TypeIt"} />

      <div className="text-center mb-12">
        <h1>Purchase a License</h1>

        <p>
          Choose an option, submit payment, and you'll be all set to start using
          TypeIt on your project.
        </p>
      </div>

      <div className="container-bottom-padding">
        <PricingCards
          productData={allProductData}
          isOnDarkBackground={false}
          isLight={true}
        />
      </div>
    </PageLayout>
  );
};

export default Licenses;
