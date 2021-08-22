import React, { useRef, useState } from "react";
import SiteNav from "../SiteNav";
import PageCover from "../PageCover";
import PageCoverContext from "../../PageCoverContext";
import GlobalEventContextProvider from "../GlobalEventContextProvider";

const MainLayout = ({ children }) => {
  const pixelAnchorRef = useRef(null);
  const [pageCoverContents, setPageCoverContents] = useState(null);
  const [cleanUp, setCleanUp] = useState(() => {});

  return (
    <GlobalEventContextProvider>
      <span
        id="pixelAnchor"
        className="absolute top-0 left-0"
        ref={pixelAnchorRef}
      >
        &nbps;
      </span>

      {pageCoverContents && (
        <PageCover
          setPageCoverContents={setPageCoverContents}
          cleanUp={cleanUp}
          render={() => {
            return pageCoverContents;
          }}
        />
      )}

      <SiteNav pixelAnchorRef={pixelAnchorRef} />

      <div className="relative h-full flex flex-col">

        <PageCoverContext.Provider value={{ setPageCoverContents, setCleanUp }}>
          <main style={{marginTop: 'var(--ti-nav-height)'}}>{children}</main>
        </PageCoverContext.Provider>

        <footer className="bg-gray-default text-white text-center p-8">
          <span className="text-white font-thin text-xl">
            © {new Date().getFullYear()} | designed & created by{" "}
            <a
              className="text-white font-bold"
              href="https://macarthur.me/"
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
