// comment blog
import React, { useEffect, useState, useContext, useMemo } from "react"
import Seo from "../../components/seo"
import {
  useTranslation,
  I18nextContext,
  useI18next,
} from "gatsby-plugin-react-i18next"
import { graphql, navigate } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import Layout from "../../components/layout"
import NewsContent from "./components/newsContent"
import NewsReadMore from "./components/newsReadMore"

const NewsPage = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const { languages, defaultLanguage } = useI18next()

  const [article, setArticle] = useState({ node: pageContext.article })
  const [readMoreArticles, setReadMoreArticles] = useState()
  const plSlugById = useMemo(() => {
    const edges = data?.allContentfulArticle?.edges || []
    return edges.reduce((acc, edge) => {
      const node = edge?.node
      if (node?.node_locale === "pl-PL" && node?.contentful_id) {
        acc[node.contentful_id] = node.slug
      }
      return acc
    }, {})
  }, [data?.allContentfulArticle?.edges])
  const getLocalizedSlug = (node, lang, plSlugMap) => {
    if (!node) {
      return ""
    }

    const slug = node.slug
    if (!slug || !slug.trim()) {
      return ""
    }

    if (lang === "en") {
      const plSlug = plSlugMap?.[node.contentful_id]
      if (plSlug && slug === plSlug) {
        return ""
      }
    }

    return slug
  }

  useEffect(() => {
    const getData = () => {
      const getArticles = getCurrentTranslations(
        data.allContentfulArticle.edges,
        language
      )

      const filteredArticles = getArticles.filter(article => {
        const slug = getLocalizedSlug(article?.node, language, plSlugById)
        return typeof slug === "string" && slug.trim().length > 0
      })

      const articleId = pageContext.article?.contentful_id
      const desiredSlug = pageContext.article?.slug

      const singleArticle =
        (articleId
          ? filteredArticles.find(
              entry => entry.node.contentful_id === articleId
            )
          : null) ||
        (desiredSlug
          ? filteredArticles.find(entry => {
              const entrySlug = getLocalizedSlug(
                entry?.node,
                language,
                plSlugById
              )
              return entrySlug === desiredSlug
            })
          : null) ||
        null

      setArticle(singleArticle)

      const lastThreeArticles = filteredArticles
        .filter(entry => {
          if (articleId) {
            return entry.node.contentful_id !== articleId
          }
          if (desiredSlug) {
            const entrySlug = getLocalizedSlug(
              entry?.node,
              language,
              plSlugById
            )
            return entrySlug !== desiredSlug
          }
          return true
        })
        .slice(0, 3)

      setReadMoreArticles(lastThreeArticles)
    }
    getData()
  }, [data.allContentfulArticle, pageContext, language])

  useEffect(() => {
    if (language !== "en") {
      return
    }

    const articleId = pageContext.article?.contentful_id
    const plSlug = articleId ? plSlugById[articleId] : ""
    const currentSlug = pageContext.article?.slug

    if (plSlug && currentSlug && plSlug === currentSlug) {
      navigate(`/news/${plSlug}`, { replace: true })
      return
    }

    if (!article && plSlug) {
      navigate(`/news/${plSlug}`, { replace: true })
    }
  }, [article, language, pageContext, plSlugById])

  const articlePathsByLanguage = useMemo(() => {
    const articleId = article?.node?.contentful_id || pageContext.article?.contentful_id
    if (!articleId) {
      return null
    }

    const edges = data?.allContentfulArticle?.edges || []
    if (!edges.length) {
      return null
    }

    const paths = {}
    languages.forEach(lang => {
      const targetLocale = lang === "pl" ? "pl-PL" : "en"
      const targetEntry = edges.find(
        edge =>
          edge.node.contentful_id === articleId &&
          edge.node.node_locale === targetLocale
      )

      if (!targetEntry) {
        return
      }

      const slug = getLocalizedSlug(targetEntry?.node, lang, plSlugById)
      if (typeof slug !== "string" || !slug.trim()) {
        return
      }

      paths[lang] = `/news/${slug.trim()}`
    })

    return Object.keys(paths).length ? paths : null
  }, [article, data?.allContentfulArticle?.edges, languages, pageContext])

  const hreflangOverrides = useMemo(() => {
    if (!articlePathsByLanguage) {
      return null
    }

    const overrides = {}
    languages.forEach(lang => {
      const path = articlePathsByLanguage[lang]
      if (!path) {
        return
      }

      const prefix =
        defaultLanguage && lang === defaultLanguage ? "" : `/${lang}`
      overrides[lang] = `${prefix}${path}`
    })

    if (defaultLanguage && overrides[defaultLanguage]) {
      overrides["x-default"] = overrides[defaultLanguage]
    }

    return overrides
  }, [articlePathsByLanguage, defaultLanguage, languages])

  return (
    <Layout>
      <Seo
        title={article?.node?.metaTitle || t`seo.news-page.title`}
        description={
          article?.node?.metaDescription || t`seo.news-page.description`
        }
        canonical={article?.node?.canonical}
        hreflangOverrides={hreflangOverrides}
      />
      {article && <NewsContent article={article} />}
      {readMoreArticles && <NewsReadMore articles={readMoreArticles} />}
    </Layout>
  )
}
export default NewsPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allContentfulArticle(sort: { createdAt: DESC }) {
      edges {
        node {
          node_locale
          contentful_id
          authorRep {
            authorName
            authorPosition
            authorDescription
            authorImg {
              gatsbyImageData(quality: 100)
            }
          }
          createdAt
          description {
            raw
            references {
              ... on ContentfulAsset {
                __typename
                contentful_id
                title
                description
                file {
                  url
                }
              }
            }
          }
          bibliography {
            raw
          }
          image {
            gatsbyImageData(quality: 100)
          }
          metaTitle
          metaDescription
          slug
          title
          canonical
        }
      }
    }
  }
`
