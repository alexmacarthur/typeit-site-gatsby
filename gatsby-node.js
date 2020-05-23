const path = require("path");
const cheerio = require('cheerio');
const { parseHeadings } = require('./node-helpers');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    let fileNode = getNode(node.parent);
    let isPage = fileNode.absolutePath.includes('/pages/');
    let slug = "";
    
    if(isPage) {
      let parts = fileNode.absolutePath.split('/').reverse();
      let snippingIndex = parts.findIndex(p => p === 'pages');
      slug = parts
        .slice(0, snippingIndex)
        .filter(i => !i.includes('index.'))
        .reverse()
        .join('/')
        .replace('.md', '');
    } else {
      slug = fileNode.absolutePath
        .split("/")
        .reverse()[0]
        .split(".")[0];
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug
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

  allProductData.forEach(product => {
    objectifiedProductData[product.slug] = product;
  });

  allProductData.forEach(thisProductData => {
    createPage({
      path: `/checkout/${thisProductData.slug}`,
      component: path.resolve("./src/templates/product.js"),
      context: {
        thisProductData,
        allProductData, // probably don't need to pass this anymore.
        objectifiedProductData // or this.
      }
    });
  });
}

/**
 * Turn any markdown file found within /src/pages into a page using the `page.js` template.
 *
 * @param {object} graphql
 * @param {object} createPage
 */
async function createMarkdownPages(graphql, createPage) {
  const pageMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//pages/(.*).md$/" } }
        sort: { fields: [fileAbsolutePath] }
      ) {
        edges {
          node {
            html
            id
            fileAbsolutePath
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

  pageMarkdownData.data.allMarkdownRemark.edges.forEach(page => {

    // Wrap each table with markup so we can implement horizontal scrolling.
    const $ = cheerio.load(page.node.html);

    $('table').each(function (i, elem) {
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
      path: page.node.fields.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: page.node.fields.slug, 
        html, 
        headings: parseHeadings(page.node.headings, page.node.fields.slug)
      }
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
  await createMarkdownPages(graphql, createPage);
  await createProductPages(graphql, createPage);
};
