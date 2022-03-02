import { useState } from "react";
import { KeyRecordingEntry, Stroke } from "./types";

export const useKeyRecordingHandler = (setState: Function) => {
  const [previousCursorDiff, setPreviousCursorDiff] = useState(0);
  const [strokes, setStrokes] = useState<any[]>([]);
  const pushStrokes = (newStrokes) => {
    setStrokes(() => strokes.concat(newStrokes));
  };

  const handleKeyRecording = ({
    key,
    event,
  }: KeyRecordingEntry) => {
    setState("RECORDING");

    const target = event.target as HTMLTextAreaElement;
    const currentContentLength = target.value.length;
    const currentCursorDiff = currentContentLength - target.selectionStart;
    const cursorSpacesToMove = currentCursorDiff - previousCursorDiff;
    const newStrokes: Stroke[] = [];
    const { timeStamp } = event;

    setPreviousCursorDiff(currentCursorDiff);

    // Only push a `.move()` action when we
    // actually have movement.
    if (Math.abs(cursorSpacesToMove) > 0) {
      newStrokes.push({
        data: {
          methodName: "move",
          args: [cursorSpacesToMove * -1],
        },
        timeStamp,
      });
    }

    newStrokes.push({
      data: key,
      timeStamp,
    });

    pushStrokes(newStrokes);
  };

  return [handleKeyRecording, setStrokes, strokes];
};
