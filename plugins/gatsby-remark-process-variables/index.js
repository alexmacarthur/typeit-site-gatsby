const map = require("unist-util-map");
const packageLock = require("../../package-lock.json");

const variables = {
  TYPEIT_VERSION: packageLock.dependencies.typeit.version,
};

const processVariables = (content) =>
  content.replace(/@{(\S+)}/g, (_match, variableName) => {
    if (variables[variableName]) return variables[variableName];

    throw `Variable does not have value: ${variableName}`;
  });

module.exports = ({ markdownAST }) => {
  return map(markdownAST, function (node) {
    if (node.value) {
      node.value = processVariables(node.value);
    }

    return node;
  });
};
