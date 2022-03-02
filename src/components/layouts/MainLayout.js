import React, { useRef, useState } from "react";
import SiteNav from "../SiteNav";
import PageCover from "../PageCover";
import PageCoverContext from "../../PageCoverContext";
import GlobalEventContextProvider from "../GlobalEventContextProvider";

const MainLayout = ({ children }) => {
  const [pageCoverContents, setPageCoverContents] = useState(null);
  const [cleanUp, setCleanUp] = useState(() => {});

  return (
    <GlobalEventContextProvider>
      {pageCoverContents && (
        <PageCover
          setPageCoverContents={setPageCoverContents}
          cleanUp={cleanUp}
          render={() => {
            return pageCoverContents;
          }}
        />
      )}

      <SiteNav />

      <div className="relative flex flex-col">
        <PageCoverContext.Provider value={{ setPageCoverContents, setCleanUp }}>
          <main>{children}</main>
        </PageCoverContext.Provider>

        <footer className="relative bg-gray-900 text-center p-8">
          <span className="text-gray-400 font-extralight text-xl">
            © {new Date().getFullYear()} | designed & created by{" "}
            <a
              className="text-gray-400 font-semibold"
              href="https://macarthur.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex MacArthur
            </a>
          </span>
        </footer>
      </div>
    </GlobalEventContextProvider>
  );
};

export default MainLayout;
