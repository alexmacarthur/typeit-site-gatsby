const fs = require("fs");
const GithubSlugger = require("github-slugger");

/**
 * Format headings for the sidebar.
 *
 * @param {array} headings
 * @param {integer} level
 */
function organizeHeadings(headings, level = 2) {
  const withSubHeadings = headings.map((heading, index) => {
    if (heading.depth > level) return heading;
    let subHeadings = [];

    let i = index + 1;
    while (headings[i] && headings[i].depth !== heading.depth) {
      subHeadings.push(headings[i]);
      i++;
    }

    // Only include the subHeadings one later deeper.
    heading.subHeadings = subHeadings.filter(
      (h) => h.depth === heading.depth + 1
    );

    return heading;
  });

  return withSubHeadings.filter((heading) => {
    return heading.depth === level;
  });
}

// Ideally, this would be done before it gets to the component level.
function generateHashes(headings, pathToPrepend) {
  const slugger = new GithubSlugger();

  return headings.map((heading) => {
    const hash = slugger.slug(heading.value);

    // Prepend the hash so Gatsby doesn't take us to the home page.
    heading.path = `/${pathToPrepend}#${hash}`;

    // Recursively do the same thing to any subheadings attached.
    if (heading.subHeadings) {
      heading.subHeadings = generateHashes(heading.subHeadings, pathToPrepend);
    }

    return heading;
  });
}

const formatSlug = (edge) => {
  return edge.node.fields.slug
    .replace(/CURRENT(\/?)/, "") // remove 'CURRENT'
    .replace(/\/$/, "") // remove trailing slash
    .replace(/\/([0-9]+)-/, "/"); // remove order prefix
};

const parseHeadings = function (headings, pathToPrepend = "", level = 2) {
  let organizedHeadings = organizeHeadings(headings, level);
  let withPagePath = organizedHeadings.map((heading) => {
    heading.path = pathToPrepend;

    return heading;
  });
  return generateHashes(withPagePath, pathToPrepend);
};

const headingPattern = /(<h[1-6] (?:.*)>(?:.*)<\/h[1-6]>)/;

const removeTags = (content) => {
  return content
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/\r?\n|\r/g, " ")
    .trim();
};

const deleteFile = (name) => {
  try {
    fs.unlinkSync(name);
  } catch (err) {
    console.log("Could not delete file. Did it exist to begin with?");
  }
};

const generateDocuments = ({ html, path, title }) => {
  const splitByHeadings = html.split(headingPattern);
  const documents = [];
  const slugger = new GithubSlugger();

  splitByHeadings.forEach((item, index) => {
    if (index === 0) {
      documents.push({
        path,
        heading: title,
        content: removeTags(item),
      });
    }

    if (item.match(headingPattern)) {
      const heading = removeTags(item);

      documents.push({
        path: `/${path}#${slugger.slug(heading)}`,
        heading,
        content: splitByHeadings[index + 1]
          ? removeTags(splitByHeadings[index + 1])
          : "",
      });
    }
  });

  return documents;
};

const saveSearchDocuments = ({ documentPath, documents } = {}) => {
  const readOrCreate = () => {
    if (fs.existsSync(documentPath)) {
      return JSON.parse(fs.readFileSync(documentPath, "utf-8") || "[]");
    }

    fs.writeFileSync(documentPath, "");
    return [];
  };

  let contents = readOrCreate();

  contents = contents.concat(documents);

  fs.writeFileSync(documentPath, JSON.stringify(contents));
};

module.exports = {
  formatSlug,
  parseHeadings,
  generateDocuments,
  saveSearchDocuments,
  deleteFile,
};
