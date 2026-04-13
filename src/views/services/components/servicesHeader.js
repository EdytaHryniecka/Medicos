import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/servicesHeader.css"

const ServicesHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="services-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.services` },
            ]}
          />
          <h1 className="h1-style">{t`services-header.title`}</h1>
          <p className="p-style">{t`services-header.description`}</p>
        </div>
      </div>
    </>
  )
}

export default ServicesHeader
