import React, { useEffect } from "react"
import Pagination from "react-bootstrap/Pagination"
import PropTypes from "prop-types"
import "./styles/pagination.css"

const CustomPagination = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  alwaysShown = true,
}) => {
  const pagesCount = Math.ceil(itemsCount / itemsPerPage)
  const isPaginationShown = alwaysShown ? true : pagesCount > 1
  const isCurrentPageFirst = currentPage === 1
  const isCurrentPageLast = currentPage === pagesCount
  const changePage = number => {
    if (currentPage === number) return
    setCurrentPage(number)
  }
  const onPageNumberClick = pageNumber => {
    changePage(pageNumber)
  }

  const onPreviousPageClick = () => {
    if (currentPage <= 1) {
      return changePage(currentPage => (currentPage = 1))
    } else {
      changePage(currentPage => currentPage - 1)
    }
  }

  const onNextPageClick = () => {
    changePage(currentPage => currentPage + 1)
  }

  const setLastPageAsCurrent = () => {
    if (currentPage > pagesCount) {
      pagesCount && setCurrentPage(pagesCount)
    }
  }

  let isPageNumberOutOfRange

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1
    const isPageNumberFirst = pageNumber === 1
    const isPageNumberLast = pageNumber === pagesCount
    const isCurrentPageWithinTwoPageNumbers =
      Math.abs(pageNumber - currentPage) <= 2

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false
      return (
        <Pagination.Item
          activeLabel=""
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          active={pageNumber === currentPage}
        >
          {pageNumber}
        </Pagination.Item>
      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return <Pagination.Ellipsis key={pageNumber} className="muted" />
    }

    return null
  })

  useEffect(setLastPageAsCurrent, [pagesCount])

  return (
    <>
      {isPaginationShown && (
        <Pagination>
          <Pagination.Prev
            className={isCurrentPageFirst ? "disable" : ""}
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clipPath="url(#clip0_579_1225)">
                <path
                  d="M5.5 12.5H19.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 12.5L11.5 18.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 12.5L11.5 6.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_579_1225">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Pagination.Prev>
          {pageNumbers}
          <Pagination.Next
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
            className={isCurrentPageLast ? "disable" : ""}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clipPath="url(#clip0_579_4084)">
                <path
                  d="M19.5 12.5L5.5 12.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 12.5L13.5 6.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 12.5L13.5 18.5"
                  stroke="#144487"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_579_4084">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>{" "}
          </Pagination.Next>
        </Pagination>
      )}
    </>
  )
}

CustomPagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  alwaysShown: PropTypes.bool,
}

export default CustomPagination
