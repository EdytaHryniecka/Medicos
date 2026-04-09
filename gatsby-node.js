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
            contentful_id
            slug
            title
            canonical
          }
        }
      }
      allContentfulMaterials {
        edges {
          node {
            node_locale
            title
            contentful_id
          }
        }
      }
    }
  `)

  const articleEdges = data.allContentfulArticle.edges || []
  const plSlugById = articleEdges.reduce((acc, { node }) => {
    if (node.node_locale === "pl-PL" && node.contentful_id) {
      acc[node.contentful_id] = node.slug
    }
    return acc
  }, {})

  articleEdges.forEach(({ node }) => {
    const localizedSlug = node.slug
    const plSlug = plSlugById[node.contentful_id]

    if (
      !localizedSlug ||
      !localizedSlug.trim() ||
      (node.node_locale === "en" && plSlug && localizedSlug === plSlug)
    ) {
      return
    }

    createPage({
      path: `news/${localizedSlug.trim()}`,
      component: path.resolve(`./src/templates/news/index.js`),
      context: {
        article: {
          ...node,
          slug: localizedSlug.trim(),
        },
      },
    })
  })

  data.allContentfulMaterials.edges.forEach(({ node }) => {
    createPage({
      path: `materials/${slugify(node.title)}`,
      component: path.resolve(`./src/templates/material/index.js`),
      context: {
        slug: slugify(node.title),
        materialId: node.contentful_id,
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
