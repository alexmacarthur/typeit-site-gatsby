import React from "react";
import MainLayout from "./MainLayout";
import PageHeadingContext from "../../PageHeadingContext";

export default ({
  children,
  isFullWidth = false,
  headings = [],
  title = "",
  isContentPage = false,
  otherClasses = "",
}) => {
  const paddingClass = isContentPage ? "pt-12 lg:pt-8 pb-14" : "";
  const widthClass = isFullWidth
    ? "max-container"
    : "medium-max-container mx-auto";

  return (
    <PageHeadingContext.Provider value={{ headings: headings.headings, title }}>
      <MainLayout>
        <div
          className={`${widthClass} ${paddingClass} px-2 lg:px-0 min-h-full ${otherClasses}`}
        >
          {children}
        </div>
      </MainLayout>
    </PageHeadingContext.Provider>
  );
};
