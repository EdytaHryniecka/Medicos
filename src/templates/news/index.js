// comment blog
import React, { useEffect, useContext, useMemo } from "react"
import Seo from "../../components/seo"
import {
  useTranslation,
  I18nextContext,
  useI18next,
} from "gatsby-plugin-react-i18next"
import { graphql, navigate } from "gatsby"
import { Helmet } from "react-helmet"
import getCurrentTranslations from "../../components/contentful-translator"
import Layout from "../../components/layout"
import NewsContent from "./components/newsContent"
import NewsReadMore from "./components/newsReadMore"

const NewsPage = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const { languages, defaultLanguage } = useI18next()
  const site = data?.site
  const baseUrl =
    site?.siteMetadata?.siteUrl?.replace(/\/+$/, "") || "https://medicos.com.pl"

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

  const filteredArticles = useMemo(() => {
    const translatedArticles = getCurrentTranslations(
      data?.allContentfulArticle?.edges || [],
      language
    )

    return translatedArticles.filter(entry => {
      const slug = getLocalizedSlug(entry?.node, language, plSlugById)
      return typeof slug === "string" && slug.trim().length > 0
    })
  }, [data?.allContentfulArticle?.edges, language, plSlugById])

  const article = useMemo(() => {
    const articleId = pageContext.article?.contentful_id
    const desiredSlug = pageContext.article?.slug

    return (
      (articleId
        ? filteredArticles.find(entry => entry.node.contentful_id === articleId)
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
    )
  }, [filteredArticles, language, pageContext, plSlugById])

  const readMoreArticles = useMemo(() => {
    const articleId = pageContext.article?.contentful_id
    const desiredSlug = pageContext.article?.slug

    return filteredArticles
      .filter(entry => {
        if (articleId) {
          return entry.node.contentful_id !== articleId
        }
        if (desiredSlug) {
          const entrySlug = getLocalizedSlug(entry?.node, language, plSlugById)
          return entrySlug !== desiredSlug
        }
        return true
      })
      .slice(0, 3)
  }, [filteredArticles, language, pageContext, plSlugById])

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
    const articleId =
      article?.node?.contentful_id || pageContext.article?.contentful_id
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
  }, [
    article,
    data?.allContentfulArticle?.edges,
    languages,
    pageContext,
    plSlugById,
  ])

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

  const blogPostingSchema = useMemo(() => {
    if (!article?.node) {
      return null
    }

    const path =
      (articlePathsByLanguage && articlePathsByLanguage[language]) ||
      (article.node.slug ? `/news/${article.node.slug}` : "")
    const articleUrl = (() => {
      const canonicalUrl = article.node.canonical
      if (typeof canonicalUrl === "string" && canonicalUrl.trim()) {
        return canonicalUrl.trim()
      }
      if (!path) {
        return ""
      }
      if (/^https?:\/\//i.test(path)) {
        return path
      }
      const normalizedPath = path.startsWith("/") ? path : `/${path}`
      return `${baseUrl}${normalizedPath}`
    })()

    const imageFileUrl =
      typeof article.node.image?.file?.url === "string"
        ? article.node.image.file.url.trim()
        : ""
    const imageUrl = imageFileUrl
      ? imageFileUrl.startsWith("//")
        ? `https:${imageFileUrl}`
        : imageFileUrl
      : ""

    const author = article.node.authorRep

    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": articleUrl ? `${articleUrl}#article` : undefined,
      url: articleUrl || undefined,
      mainEntityOfPage: articleUrl
        ? {
            "@type": "WebPage",
            "@id": articleUrl,
          }
        : undefined,
      headline: article.node.title || undefined,
      description: article.node.metaDescription || undefined,
      image: imageUrl ? [imageUrl] : undefined,
      datePublished: article.node.createdAt || undefined,
      dateModified: article.node.createdAt || undefined,
      author: author?.authorName
        ? {
            "@type": "Person",
            name: author.authorName,
            jobTitle: author.authorPosition || undefined,
          }
        : undefined,
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      inLanguage: language,
    }
  }, [article, articlePathsByLanguage, baseUrl, language])

  const breadcrumbSchema = useMemo(() => {
    if (!article?.node) {
      return null
    }

    const langPrefix =
      defaultLanguage && language === defaultLanguage ? "" : `/${language}`
    const homeUrl = `${baseUrl}${langPrefix}/`
    const newsIndexUrl = `${baseUrl}${langPrefix}/news/`
    const articlePath =
      (articlePathsByLanguage && articlePathsByLanguage[language]) ||
      (article.node.slug ? `/news/${article.node.slug}` : "")
    const articleUrl = articlePath
      ? /^https?:\/\//i.test(articlePath)
        ? articlePath
        : `${baseUrl}${
            articlePath.startsWith("/") ? articlePath : `/${articlePath}`
          }`
      : ""

    const homeName = language === "pl" ? "Strona g\u0142\u00f3wna" : "Home"
    const newsName = language === "pl" ? "Aktualno\u015bci" : "News"

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeName,
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: newsName,
          item: newsIndexUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.node.title,
          item: articleUrl || undefined,
        },
      ],
    }
  }, [article, articlePathsByLanguage, baseUrl, defaultLanguage, language])

  return (
    <Layout>
      <Seo
        title={
          article?.node?.metaTitle ||
          article?.node?.title ||
          t`seo.news-page.title`
        }
        description={
          article?.node?.metaDescription ||
          article?.node?.title ||
          t`seo.news-page.description`
        }
        canonical={article?.node?.canonical}
        hreflangOverrides={hreflangOverrides}
      />
      {blogPostingSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(blogPostingSchema)}
          </script>
        </Helmet>
      )}
      {breadcrumbSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>
      )}
      {article && <NewsContent article={article} />}
      {readMoreArticles?.length > 0 && (
        <NewsReadMore articles={readMoreArticles} />
      )}
    </Layout>
  )
}
export default NewsPage

export const query = graphql`
  query ($language: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
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
          brief {
            raw
            references {
              file {
                url
                fileName
              }
            }
          }
          image {
            gatsbyImageData(quality: 100)
            file {
              url
            }
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
