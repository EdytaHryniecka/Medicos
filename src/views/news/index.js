// comment blog
import React, { useEffect, useState, useContext } from "react"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import Seo from "../../components/seo"
import Layout from "../../components/layout"
import NewsHeader from "./components/newsHeader"
import NewsContent from "./components/newsContent"

const News = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  const data = useStaticQuery(graphql`
    query {
      allContentfulArticle(sort: { createdAt: DESC }) {
        edges {
          node {
            node_locale
            contentful_id
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

  const [articles, setArticles] = useState()

  useEffect(() => {
    const getData = () => {
      const getArticles = getCurrentTranslations(
        data.allContentfulArticle.edges,
        language
      )

      const allEdges = data?.allContentfulArticle?.edges || []
      const plSlugById = allEdges.reduce((acc, edge) => {
        const node = edge?.node
        if (node?.node_locale === "pl-PL" && node?.contentful_id) {
          acc[node.contentful_id] = node.slug
        }
        return acc
      }, {})

      const filteredArticles = getArticles
        .map(article => {
          const node = article?.node || {}
          const localizedSlug = node.slug
          const plSlug = plSlugById[node.contentful_id]

          if (
            typeof localizedSlug === "string" &&
            localizedSlug.trim() &&
            !(language === "en" && plSlug && localizedSlug === plSlug)
          ) {
            return {
              ...article,
              node: {
                ...node,
                localizedSlug: localizedSlug.trim(),
              },
            }
          }

          return null
        })
        .filter(Boolean)

      setArticles(filteredArticles)
    }
    getData()
  }, [data.allContentfulArticle, language])

  return (
    <Layout>
      <Seo title={t`seo.news.title`} description={t`seo.news.description`} />
      <NewsHeader />
      {articles && <NewsContent newsContent={articles} />}
    </Layout>
  )
}
export default News
