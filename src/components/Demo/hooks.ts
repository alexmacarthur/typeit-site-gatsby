import { useState } from "react";
import striff from "striff";
import { Stroke } from "./types";

export const useKeyRecordingHandler = (setState: Function) => {
  const [previousContent, setPreviousContent] = useState("");
  const [previousCursorDiff, setPreviousCursorDiff] = useState(0);
  const [strokes, setStrokes] = useState([]);
  const pushStrokes = (newStrokes) => {
    setStrokes(() => strokes.concat(newStrokes));
  };

  const handleKeyRecording = (event: any): void => {
    setState("RECORDING");

    const target = event.target as HTMLTextAreaElement;
    const currentContentLength = target.value.length;
    const currentCursorDiff = currentContentLength - target.selectionStart;
    const cursorSpacesToMove = currentCursorDiff - previousCursorDiff;
    const newStrokes: Stroke[] = [];
    const { timeStamp } = event;
    const { added, removed } = striff(previousContent, event.target.value);

    setPreviousContent(event.target.value);
    setPreviousCursorDiff(currentCursorDiff);

    // Cursor movement!
    if (Math.abs(cursorSpacesToMove) > 0) {
      newStrokes.push({
        data: {
          methodName: "move",
          args: [cursorSpacesToMove * -1],
        },
        timeStamp,
      });
    }

    // Backspacing!
    if (removed.length) {
      let args: any[] = [removed.length];

      if (removed.length > 1) {
        args.push({ instant: true });
      }

      newStrokes.push({
        data: {
          methodName: "delete",
          args,
        },
        timeStamp,
        prependDelay: true,
      });
    }

    // Character additions!
    if (added.length) {
      newStrokes.push({
        data: added.map(({ value }) => value).join(""),
        timeStamp,
      });
    }

    pushStrokes(newStrokes);
  };

  return [handleKeyRecording, strokes, setStrokes];
};
