import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/newsReadMore.css"
import ArticleTile from "../../../components/articleTile/articleTile"

const NewsReadMore = ({ articles }) => {
  const { t } = useTranslation()

  const renderArticles = value => {
    return value.map((val, index) => (
      <ArticleTile key={index} article={val} t={t} />
    ))
  }

  return (
    <>
      <div className="news-rm-container">
        <div className="container">
          <h2 className="h2-style">{t`news-read-more.title`}</h2>
          <div className="articles">{articles && renderArticles(articles)}</div>
          <Link to="/news" className="bright-button">
            {t`news-read-more.news`}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <g clipPath="url(#clip0_868_5377)">
                <path
                  d="M12.666 8.5L3.33268 8.5"
                  stroke="#4D8CE5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.666 8.5L8.66602 4.5"
                  stroke="#4D8CE5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.666 8.5L8.66602 12.5"
                  stroke="#4D8CE5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_868_5377">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NewsReadMore
