import React, { useState, useEffect } from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/searchContent.css"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { richTextRenderOptions } from "../../../utils/templateRenderOption"
import CustomPagination from "../../../components/pagination/pagination"

const SearchContent = ({ searchContent, searchData }) => {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const paginatedData = searchContent.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const renderContent = content => {
    const highlightText = (text, query) => {
      const regex = new RegExp(`(${query})`, "gi")
      return text.replace(regex, '<span class="highlighted">$1</span>')
    }

    return content.map((con, index) => (
      <div className="result" key={index}>
        <h4
          className="h4-style"
          dangerouslySetInnerHTML={{
            __html: highlightText(con.title, searchData),
          }}
        />
        <p
          className="p-style"
          dangerouslySetInnerHTML={{
            __html: highlightText(con.description, searchData),
          }}
        />
        <div className="category">
          <p className="p-style">{con.category}</p>
        </div>
        {(con.category === "Artykuł" || con.category === "Article") && (
          <Link to={`/news/${con.slug}`}>{t`search-content.go-to-page`}</Link>
        )}
      </div>
    ))
  }

  return (
    <>
      <div className="search-c-container">
        <div className="container">
          {searchContent && searchContent.length > 0 ? (
            <>
              <div className="content-con">
                {searchContent.length > 1 ? (
                  <p className="p-style">
                    {searchContent.length} {t`search-content.results`}
                  </p>
                ) : (
                  <p className="p-style">
                    {searchContent.length} {t`search-content.result`}
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
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M35 35L26.3333 26.3333M29.2222 19.1111C29.2222 20.4389 28.9607 21.7537 28.4526 22.9805C27.9444 24.2072 27.1996 25.3218 26.2607 26.2607C25.3218 27.1996 24.2072 27.9444 22.9805 28.4526C21.7537 28.9607 20.4389 29.2222 19.1111 29.2222C17.7833 29.2222 16.4685 28.9607 15.2418 28.4526C14.015 27.9444 12.9004 27.1996 11.9615 26.2607C11.0226 25.3218 10.2778 24.2072 9.76966 22.9805C9.26153 21.7537 9 20.4389 9 19.1111C9 16.4295 10.0653 13.8577 11.9615 11.9615C13.8577 10.0653 16.4295 9 19.1111 9C21.7927 9 24.3645 10.0653 26.2607 11.9615C28.1569 13.8577 29.2222 16.4295 29.2222 19.1111Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
