// comment blog
import React, { useEffect, useState, useContext } from "react"
import {
  useTranslation,
  I18nextContext,
  Link,
} from "gatsby-plugin-react-i18next"
import "../styles/homeBlog.css"
import { graphql, useStaticQuery } from "gatsby"
import getCurrentTranslations from "../../../components/contentful-translator"
import ArticleTile from "../../../components/articleTile/articleTile"

const HomeBlog = () => {
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
                id
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
        .slice(0, 3)

      setArticles(filteredArticles)
    }
    getData()
  }, [data.allContentfulArticle, language])

  const renderArticles = value => {
    return value.map((val, index) => (
      <ArticleTile key={index} article={val} t={t} />
    ))
  }

  return (
    <>
      <div className="home-b-container">
        <div className="container">
          <h2 className="h2-style">{t`home-blog.title`}</h2>
          {articles && articles.length > 0 ? (
            <>
              <div className="articles">{renderArticles(articles)}</div>
              <Link
                to="/news"
                className="register-btn blog-button"
              >{t`home-blog.news`}</Link>
            </>
          ) : (
            <div className="empty-content-con">
              {language === "en" && (
                <Link className="empty-news-button" to="/news" language="pl">
                  {t`news.empty.button`}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HomeBlog
