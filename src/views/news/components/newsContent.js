import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { useTranslation, Link, useI18next } from "gatsby-plugin-react-i18next"
import "../styles/newsContent.css"
import CustomPagination from "../../../components/pagination/pagination"
import ArticleTile from "../../../components/articleTile/articleTile"

const normalizePage = page => {
  const parsed = Number.parseInt(page, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

const getPageFromSearch = search => {
  const params = new URLSearchParams(search || "")
  return normalizePage(params.get("page"))
}

const buildSearchWithPage = (search, page) => {
  const params = new URLSearchParams(search || "")
  if (page <= 1) {
    params.delete("page")
  } else {
    params.set("page", String(page))
  }
  const query = params.toString()
  return query ? `?${query}` : ""
}

const NewsContent = ({ newsContent }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const location = useLocation()
  const getSearch = () =>
    typeof window !== "undefined"
      ? window.location.search || ""
      : location?.search || ""
  const getPathname = () =>
    typeof window !== "undefined"
      ? window.location.pathname || ""
      : location?.pathname || ""
  const [currentPage, setCurrentPage] = useState(() =>
    getPageFromSearch(getSearch())
  )
  const hasMountedRef = useRef(false)
  const pageSize = 9

  useEffect(() => {
    const pageFromUrl = getPageFromSearch(getSearch())
    setCurrentPage(prev => (prev === pageFromUrl ? prev : pageFromUrl))
  }, [location?.search])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const handlePopState = () => {
      const pageFromUrl = getPageFromSearch(getSearch())
      setCurrentPage(prev => (prev === pageFromUrl ? prev : pageFromUrl))
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    const pageFromUrl = getPageFromSearch(getSearch())
    if (pageFromUrl > 1) {
      setCurrentPage(pageFromUrl)
      return
    }
    setPageAndSync(1)
  }, [newsContent])

  const setPageAndSync = value => {
    setCurrentPage(prev => {
      const nextPage =
        typeof value === "function" ? value(prev) : normalizePage(value)
      const normalizedNext = normalizePage(nextPage)
      const currentSearch = getSearch()
      const nextSearch = buildSearchWithPage(currentSearch, normalizedNext)
      const pathname = getPathname()
      const nextPath = `${pathname}${nextSearch}`
      const currentPath = `${pathname}${currentSearch || ""}`
      if (nextPath !== currentPath) {
        navigate(nextPath)
      }
      return normalizedNext
    })
  }

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
              setCurrentPage={setPageAndSync}
              alwaysShown={true}
            />
          </>
        </div>
      </div>
    </>
  )
}

export default NewsContent
