import React from "react";
import { useKeyRecordingHandler } from "./hooks";

const Editor = ({
  contentRef,
  finishRecording,
  setPlayerState,
  isRecording
}) => {
  const [handleKeyRecording, strokes, setStrokes] =
    useKeyRecordingHandler(setPlayerState);
    
  return (
    <textarea
    ref={contentRef}
      className={`w-full m-0 ${isRecording ? "is-active" : ""}`}
      placeholder="Start typing to record something..."
      onChange={(e) => (handleKeyRecording as Function)(e)}
      onBlur={() => {
        finishRecording(strokes);
        (setStrokes as Function)([]);
      }}
    ></textarea>
  );
};

export default Editor;
