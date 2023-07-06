const packageLock = require("../../package-lock.json");

const variables = {
  TYPEIT_VERSION: packageLock.dependencies.typeit.version,
};

const astMap = (tree, mapFunction) => {
  return processNodes(tree, null, null);

  function processNodes(node, index, parent) {
    var newNode = Object.assign({}, mapFunction(node, index, parent));

    if ("children" in node) {
      newNode.children = node.children.map((child, index) =>
        processNodes(child, index, node),
      );
    }

    return newNode;
  }
};

const processVariables = (content) =>
  content.replace(/@{(\S+)}/g, (_match, variableName) => {
    if (variables[variableName]) return variables[variableName];

    throw `Variable does not have value: ${variableName}`;
  });

module.exports = ({ markdownAST }) => {
  return astMap(markdownAST, function (node) {
    if (node.value) {
      node.value = processVariables(node.value);
    }

    return node;
  });
};
