import React, { useState, useEffect } from "react"
import { useTranslation, Link, useI18next } from "gatsby-plugin-react-i18next"
import "../styles/newsContent.css"
import CustomPagination from "../../../components/pagination/pagination"
import ArticleTile from "../../../components/articleTile/articleTile"

const NewsContent = ({ newsContent }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  if (!newsContent || newsContent.length === 0) {
    return (
      <div className="news-c-container">
        <div className="container">
          <div className="empty-content-con">
            {language === "en" && (
              <Link className="empty-news-button" to="/news" language="pl">
                {t`news.empty.button`}
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  const paginatedData = newsContent.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderArticles = value => {
    return value.map((val, index) => (
      <ArticleTile key={index} article={val} t={t} />
    ))
  }

  return (
    <>
      <div className="news-c-container">
        <div className="container">
          <>
            <div className="content-con">
              <div className="results-con">{renderArticles(paginatedData)}</div>
            </div>
            <CustomPagination
              itemsCount={newsContent.length}
              itemsPerPage={pageSize}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              alwaysShown={true}
            />
          </>
        </div>
      </div>
    </>
  )
}

export default NewsContent
