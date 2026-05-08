import React, { useMemo, useRef, useEffect } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/newsContent.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { articleTextRenderOptions } from "../../../utils/articleRenderOption"
import Toc from "../../../components/toc/toc"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
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

  useEffect(() => {
    const handleScroll = e => {
      const link = e.target.closest('.article-content a[href^="#"]')
      if (!link) return

      const targetId = link.getAttribute("href")
      if (targetId === "#" || targetId === "") return

      const targetEl = document.querySelector(targetId)
      if (!targetEl) return

      e.preventDefault()
      e.stopImmediatePropagation()

      const elementTop = targetEl.getBoundingClientRect().top + window.scrollY
      const offset =
        window.innerWidth < 1024 ? (window.innerWidth < 768 ? 80 : 70) : 120

      window.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      })
    }

    document.addEventListener("click", handleScroll)

    return () => {
      document.removeEventListener("click", handleScroll)
    }
  }, [])

  return (
    <div className="article">
      <div className="container">
        <div className="article-header">
          <div className="left-text">
            <Breadcrumbs
              items={[
                { label: t`search-content.home`, to: "/" },
                { label: t`menu.blog`, to: "/news" },
                { label: article.node.title },
              ]}
            />

            <div className="down-left-text">
              <div className="date-and-name">
                <p className="p-style">
                  {moment(article.node.createdAt).format("DD/MM/YYYY HH:mm")}
                </p>
                {author?.authorName && (
                  <p className="p-style">{author.authorName}</p>
                )}
              </div>

              <h1 className="h2-style">{article.node.title}</h1>
            </div>
          </div>

          {heroImage && (
            <GatsbyImage
              alt={article?.node?.image?.description || article?.node?.title}
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

            {article?.node?.brief?.raw && (
              <div
                className="article-content article-content--brief"
                id="brief"
              >
                <img
                  src={article?.node?.brief?.references[0]?.file?.url}
                  alt="Icon brief download"
                />
                {renderRichText(article.node.brief, renderOptions)}
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
