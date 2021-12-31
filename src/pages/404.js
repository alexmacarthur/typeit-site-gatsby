import React from "react";
import TypeIt from "typeit-react";

import PageLayout from "../components/layouts/PageLayout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <PageLayout otherClasses="flex items-center justify-center">
    <SEO title="404: Not found" />

    <div className="text-center">
      <TypeIt
        as="h1"
        options={{
          speed: 50,
        }}
      >
        Sorry... that page doesn't exist.
      </TypeIt>

      <p className="mb-0">
        If you're looking for something specific, try using the "Search" menu
        item above.
      </p>
    </div>
  </PageLayout>
);

export default NotFoundPage;
