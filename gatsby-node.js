const path = require(`path`)

const slugify = text =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")

const FORMULATION_TYPE = "ContentfulFormulation"
const INGREDIENT_TYPE = "ContentfulFormulationIngredient"
const MATERIAL_TYPE = "ContentfulMaterials"

const FORMULATION_FIELDS = [
  "title",
  "category",
  "tags",
  "shortDescription",
  "description",
  "testingTips",
  "image",
  "ingredients",
]
const INGREDIENT_FIELDS = ["name", "inci", "description", "material"]

const RAW_MATERIAL_GROUPS = [
  "Emolienty",
  "Humektanty",
  "Emulgatory i koemulgatory",
  "Solubilizatory",
  "Surfaktanty myjące i pianotwórcze",
  "Modyfikatory reologii i konsystencji",
  "Składniki kondycjonujące",
  "Składniki filmotwórcze i utrwalające",
  "Składniki aktywne",
  "Antyoksydanty",
  "Konserwanty i wsparcie konserwacji",
  "Składniki dezodorujące i antyperspiracyjne",
  "Filtry UV",
  "Pigmenty i barwniki",
  "Modyfikatory sensoryczne i optyczne",
  "Składniki złuszczające",
  "Środki zwilżające i dyspergujące",
  "Chelatory",
  "Regulatory pH i bufory",
  "Rozpuszczalniki i nośniki",
  "Składniki zapachowe",
]

const normalizeGroups = groups => {
  const selected = new Set(
    (Array.isArray(groups) ? groups : []).map(group => (group || "").trim())
  )
  return RAW_MATERIAL_GROUPS.filter(group => selected.has(group))
}

const TYPES_QUERY = `
  query {
    formulation: __type(name: "${FORMULATION_TYPE}") { ...TypeFields }
    ingredient: __type(name: "${INGREDIENT_TYPE}") { ...TypeFields }
    material: __type(name: "${MATERIAL_TYPE}") { ...TypeFields }
  }
  fragment TypeFields on __Type {
    fields {
      name
      type {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
          }
        }
      }
    }
  }
`

const unwrapType = type => {
  let current = type
  while (current && (current.kind === "NON_NULL" || current.kind === "LIST")) {
    current = current.ofType
  }
  return current || {}
}

const fieldMap = type =>
  new Map(
    (type?.fields || []).map(field => [field.name, unwrapType(field.type)])
  )

const textSelection = (fields, name) => {
  const type = fields.get(name)
  if (!type) return ""
  return type.kind === "SCALAR" ? name : `${name} { ${name} }`
}

const buildFormulationsQuery = (types, reporter) => {
  const formulation = fieldMap(types.formulation)
  const ingredient = fieldMap(types.ingredient)
  const material = fieldMap(types.material)

  const missing = [
    ...FORMULATION_FIELDS.filter(name => !formulation.has(name)).map(
      name => `formulation.${name}`
    ),
    ...(formulation.has("ingredients")
      ? INGREDIENT_FIELDS.filter(name => !ingredient.has(name)).map(
          name => `formulationIngredient.${name}`
        )
      : []),
  ]
  if (missing.length) {
    reporter.warn(
      `[formulations] fields missing in Contentful (skipped): ${missing.join(
        ", "
      )}`
    )
  }

  const ingredientSelection = types.ingredient
    ? `
        ingredients {
          ... on ${INGREDIENT_TYPE} {
            contentful_id
            ${ingredient.has("name") ? "name" : ""}
            ${ingredient.has("inci") ? "inci" : ""}
            ${textSelection(ingredient, "description")}
            ${
              ingredient.has("material") && material.has("title")
                ? `material { ... on ${MATERIAL_TYPE} { contentful_id title ${
                    material.has("inci") ? "inci" : ""
                  } ${
                    material.has("rawMaterialGroups") ? "rawMaterialGroups" : ""
                  } } }`
                : ""
            }
          }
        }`
    : ""

  const sort = formulation.has("order")
    ? "sort: [{ order: ASC }, { createdAt: ASC }]"
    : "sort: { createdAt: ASC }"

  return `
    query {
      allContentfulFormulation(${sort}) {
        nodes {
          contentful_id
          node_locale
          ${formulation.has("title") ? "title" : ""}
          ${formulation.has("category") ? "category" : ""}
          ${formulation.has("tags") ? "tags" : ""}
          ${formulation.has("showInEnglish") ? "showInEnglish" : ""}
          ${textSelection(formulation, "shortDescription")}
          ${textSelection(formulation, "description")}
          ${textSelection(formulation, "testingTips")}
          ${
            formulation.has("image") ? "image { description file { url } }" : ""
          }
          ${formulation.has("ingredients") ? ingredientSelection : ""}
        }
      }
    }
  `
}

const FORMULATIONS_ORIGINAL_PATH = "/formulations/"

const FORMULATION_LANGUAGES = [
  { language: "pl", locale: "pl-PL", path: FORMULATIONS_ORIGINAL_PATH },
  { language: "en", locale: "en", path: `/en${FORMULATIONS_ORIGINAL_PATH}` },
]

const FORMULATIONS_DATA_DIR = "formulations-data"

const toCardData = formulation => ({
  id: formulation.id,
  title: formulation.title,
  category: formulation.category,
  tags: formulation.tags,
  shortDescription: formulation.shortDescription,
  image: formulation.image,
  ingredients: formulation.ingredients.map(
    ({ id, name, inci, href, groups }) => ({
      id,
      name,
      inci,
      href,
      groups,
    })
  ),
})

const toDetailsData = formulation => ({
  id: formulation.id,
  description: formulation.description,
  testingTips: formulation.testingTips,
  ingredients: formulation.ingredients.map(
    ({ id, name, inci, description }) => ({ id, name, inci, description })
  ),
})

const writeFormulationDetails = formulationsByLanguage => {
  const fs = require("fs")
  const root = path.join(process.cwd(), "public", FORMULATIONS_DATA_DIR)
  fs.rmSync(root, { recursive: true, force: true })
  Object.entries(formulationsByLanguage).forEach(([language, formulations]) => {
    if (!formulations.length) return
    const dir = path.join(root, language)
    fs.mkdirSync(dir, { recursive: true })
    formulations.forEach(formulation => {
      if (!/^[A-Za-z0-9_-]+$/.test(formulation.id)) return
      fs.writeFileSync(
        path.join(dir, `${formulation.id}.json`),
        JSON.stringify(toDetailsData(formulation))
      )
    })
  })
}

const textValue = (value, name) =>
  (typeof value === "string" ? value : value?.[name]) || ""

const normalizeFormulation = node => ({
  id: node.contentful_id,
  title: (node.title || "").trim(),
  category: (node.category || "").trim(),
  tags: (node.tags || []).filter(Boolean),
  shortDescription: textValue(node.shortDescription, "shortDescription"),
  description: textValue(node.description, "description"),
  testingTips: textValue(node.testingTips, "testingTips"),
  image: node.image?.file?.url
    ? {
        url: node.image.file.url.startsWith("//")
          ? `https:${node.image.file.url}`
          : node.image.file.url,
        alt: node.image.description || node.title || "",
      }
    : null,
  ingredients: (node.ingredients || [])
    .filter(
      ingredient => ingredient && (ingredient.name || ingredient.material)
    )
    .map(ingredient => {
      const materialTitle = (ingredient.material?.title || "").trim()
      const materialSlug = materialTitle ? slugify(materialTitle) : ""
      return {
        id: ingredient.contentful_id,
        name: (ingredient.name || materialTitle).trim(),
        inci: (ingredient.inci || ingredient.material?.inci || "").trim(),
        materialId: materialSlug ? ingredient.material.contentful_id : null,
        href: materialSlug ? `/materials/${materialSlug}/` : null,
        groups: materialSlug
          ? normalizeGroups(ingredient.material.rawMaterialGroups)
          : [],
        description: textValue(ingredient.description, "description"),
      }
    })
    .filter(
      (ingredient, index, list) =>
        ingredient.name &&
        list.findIndex(item => item.id === ingredient.id) === index
    ),
})

const loadFormulationNodes = async (graphql, reporter) => {
  if (process.env.FORMULATIONS_FIXTURE) {
    const fixturePath = path.resolve(process.env.FORMULATIONS_FIXTURE)
    reporter.warn(`[formulations] using fixture data from ${fixturePath}`)
    return JSON.parse(require("fs").readFileSync(fixturePath, "utf8"))
  }

  const types = await graphql(TYPES_QUERY)
  if (types.errors || !types.data?.formulation) {
    reporter.warn(
      `[formulations] content type "formulation" not found in Contentful - the page is built with an empty catalogue.`
    )
    return []
  }

  const result = await graphql(buildFormulationsQuery(types.data, reporter))
  if (result.errors) {
    reporter.warn(
      `[formulations] formulations query failed - empty catalogue. ${result.errors
        .map(error => error.message)
        .join("; ")}`
    )
    return []
  }
  return result.data?.allContentfulFormulation?.nodes || []
}

const createFormulationsPages = async ({ graphql, createPage, reporter }) => {
  const nodes = await loadFormulationNodes(graphql, reporter)
  const formulationsByLanguage = {}
  FORMULATION_LANGUAGES.forEach(({ language, locale }) => {
    formulationsByLanguage[language] = nodes
      .filter(
        node =>
          node.node_locale === locale &&
          (language === "pl" || node.showInEnglish === true)
      )
      .map(normalizeFormulation)
      .filter(formulation => formulation.title)
  })
  writeFormulationDetails(formulationsByLanguage)
  const hasEnglishVersion = formulationsByLanguage.en.length > 0

  FORMULATION_LANGUAGES.forEach(({ language, path: pagePath }) => {
    const formulations = formulationsByLanguage[language]
    if (language !== "pl" && !formulations.length) return

    const usedGroups = new Set(
      formulations.flatMap(formulation =>
        formulation.ingredients.flatMap(ingredient => ingredient.groups)
      )
    )

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/formulations/index.js`),
      context: {
        language,
        formulations: formulations.map(toCardData),
        initialDetails: formulations[0] ? toDetailsData(formulations[0]) : null,
        groups: RAW_MATERIAL_GROUPS.filter(group => usedGroups.has(group)),
        detailsUrl: `/${FORMULATIONS_DATA_DIR}/${language}/`,
        detailsVersion: String(Date.now()),
        hasEnglishVersion,
        i18n: {
          language,
          languages: ["pl", "en"],
          defaultLanguage: "pl",
          generateDefaultLanguagePage: false,
          routed: language !== "pl",
          originalPath: FORMULATIONS_ORIGINAL_PATH,
          path: pagePath,
        },
      },
    })
  })

  return formulationsByLanguage
}

const formulationsByMaterial = formulations => {
  const byMaterial = {}
  formulations.forEach(formulation => {
    formulation.ingredients.forEach(({ materialId }) => {
      if (!materialId) return
      const list = byMaterial[materialId] || (byMaterial[materialId] = [])
      if (!list.some(item => item.id === formulation.id)) {
        const { id, title, category, tags, shortDescription, image } =
          formulation
        list.push({ id, title, category, tags, shortDescription, image })
      }
    })
  })
  return byMaterial
}

const loadMaterialGroups = async (graphql, reporter) => {
  const types = await graphql(`
    query {
      material: __type(name: "${MATERIAL_TYPE}") { fields { name } }
    }
  `)
  const hasField = (types.data?.material?.fields || []).some(
    field => field.name === "rawMaterialGroups"
  )
  if (!hasField) {
    reporter.warn(
      `[materials] field "rawMaterialGroups" not found in Contentful - "Grupa surowców" is not shown on material pages.`
    )
    return {}
  }
  const result = await graphql(`
    query {
      allContentfulMaterials(filter: { node_locale: { eq: "pl-PL" } }) {
        nodes {
          contentful_id
          rawMaterialGroups
        }
      }
    }
  `)
  if (result.errors) {
    reporter.warn(
      `[materials] raw material groups query failed. ${result.errors
        .map(error => error.message)
        .join("; ")}`
    )
    return {}
  }
  const groupsById = {}
  ;(result.data?.allContentfulMaterials?.nodes || []).forEach(node => {
    groupsById[node.contentful_id] = normalizeGroups(node.rawMaterialGroups)
  })
  return groupsById
}

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

// comment blog
exports.createPages = async ({ graphql, actions, reporter }) => {
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

  const formulationsByLanguage = await createFormulationsPages({
    graphql,
    createPage,
    reporter,
  })
  const plFormulationsForMaterial = formulationsByMaterial(
    formulationsByLanguage.pl
  )
  const enFormulationsForMaterial = formulationsByMaterial(
    formulationsByLanguage.en
  )
  const groupsForMaterial = await loadMaterialGroups(graphql, reporter)
  const plMaterialContext = materialId => ({
    rawMaterialGroups: groupsForMaterial[materialId] || [],
    formulations: plFormulationsForMaterial[materialId] || [],
  })
  const enMaterialContext = materialId => ({
    // Groups exist only in pl-PL; the template translates them via formulations.group.*
    rawMaterialGroups: groupsForMaterial[materialId] || [],
    formulations: enFormulationsForMaterial[materialId] || [],
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
          ...plMaterialContext(plNode.contentful_id),
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
          ...enMaterialContext(enNode.contentful_id),
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
          ...(soloNode === plNode
            ? plMaterialContext(soloNode.contentful_id)
            : {}),
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
