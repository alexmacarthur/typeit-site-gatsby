import React, { useRef, useState } from "react";
import SiteNav from "../SiteNav";
import PageCover from "../PageCover";
import PageCoverContext from "../../PageCoverContext";
import GlobalEventContextProvider from "../GlobalEventContextProvider";

const MainLayout = ({ children = null }) => {
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

      <div
        className="relative flex flex-col"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <PageCoverContext.Provider value={{ setPageCoverContents, setCleanUp }}>
          <main>{children}</main>
        </PageCoverContext.Provider>

        <footer className="relative bg-gray-900 text-center p-8">
          <span className="text-gray-400 font-extralight text-lg">
            © {new Date().getFullYear()} | designed & created by{" "}
            <a
              className="text-gray-400 font-semibold"
              href="https://macarthur.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex MacArthur
            </a>{" "}
            | images optimized by{" "}
            <a
              className="text-gray-400 font-semibold"
              href="https://picperf.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              PicPerf
            </a>
          </span>
        </footer>
      </div>
    </GlobalEventContextProvider>
  );
};

export default MainLayout;
