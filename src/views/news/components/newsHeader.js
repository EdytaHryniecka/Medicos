import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/newsHeader.css"

const NewsHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="news-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.blog` },
            ]}
          />
          <h1 className="h1-style">{t`news-header.title`}</h1>
          <p className="p-style">{t`news-header.description`}</p>
        </div>
      </div>
    </>
  )
}

export default NewsHeader
