import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import ogImage from '../images/open-graph.jpg';

function SEO({ description, lang, meta, keywords, title }) {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        ...allProductData
        siteMetadata {
          publicUrl
          title
          description
          typeItVersion
          author {
            name
            twitterHandle
            social
          }
        }
      }
    }
  `).site.siteMetadata;

  const metaDescription = description || data.description;

  const offers = data.licenseOptions.map(option => {
    return {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (option.price / 100).toFixed(2),
      seller: {
        "@type": "Person",
        name: data.author.name,
        sameAs: data.author.social
      }
    };
  });

  const formattedTitle = `${title.length > 0 ? title + " | " : ""}${
    data.title
  }`;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={formattedTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: formattedTitle
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: data.author.twitterHandle
        },
        {
          name: `twitter:title`,
          content: formattedTitle
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
        {
          name: `og:image`,
          content: `${data.publicUrl}${ogImage}`
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(meta)}
    >
      <script type="application/ld+json">{`
        {
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          "applicationCategory": "WebApplication",
          "description" : "${data.description}",
          "screenshot" : "https://typeitjs.com/open-graph.jpg",
          "softwareVersion" : "${data.typeItVersion}",
          "license" : "GPL-2.0",
          "offers": ${JSON.stringify(offers)}
        }
      `}</script>
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: []
};

export default SEO;
