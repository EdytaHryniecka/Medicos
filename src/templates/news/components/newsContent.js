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
  const author = article?.node?.authorRep
  const heroImage = article?.node?.image?.gatsbyImageData
  const authorImage = author?.authorImg?.gatsbyImageData

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
                {author?.authorName && (
                  <p className="p-style">{author.authorName}</p>
                )}
              </div>

              <h2 className="h2-style">{article.node.title}</h2>
            </div>
          </div>

          {heroImage && (
            <GatsbyImage
              alt={article.title}
              className="article-image"
              image={getImage(heroImage)}
            />
          )}
        </div>

        <div className="article-wrap">
          <div className="article-content">
            {article?.node?.description?.raw &&
              renderRichText(article.node.description, renderOptions)}
            {article?.node?.bibliography?.raw && (
              <div className="article-content article-content--bibliography">
                <h2 className="h2-style title">{t`news.article.bibliography`}</h2>
                {renderRichText(article.node.bibliography, renderOptions)}
              </div>
            )}
          </div>

          <div className="article-toc">
            <Toc items={tocRef.current} />
          </div>
        </div>
      </div>
      {author && (
        <div className="article-author-box">
          <div className="container">
            <div className="article-author-container">
              <p className="article-author-box-title">{t`news.article.about`}</p>
              {authorImage && (
                <GatsbyImage
                  alt={article.title}
                  className="article-author-image"
                  image={getImage(authorImage)}
                />
              )}
              <div className="article-author-text">
                {author.authorName && (
                  <p className="article-author-name">{author.authorName}</p>
                )}
                {author.authorPosition && (
                  <p className="article-author-position">
                    {author.authorPosition}
                  </p>
                )}
                {author.authorDescription && (
                  <p className="article-author-description">
                    {author.authorDescription}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsContent
