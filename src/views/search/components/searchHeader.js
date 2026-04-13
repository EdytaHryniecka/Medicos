import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/searchHeader.css"
const SearchHeader = ({ searchData }) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="search-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`search-header.title` },
            ]}
          />
          <h1 className="h1-style">{t`search-header.title`}</h1>
          <p className="p-style">{searchData}</p>
        </div>
      </div>
    </>
  )
}

export default SearchHeader
