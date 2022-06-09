import React, { useEffect, useRef, useState } from "react";
import TypeIt from "typeit-react";
import { sendEvent } from "../../utilities";
import CopyButton from "../CopyButton";
import {
  buildInstance,
  instanceMethodsToArray,
  processTemplate,
} from "./utils";
import { State, EventProps } from './types';
import Editor from "./editor";

const typeItOptions = { lifeLike: true, speed: 0, waitUntilVisible: true };

const Demo = ({ pagePath }: { pagePath: string }) => {
  const contentRef = useRef(null);
  const editorRef = useRef(null);
  const contentContainerRef = useRef(null);
  const [error, setError] = useState<string>("");
  const [capturedStrokes, setCapturedStrokes] = useState([]);
  const [builtInstance, setBuiltInstance] = useState(null);
  const [playerState, setPlayerState] = useState<State>("WAITING");
  const is = (s: State) => s === playerState;
  const getEditorValue = (): string => editorRef?.current?.value || "";

  const sendDemoEvent = (name: string, props: EventProps = {}) => {
    props.page_path = pagePath;

    sendEvent(name, props);
  };

  useEffect(() => {
    if(playerState !== 'RECORDING') return;

    setCapturedStrokes([]);

    // destroy the instnace.
  }, [playerState]);

  const finishRecording = (strokes) => {
    setCapturedStrokes(strokes);

    if (!is("RECORDING")) {
      return;
    }

    // -- Trigger the instance to render...
    setPlayerState("PLAYING");
    sendDemoEvent("Demo", {
      content: contentRef.current.value,
    });

    contentRef.current.value = "";
  };

  const handlePlayAgainClick = () => {
    setError("");
    sendDemoEvent("Demo :: Play Again");

    try {
      const { instanceMethods, options } = processTemplate(
        editorRef.current.value
      );
      const methodDetails = instanceMethodsToArray(instanceMethods);

      // Rebuild the instance queue.
      return builtInstance
        .reset((i) => {
          i.options(options);

          methodDetails.forEach(({ methodName, args }) =>
            i[methodName](...args)
          );
        })
        .go();
    } catch (e) {
      sendDemoEvent("Demo :: Error", {
        custom_instance: editorRef.current.value,
      });

      setError(
        "Uh-oh! Something went wrong. Make sure you only change the <strong>options</strong> or <strong>instance methods</strong> before running it again."
      );
    }
  };

  const handleTabbing = (e) => {
    if (!/tab/i.test(e.code)) {
      return;
    }

    e.preventDefault();

    editorRef.current.setRangeText(
      "\t",
      editorRef.current.selectionStart,
      editorRef.current.selectionStart,
      "end"
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <div className="mb-10">
          <div className="heading-spread">
            <h4 className="text-xl font-normal m-0">Record Your Animation</h4>

            <button
              className="button naked slim"
              disabled={!is("RECORDING")}
              onClick={finishRecording}
            >
              Stop Recording
            </button>
          </div>

          <div className="mb-6">
            <Editor
              isRecording={is("RECORDING")}
              contentRef={contentRef}
              finishRecording={finishRecording}
              setPlayerState={setPlayerState}
            />
          </div>
        </div>

        <div>
          <div className="heading-spread">
            <h4 className="text-xl font-normal mb-0">Watch Your Animation</h4>
          </div>
          <div
            ref={contentContainerRef}
            className="bg-zinc-50 border-4 border-zinc-100 p-6 rounded"
          >
            {is("PLAYING") && (
              <TypeIt
                className="block"
                options={typeItOptions}
                getBeforeInit={(instance) => {

                  const { instance: newInstance, template } = buildInstance({
                    strokes: capturedStrokes,
                    instance,
                  });

                  editorRef.current.value = template;
                  setCapturedStrokes([]);
                  setBuiltInstance(newInstance);

                  // Animate height of textarea.
                  editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;

                  return newInstance;
                }}
              />
            )}

            {!is("PLAYING") && <span>...</span>}
          </div>
        </div>
      </div>
      <div>
        <div className="heading-spread">
          <h4 className="text-xl font-normal m-0">Tweak Your Animation</h4>
          <button
            className="button naked slim"
            disabled={!builtInstance}
            onClick={handlePlayAgainClick}
          >
            Play Again
          </button>
        </div>

        {error && (
          <div className="border-2 border-red-500 rounded p-3 bg-red-50 mt-6 mb-8">
            <span
              className="text-base text-red-500"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          </div>
        )}

        <code className="block language-js p-6 gatsby-highlight relative !m-0">
          {getEditorValue() && (
            <CopyButton retrieveContent={() => getEditorValue()} />
          )}

          <pre>
            <textarea
              disabled={is("WAITING")}
              className="bg-inherit w-full h-full h-[150px] ring-0 resize-none transition-all delay-100 ease-in-out duration-300"
              ref={editorRef}
              onKeyDown={handleTabbing}
              placeholder="..."
            />
          </pre>
        </code>
      </div>
    </div>
  );
};

export default Demo;
