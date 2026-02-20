const path = require(`path`)

const slugify = text =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

// comment blog
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allContentfulArticle {
        edges {
          node {
            node_locale
            slug
            title
          }
        }
      }
      allContentfulMaterials {
        edges {
          node {
            node_locale
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

  data.allContentfulMaterials.edges.forEach(({ node }) => {
    createPage({
      path: `materials/${slugify(node.title)}`,
      component: path.resolve(`./src/templates/material/index.js`),
      context: {
        slug: slugify(node.title),
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

exports.onCreateWebpackConfig = ({ actions }) => {
  const { setWebpackConfig } = actions
  setWebpackConfig({
    resolve: {
      fallback: {
        fs: false, // or require.resolve("path-browserify")
        path: false,
      },
    },
  })
}
