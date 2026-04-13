import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/materialsHeader.css"

const MaterialsHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="materials-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.raw-material-offer` },
            ]}
          />
          <h1 className="h1-style">{t`materials-header.title`}</h1>
          <p className="p-style">{t`materials-header.description`}</p>
        </div>
      </div>
    </>
  )
}

export default MaterialsHeader
