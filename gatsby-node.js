const path = require("path");
// const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    // If this node was source from the "posts" directory, slap a prefix onto the slug,
    // so that the resulting path is formatted correctly.
    let fileNode = getNode(node.parent);
    let slug = fileNode.absolutePath
      .split("/")
      .reverse()[0]
      .split(".")[0];

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
            id
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  pageMarkdownData.data.allMarkdownRemark.edges.forEach(page => {
    createPage({
      path: page.node.fields.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: page.node.fields.slug
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
