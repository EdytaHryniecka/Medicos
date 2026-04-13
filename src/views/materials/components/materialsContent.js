import React, { useContext, useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { useLocation } from "@reach/router"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/materialsContent.css"
import CustomPagination from "../../../components/pagination/pagination"
import MaterialTile from "../../../components/materialTile/materialTile"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import Navigate from "../../../hooks/navigate"
import { slugify } from "../../../utils/slugify"

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

const MaterialsContent = ({ materialsContent, resetFilters }) => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
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

  const goToDetails = material => {
    Navigate(`materials/${slugify(material.node.title)}`, language)
  }

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
  }, [materialsContent])

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

  const paginatedData = materialsContent.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderMaterials = value => {
    return value.map((val, index) => (
      <MaterialTile
        goToDetails={() => goToDetails(val)}
        key={index}
        material={val}
        t={t}
      />
    ))
  }

  return (
    <>
      <div className="materials-c-container">
        <div className="container">
          {materialsContent && materialsContent.length > 0 ? (
            <>
              <div className="content-con">
                <div className="results-con">
                  {renderMaterials(paginatedData)}
                </div>
              </div>
              <CustomPagination
                itemsCount={materialsContent.length}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                setCurrentPage={setPageAndSync}
                alwaysShown={true}
              />
            </>
          ) : (
            <div className="empty-content-con">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M35 35L26.3333 26.3333M29.2222 19.1111C29.2222 20.4389 28.9607 21.7537 28.4526 22.9805C27.9444 24.2072 27.1996 25.3218 26.2607 26.2607C25.3218 27.1996 24.2072 27.9444 22.9805 28.4526C21.7537 28.9607 20.4389 29.2222 19.1111 29.2222C17.7833 29.2222 16.4685 28.9607 15.2418 28.4526C14.015 27.9444 12.9004 27.1996 11.9615 26.2607C11.0226 25.3218 10.2778 24.2072 9.76966 22.9805C9.26153 21.7537 9 20.4389 9 19.1111C9 16.4295 10.0653 13.8577 11.9615 11.9615C13.8577 10.0653 16.4295 9 19.1111 9C21.7927 9 24.3645 10.0653 26.2607 11.9615C28.1569 13.8577 29.2222 16.4295 29.2222 19.1111Z"
                  stroke="#4D8CE5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h3 className="h3-style">{t`materials-content.title`}</h3>
              <p className="p-style">{t`materials-content.description`}</p>
              <p
                onClick={resetFilters}
                className="p-style clear-filter-p"
              >{t`materials-filter.clean-filters`}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MaterialsContent
