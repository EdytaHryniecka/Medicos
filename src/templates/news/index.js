// comment blog
import React, { useEffect, useState, useContext } from "react"
import Seo from "../../components/seo"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import getCurrentTranslations from "../../components/contentful-translator"
import Layout from "../../components/layout"
import NewsContent from "./components/newsContent"
import NewsReadMore from "./components/newsReadMore"

const NewsPage = ({ data, pageContext }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const [article, setArticle] = useState()
  const [readMoreArticles, setReadMoreArticles] = useState()

  useEffect(() => {
    const getData = () => {
      const getArticles = getCurrentTranslations(
        data.allContentfulArticle.edges,
        language
      )

      const singleArticle = getArticles.find(article => {
        return article.node.title === pageContext.article.title
      })
      setArticle(singleArticle)

      const lastThreeArticles = getArticles
        .filter(article => {
          return article.node.title !== pageContext.article.title
        })
        .slice(0, 3)

      setReadMoreArticles(lastThreeArticles)
    }
    getData()
  }, [data.allContentfulArticle, pageContext, language])

  return (
    <Layout>
      <Seo
        title={article?.node?.metaTitle || t`seo.news-page.title`}
        description={
          article?.node?.metaDescription || t`seo.news-page.description`
        }
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
          author
          authorPosition
          authorDescription
          authorImg {
            gatsbyImageData(quality: 100)
          }
          createdAt
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
        }
      }
    }
  }
`
