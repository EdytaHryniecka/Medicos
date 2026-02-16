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
      allContentfulArticle(sort: { createdAt: DESC }, limit: 3) {
        edges {
          node {
            node_locale
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

      setArticles(getArticles)
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
          <div className="articles">{articles && renderArticles(articles)}</div>
          <Link
            to="/news"
            className="register-btn blog-button"
          >{t`home-blog.news`}</Link>
        </div>
      </div>
    </>
  )
}

export default HomeBlog
