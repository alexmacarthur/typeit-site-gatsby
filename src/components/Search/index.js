import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full m-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default ({ setShowSearch }) => {
  const inputRef = useRef(null);
  const isMounted = useRef(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    isMounted.current = true;

    inputRef.current.focus();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const closeSearch = () => {
    setShowSearch(false);
  };

  const onSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const query = inputRef.current.value;
    const response = await fetch(
      `${process.env.GATSBY_SEARCH_ENDPOINT}?query=${query}`
    );
    const results = await response.json();

    // Don't bother. This component isn't set anymore.
    if (!isMounted.current) {
      return;
    }

    setResults(results.documents);
    setIsLoading(false);
    setHasSearched(true);
  };

  const getResultCount = () => results.length;

  const getResultsText = () => {
    const count = getResultCount();
    return `result${count > 1 || count === 0 ? "s" : ""}`;
  };

  return (
    <div
      className={`
      rounded
      ring-4
      ring-gray-100
      fixed
      top-50
      left-50
      transform
      -translate-y-1/2
      -translate-x-1/2
      w-[90%]
      h-[90%]
      md:w-4/6
      md:h-5/6
      z-50
      p-6
      md:p-10
      overflow-scroll
      bg-white
      `}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="mb-0">Search</h3>
          <button
            onClick={closeSearch}
            aria-label="close search"
            className="padding-2 w-8 h-8 z-20"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mb-4">
          <label htmlFor="search" className="invisible -z-10 absolute">
            Search
          </label>

          <div className="flex flex-col md:flex-row gap-6 justify-between mb-10">
            <div className="flex-1">
              <input
                type="text"
                name="search"
                ref={inputRef}
                placeholder="Search for something..."
                className="py-3 px-5 mb-0 w-full "
              />
            </div>

            <div className="">
              <button
                type="submit"
                disabled={isLoading}
                className="button naked w-full"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>

          <div>
            {!hasSearched && <p>You haven't searched yet.</p>}

            {hasSearched && !isLoading ? (
              <div class="col-span-2">
                <span className="inline-block mb-2 text-lg font-semibold">
                  {getResultCount().toString()} {getResultsText()}
                </span>

                {getResultCount() > 0 ? (
                  <ul className="ring-4 ring-gray-100 rounded p-0 md:py-5 md:px-6">
                    {results.map((result) => {
                      return (
                        <li>
                          <Link
                            to={result.url}
                            onClick={closeSearch}
                            className="block hover:bg-gray-100 p-5 md:py-6 md:px-6 rounded"
                          >
                            <div className="flex md:items-center justify-between mb-2 flex-col md:flex-row">
                              <div className="flex flex-col">
                                <h4
                                  className="text-xl font-semibold m-0"
                                  dangerouslySetInnerHTML={{
                                    __html: result.heading,
                                  }}
                                ></h4>
                                <span className="text-gray-400 text-sm inline-block mb-2 break-words">
                                  https://typeitjs.com/
                                  {result.url.replace(/^\//, "")}
                                </span>
                              </div>
                              <Link
                                to={result.url}
                                className="m-0 text-base"
                                onClick={closeSearch}
                              >
                                Go there →
                              </Link>
                            </div>
                            <p className="text-lg m-0">{result.content}...</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div>
                    <p className="m-0">
                      Sorry, nothing was found! Try something else.
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};
