import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/aboutHeader.css"

const AboutHeader = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="about-h-container">
        <div className="container">
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.about` },
            ]}
          />
          <h1 className="h1-style">{t`about-header.title`}</h1>
        </div>
      </div>
    </>
  )
}

export default AboutHeader
