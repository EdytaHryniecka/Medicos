import React, { useMemo, useRef } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/newsContent.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"
import Toc from "../../../components/toc/toc"
import moment from "moment"

const NewsContent = ({ article }) => {
  const { t } = useTranslation()

  // ⬇️ ref zamiast state
  const tocRef = useRef([])

  // reset przy każdej zmianie artykułu
  tocRef.current = []

  const renderOptions = useMemo(() => articleTextRenderOptions(tocRef), [])

  return (
    <div className="article">
      <div className="container">
        <div className="article-header">
          <div className="left-text">
            <Link to="/news" className="bright-button">
              {t`news.article.return`}
            </Link>

            <div className="down-left-text">
              <div className="date-and-name">
                <p className="p-style">
                  {moment(article.node.createdAt).format("DD/MM/YYYY HH:mm")}
                </p>
                <p className="p-style">{article.node.author}</p>
              </div>

              <h2 className="h2-style">{article.node.title}</h2>
            </div>
          </div>

          <GatsbyImage
            alt={article.title}
            className="article-image"
            image={getImage(article.node.image.gatsbyImageData)}
          />
        </div>

        <div className="article-wrap">
          <div className="article-content">
            {renderRichText(article.node.description, renderOptions)}
          </div>

          <div className="article-toc">
            <Toc items={tocRef.current} />
          </div>
        </div>
      </div>
      <div className="article-author-box">
        <div className="container">
          <div className="article-author-container">
            <p className="article-author-box-title">{t`news.article.about`}</p>
            <GatsbyImage
              alt={article.title}
              className="article-author-image"
              image={getImage(article.node.authorImg.gatsbyImageData)}
            />
            <div className="article-author-text">
              <p className="article-author-name">{article.node.author}</p>
              <p className="article-author-position">
                {article.node.authorPosition}
              </p>
              <p className="article-author-description">
                {article.node.authorDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsContent
