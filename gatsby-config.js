const path = require("path");
const licenseOptions = require("./licenseOptions");
const packageLock = require("./package-lock.json");

require("dotenv").config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    publicUrl: "https://typeitjs.com",
    title: `TypeIt`,
    description: `The most versatile JavaScript animated typing utility on the planet.`,
    author: {
      name: "Alex MacArthur",
      twitterHandle: "@amacarthur",
      social: [
        "https://www.linkedin.com/in/alexmacarthur",
        "https://www.twitter.com/amacarthur",
        "https://github.com/alexmacarthur"
      ]
    },
    typeItVersion: packageLock.dependencies.typeit.version,
    perks: [
      {
        text: "~4kb gzipped",
        component: "Feather"
      },
      {
        text: "no dependencies",
        component: "Laugh"
      },
      {
        text: "super flexible API",
        component: "Spock"
      },
      {
        text: "SEO-friendly",
        component: "Signs"
      }
    ],
    licenseOptions,
    homeSlices: {
      flavors: {
        description: `For easy usage in a wide variety of projects, TypeIt's ready to go in multiple different packages. Purchase a license, and you get to choose which implementation is best for your needs.`
      },
      pricing: {
        description: ``
      }
    }
  },
  plugins: [
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `UA-69226290-1`
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-preact`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`300`, `400`, `600`, `700`]
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        whitelist: ['StripeElement'], // Don't remove this selector
        ignore: ["prismjs/", "/src/scss/root.scss"] // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/public/icons/`
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `copy`,
        path: `${__dirname}/src/copy/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false
            }
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `50`,
              removeAccents: true, 
              icon: ``,
            }
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TypeIt`,
        short_name: `typeit`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#805ad5`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@variables": path.resolve(__dirname, "src/css/variables")
        },
        extensions: [".js"]
      }
    }
  ]
};
