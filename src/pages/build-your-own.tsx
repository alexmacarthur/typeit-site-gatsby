import React from "react";
import PageLayout from "../components/layouts/PageLayout";
import SEO from "../components/seo";
import Demo from "../components/Demo";

const GeneratorPage = ({ path }) => {
  return (
    <PageLayout isContentPage={true}>
      <SEO title={""} />

      <h1>Make Your Own Animation</h1>

      <p>
        In order to get a feel for what TypeIt can do, try your hand at building
        an instance of yourself without writing a lick of code. Record an
        animation, tweak it to your liking, and use it (if you want).
      </p>

      <div className="mt-16 mb-12">
        <Demo pagePath={path} />
      </div>
    </PageLayout>
  );
};

export default GeneratorPage;
