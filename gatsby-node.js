const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allContentfulArticle {
        edges {
          node {
            node_locale
            author
            createdAt(formatString: "DD/MM/YYYY HH:MM")
            description {
              raw
              references {
                ... on ContentfulAsset {
                  __typename
                  contentful_id
                  file {
                    url
                  }
                }
                title
              }
            }
            image {
              gatsbyImageData(quality: 100)
            }
            slug
            title
          }
        }
      }
    }
  `)

  data.allContentfulArticle.edges.forEach(({ node }) => {
    createPage({
      path: `news/${node.slug}`,
      component: path.resolve(`./src/templates/news/index.js`),
      context: {
        article: node,
      },
    })
  })
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
