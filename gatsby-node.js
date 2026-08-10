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

  const articleLanguages = ["pl", "en"]
  const articleDefaultLanguage = "pl"

  const articleGroupsById = (data.allContentfulArticle.edges || []).reduce(
    (acc, { node }) => {
      if (!acc[node.contentful_id]) {
        acc[node.contentful_id] = {}
      }
      acc[node.contentful_id][node.node_locale] = node
      return acc
    },
    {}
  )

  Object.values(articleGroupsById).forEach(nodesByLocale => {
    const plNode = nodesByLocale["pl-PL"]
    const enNode = nodesByLocale["en"]
    const plSlug = plNode?.slug?.trim()
    const enSlug = enNode?.slug?.trim()

    if (plSlug && enSlug) {
      const plPath = `/news/${plSlug}/`
      const enPath = `/en/news/${enSlug}/`

      createPage({
        path: `news/${plSlug}`,
        component: path.resolve(`./src/templates/news/index.js`),
        context: {
          article: { ...plNode, slug: plSlug },
          language: "pl",
          i18n: {
            language: "pl",
            languages: articleLanguages,
            defaultLanguage: articleDefaultLanguage,
            generateDefaultLanguagePage: false,
            routed: false,
            originalPath: plPath,
            path: plPath,
          },
        },
      })

      createPage({
        path: `en/news/${enSlug}`,
        component: path.resolve(`./src/templates/news/index.js`),
        context: {
          article: { ...enNode, slug: enSlug },
          language: "en",
          i18n: {
            language: "en",
            languages: articleLanguages,
            defaultLanguage: articleDefaultLanguage,
            generateDefaultLanguagePage: false,
            routed: true,
            originalPath: plPath,
            path: enPath,
          },
        },
      })
    } else {
      const soloNode = plSlug ? plNode : enNode
      const soloSlug = plSlug || enSlug
      if (!soloSlug) {
        return
      }

      createPage({
        path: `news/${soloSlug}`,
        component: path.resolve(`./src/templates/news/index.js`),
        context: {
          article: { ...soloNode, slug: soloSlug },
        },
      })
    }
  })

  const materialLanguages = ["pl", "en"]
  const materialDefaultLanguage = "pl"

  const materialGroupsById = data.allContentfulMaterials.edges.reduce(
    (acc, { node }) => {
      if (!acc[node.contentful_id]) {
        acc[node.contentful_id] = {}
      }
      acc[node.contentful_id][node.node_locale] = node
      return acc
    },
    {}
  )

  Object.values(materialGroupsById).forEach(nodesByLocale => {
    const plNode = nodesByLocale["pl-PL"]
    const enNode = nodesByLocale["en"]

    if (plNode && enNode) {
      const plSlug = slugify(plNode.title)
      const enSlug = slugify(enNode.title)
      const plPath = `/materials/${plSlug}/`
      const enPath = `/en/materials/${enSlug}/`

      createPage({
        path: `materials/${plSlug}`,
        component: path.resolve(`./src/templates/material/index.js`),
        context: {
          slug: plSlug,
          materialId: plNode.contentful_id,
          language: "pl",
          i18n: {
            language: "pl",
            languages: materialLanguages,
            defaultLanguage: materialDefaultLanguage,
            generateDefaultLanguagePage: false,
            routed: false,
            originalPath: plPath,
            path: plPath,
          },
        },
      })

      createPage({
        path: `en/materials/${enSlug}`,
        component: path.resolve(`./src/templates/material/index.js`),
        context: {
          slug: enSlug,
          materialId: enNode.contentful_id,
          language: "en",
          i18n: {
            language: "en",
            languages: materialLanguages,
            defaultLanguage: materialDefaultLanguage,
            generateDefaultLanguagePage: false,
            routed: true,
            originalPath: plPath,
            path: enPath,
          },
        },
      })
    } else {
      const soloNode = plNode || enNode
      createPage({
        path: `materials/${slugify(soloNode.title)}`,
        component: path.resolve(`./src/templates/material/index.js`),
        context: {
          slug: slugify(soloNode.title),
          materialId: soloNode.contentful_id,
        },
      })
    }
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
