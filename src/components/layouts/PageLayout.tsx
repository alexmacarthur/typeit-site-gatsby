import React, { ReactNode } from "react";
import MainLayout from "./MainLayout";
import PageHeadingContext from "../../PageHeadingContext";

export default ({
  children = null,
  isFullWidth = false,
  headings = [],
  title = "",
  isContentPage = false,
  otherClasses = "",
}): React.FC => {
  const paddingClass = isContentPage ? "pt-10 lg:pt-8 pb-16" : "";
  const widthClass = isFullWidth
    ? "max-container"
    : "medium-max-container mx-auto";

  return (
    <PageHeadingContext.Provider value={{ headings: headings['headings'], title }}>
      <MainLayout>
        <div
          className={`${widthClass} ${paddingClass} px-3 lg:px-0 min-h-full ${otherClasses}`}
        >
          {children}
        </div>
      </MainLayout>
    </PageHeadingContext.Provider>
  );
};
