import React, { useState } from "react";
import Copy from "./icons/Copy";

const CopyButton = ({ retrieveContent }: { retrieveContent: () => string }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  return (
    <span
      onClick={() => {
        setHasCopied(true);
        navigator.clipboard.writeText(retrieveContent());
      }}
      className="absolute z-10 text-white right-1 top-1"
    >
      {hasCopied ? "Copied!" : <Copy />}
    </span>
  );
};

export default CopyButton;
