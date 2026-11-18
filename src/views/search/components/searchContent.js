import React, { useState, useEffect } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/searchContent.css"
import CustomPagination from "../../../components/pagination/pagination"

const SearchContent = ({ searchContent, searchData }) => {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const paginatedData = searchContent.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderContent = content => {
    const highlightText = (text, query) => {
      if (!query.trim()) return text

      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

      const regex = new RegExp(`(${escapedQuery})`, "gi")
      return text.replace(regex, '<span class="highlighted">$1</span>')
    }

    const highlightDesc = (text, query) => {
      if (!query.trim()) return text

      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

      const regex = new RegExp(`(${escapedQuery})`, "gi")
      return text.replace(regex, '<span class="highlightedDesc">$1</span>')
    }

    return content.map((con, index) => (
      <Link to={`${con.slug}`} className="result" key={index}>
        <h4
          className="h4-style"
          dangerouslySetInnerHTML={{
            __html: highlightText(con.title, searchData),
          }}
        />
        <p
          className="p-style top-p"
          dangerouslySetInnerHTML={{
            __html: highlightDesc(con.description, searchData),
          }}
        />
        <div className="bottom-result">
          <div className="category">
            <p className="p-style">{con.category}</p>
          </div>
          <Link to={`${con.slug}`}>
            {t`search-content.go-to-page`}{" "}
            <svg
              className="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clipPath="url(#clip0_889_994)">
                <path
                  d="M12.666 8L3.33268 8"
                  stroke="#144487"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.666 8L8.66602 4"
                  stroke="#144487"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.666 8L8.66602 12"
                  stroke="#144487"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_889_994">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </Link>
    ))
  }

  return (
    <>
      <div className="search-c-container">
        <div className="container">
          {searchContent && searchContent.length > 0 ? (
            <>
              <div className="content-con">
                {searchContent.length === 1 && (
                  <p className="p-style">
                    {searchContent.length} {t`search-content.result`}
                  </p>
                )}
                {searchContent.length > 1 && searchContent.length <= 4 && (
                  <p className="p-style">
                    {searchContent.length} {t`search-content.result-2-4`}
                  </p>
                )}
                {searchContent.length > 5 && (
                  <p className="p-style">
                    {searchContent.length} {t`search-content.results`}
                  </p>
                )}
                <div className="results-con">
                  {renderContent(paginatedData)}
                </div>
              </div>
              <CustomPagination
                itemsCount={searchContent.length}
                itemsPerPage={pageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                alwaysShown={true}
              />
            </>
          ) : (
            <div className="empty-content-con">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_165_11791)">
                  <path
                    d="M5 16.6667C5 18.1988 5.30177 19.7158 5.88807 21.1313C6.47438 22.5468 7.33374 23.8329 8.41709 24.9162C9.50044 25.9996 10.7866 26.859 12.202 27.4453C13.6175 28.0316 15.1346 28.3333 16.6667 28.3333C18.1988 28.3333 19.7158 28.0316 21.1313 27.4453C22.5468 26.859 23.8329 25.9996 24.9162 24.9162C25.9996 23.8329 26.859 22.5468 27.4453 21.1313C28.0316 19.7158 28.3333 18.1988 28.3333 16.6667C28.3333 15.1346 28.0316 13.6175 27.4453 12.202C26.859 10.7866 25.9996 9.50044 24.9162 8.41709C23.8329 7.33374 22.5468 6.47438 21.1313 5.88807C19.7158 5.30177 18.1988 5 16.6667 5C15.1346 5 13.6175 5.30177 12.202 5.88807C10.7866 6.47438 9.50044 7.33374 8.41709 8.41709C7.33374 9.50044 6.47438 10.7866 5.88807 12.202C5.30177 13.6175 5 15.1346 5 16.6667Z"
                    stroke="#4D8CE5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35 35L25 25"
                    stroke="#4D8CE5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_165_11791">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h3 className="h3-style">{t`search-content.title`}</h3>
              <p className="p-style">{t`search-content.description`}</p>
              <Link
                className="register-btn search-content-button"
                to="/"
              >{t`search-content.home`}</Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchContent
