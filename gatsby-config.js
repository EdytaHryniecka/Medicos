require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const slugify = text =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  trailingSlash: "always",
  siteMetadata: {
    title: `Medicos | Łączymy przemysł z producentami surowców chemicznych`,
    author: "Medicos",
    author: {
      name: `Medicos`,
      summary: `Medicos`,
    },
    description: `Nasza firma oferuje surowce chemiczne i składniki aktywne z doradztwem i zabezpieczoną dostawą dla innowacyjnych rozwiązań.`,
    siteUrl: `https://medicos.com.pl`,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-W98XBQ5F",
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: true,
        id: 4984875,
        sv: 6,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/locales`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locales`,
        languages: [`pl`, `en`],
        defaultLanguage: `pl`,
        siteUrl: `https://medicos.com.pl`,
        redirect: false,
        pages: [
          {
            matchPath: "/dev-404-page",
            languages: ["pl"],
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Medicos`,
        short_name: `Medicos`,
        start_url: `/`,
        background_color: `#faf0f9`,
        display: `standalone`,
        icon: `src/images/medicos-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [
          `/404/`,
          `/en/404/`,
          `/404.html`,
          `/en/404.html`,
          `/search/`,
          `/en/search/`,
          `/thank-you-for-your-message/`,
          `/en/thank-you-for-your-message/`,
          `/en/quality-standards/`,
          `/en/privacy-policy/`,
        ],
        query: `{
          allSitePage {
            nodes {
              path
            }
          }
          allContentfulMaterials {
            nodes {
              contentful_id
              title
              node_locale
              updatedAt
            }
          }
          allContentfulArticle {
            nodes {
              contentful_id
              slug
              node_locale
              updatedAt
            }
          }
        }`,
        resolveSiteUrl: () => `https://medicos.com.pl`,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allContentfulMaterials: { nodes: materials },
          allContentfulArticle: { nodes: articles },
        }) => {
          const lastmodByPath = {}
          const materialGroups = materials.reduce((acc, node) => {
            if (!acc[node.contentful_id]) acc[node.contentful_id] = {}
            acc[node.contentful_id][node.node_locale] = node
            return acc
          }, {})

          Object.values(materialGroups).forEach(
            ({ "pl-PL": plNode, en: enNode }) => {
              if (plNode && enNode) {
                lastmodByPath[`/materials/${slugify(plNode.title)}/`] =
                  plNode.updatedAt
                lastmodByPath[`/en/materials/${slugify(enNode.title)}/`] =
                  enNode.updatedAt
              } else {
                const soloNode = plNode || enNode
                const soloSlug = slugify(soloNode.title)
                lastmodByPath[`/materials/${soloSlug}/`] = soloNode.updatedAt
                lastmodByPath[`/en/materials/${soloSlug}/`] = soloNode.updatedAt
              }
            }
          )

          const articleGroups = articles.reduce((acc, node) => {
            if (!acc[node.contentful_id]) acc[node.contentful_id] = {}
            acc[node.contentful_id][node.node_locale] = node
            return acc
          }, {})

          Object.values(articleGroups).forEach(
            ({ "pl-PL": plNode, en: enNode }) => {
              const plSlug = plNode?.slug?.trim()
              const enSlug = enNode?.slug?.trim()

              if (plSlug) {
                lastmodByPath[`/news/${plSlug}/`] = plNode.updatedAt
              }

              if (enSlug && enSlug !== plSlug) {
                lastmodByPath[`/en/news/${enSlug}/`] = enNode.updatedAt
              } else if (plSlug) {
                lastmodByPath[`/en/news/${plSlug}/`] = enNode
                  ? enNode.updatedAt
                  : plNode.updatedAt
              }
            }
          )

          return allPages.map(page => ({
            ...page,
            lastmod: lastmodByPath[page.path],
          }))
        },
        serialize: ({ path: pagePath, lastmod }) => ({
          url: pagePath,
          ...(lastmod ? { lastmod } : {}),
        }),
      },
    },
  ],
}
