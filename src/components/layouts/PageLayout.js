import React from "react";
import MainLayout from "./MainLayout";
import PageHeadingContext from "../../PageHeadingContext";

export default ({
  children,
  isFullWidth = false,
  headings = [],
  title = ""
}) => {
  return (
    <PageHeadingContext.Provider value={{ headigs: headings.headings, title }}>
      <MainLayout>
        <div
          className={`${
            isFullWidth ? "max-container" : "max-w-6xl mx-auto"
          } px-2 lg:px-0`}
        >
          {children}
        </div>
      </MainLayout>
    </PageHeadingContext.Provider>
  );
};
