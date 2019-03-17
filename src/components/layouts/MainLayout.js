import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import SiteNav from "../SiteNav";
import PageCover from "../PageCover";
import PageCoverContext from "../../PageCoverContext";

const MainLayout = ({ children }) => {
  const pixelAnchorRef = useRef(null);
  const [pageCoverContents, setPageCoverContents] = useState(null);
  const [cleanUp, setCleanUp] = useState(() => {});

  return (
    <>
      <span
        id="pixelAnchor"
        className="absolute top-0 left-0"
        ref={pixelAnchorRef}
      >
        anchor!
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
          <main className="mt-16 md:mt-24 py-20">{children}</main>
        </PageCoverContext.Provider>

        <footer className="bg-gray text-white text-center p-12">
          <span className="text-white font-thin text-xl">
            © {new Date().getFullYear()} | Created by{" "}
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
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainLayout;
