const path = require("path");
const cheerio = require("cheerio");
const {
  saveSearchDocuments,
  generateDocuments,
  deleteFile,
  formatSlug,
  parseHeadings,
} = require("./node-helpers");
const processSidebarHeadings = require("./process-sidebar-headings");
const searchDocumentFile = `${process.cwd()}/search-documents.json`;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    let fileNode = getNode(node.parent);
    let isPage = fileNode.absolutePath.includes("/pages/");
    let slug = "";

    if (isPage) {
      let parts = fileNode.absolutePath.split("/").reverse();
      let snippingIndex = parts.findIndex((p) => p === "pages");
      slug = parts
        .slice(0, snippingIndex)
        .filter((i) => !i.includes("index."))
        .reverse()
        .join("/")
        .replace(".md", "");
    } else {
      slug = fileNode.absolutePath.split("/").reverse()[0].split(".")[0];
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};

/**
 * Turn each license/product into a page used to purchase it.
 *
 * @param {object} graphql
 * @param {object} createPage
 */
async function createProductPages(graphql, createPage) {
  const rawProductData = await graphql(
    `
      {
        site {
          siteMetadata {
            licenseOptions {
              htmlTitle
              simpleTitle
              description
              price
              slug
            }
          }
        }
      }
    `
  );

  const allProductData = rawProductData.data.site.siteMetadata.licenseOptions;
  const objectifiedProductData = {};

  allProductData.forEach((product) => {
    objectifiedProductData[product.slug] = product;
  });

  allProductData.forEach((thisProductData) => {
    createPage({
      path: `/checkout/${thisProductData.slug}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        thisProductData,
        allProductData, // probably don't need to pass this anymore.
        objectifiedProductData, // or this.
      },
    });
  });
}

/**
 * Turn any markdown file found within /src/pages into a page using the `page.js` template.
 *
 * @param {object} graphql
 * @param {object} createPage
 */
async function createMarkdownPages({
  graphql,
  createPage,
  pattern,
  simpleSidebarHeadings = false,
  shouldMakeSearchable = true,
} = {}) {
  const pageMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//pages/${pattern}.md$/" } }
        sort: { fields: [fileAbsolutePath] }
      ) {
        edges {
          node {
            html
            id
            fileAbsolutePath
            frontmatter {
              title
            }
            fields {
              slug
            }
            headings {
              value
              depth
            }
          }
        }
      }
    }
  `);

  const { edges } = pageMarkdownData.data.allMarkdownRemark;
  let headings = [];

  if (!simpleSidebarHeadings) {
    headings = processSidebarHeadings(edges);
  }

  edges.forEach((edge) => {
    const formattedSlug = formatSlug(edge);

    if (simpleSidebarHeadings) {
      headings = parseHeadings(edge.node.headings, formattedSlug);
    }

    if (shouldMakeSearchable) {
      saveSearchDocuments({
        documentPath: searchDocumentFile,
        documents: generateDocuments({
          html: edge.node.html,
          path: formattedSlug,
          title: edge.node.frontmatter?.title || "",
        }),
      });
    }

    // Wrap each table with markup so we can implement horizontal scrolling.
    const $ = cheerio.load(edge.node.html);

    $("table").each(function (i, elem) {
      let rawHTML = $.html(elem);
      let formattedHTML = rawHTML
        .replace(/(\r\n|\n|\r)/gm, " ")
        .replace(/(<table(?:.*?)>(?:.+?)(?:<\/table>))/g, (match) => {
          return `
          <div class='tableWrapper'>
            <span class="md:hidden block mb-4 text-base text-gray-medium">To view all columns, you may need to scroll horizontally.</span>
            <div class='tableWrapper-inner'>
              ${match}
            </div>
          </div>
        `;
        });

      $(elem).replaceWith(formattedHTML);
    });

    let html = $.html();

    createPage({
      path: formattedSlug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: edge.node.fields.slug, // MUST be the original, unformatted slug.
        html,
        headings,
      },
    });
  });
}

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  deleteFile(searchDocumentFile);

  // Old documentation pages.
  await createMarkdownPages({
    graphql,
    createPage,
    pattern: "docs/v([0-9]+)/(.*)",
    shouldMakeSearchable: false,
  });

  // Current documentation pages.
  await createMarkdownPages({
    graphql,
    createPage,
    pattern: "docs/CURRENT/(.*)",
  });

  // Every other page.
  await createMarkdownPages({
    graphql,
    createPage,
    simpleSidebarHeadings: true,
    pattern: "((?!docs/).*)",
  });

  await createProductPages(graphql, createPage);
};
