import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/qsHeader.css"

const QsHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="qs-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.quality-standards` },
            ]}
          />
          <h1 className="h1-style">{t`quality-standards-header.title`}</h1>
          <p className="p-style">{t`quality-standards-header.description`}</p>
        </div>
      </div>
    </>
  )
}

export default QsHeader
