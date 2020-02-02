import React, {useMemo} from 'react';
import getExamples from "./getExamples";
import Example from "../Example";

export default ({examples}) => {

    if(typeof window !== "undefined") {
        window.ti_exampleTimeouts = window.ti_exampleTimeouts || {};
    }

    const exampleInstances = useMemo(() => {
        return getExamples((key, ti) => {
            let exampleTimeoutsCopy = Object.assign({}, window.ti_exampleTimeouts);

            if (exampleTimeoutsCopy[key]) {
                exampleTimeoutsCopy[key].push(ti);
            } else {
                exampleTimeoutsCopy[key] = [ti];
            }

            window.ti_exampleTimeouts = exampleTimeoutsCopy;
        });
    }, []);

    return (
        <div className="md:px-8">
            {examples.edges.map((edge, index) => {
                let noExtension = edge.node.fileAbsolutePath
                    .split(".")
                    .slice(0, -1)
                    .join(".");
                let fileName = noExtension
                    .split("/")
                    .reverse()[0]
                    .replace(/\d-/, "");
                let isLast = index + 1 === examples.edges.length;

                return (
                    <Example
                        data={edge.node}
                        exampleSlug={fileName}
                        instance={exampleInstances[fileName]}
                        isLast={isLast}
                        key={edge.node.id}
                    />
                );
            })}
        </div>
    )
}
