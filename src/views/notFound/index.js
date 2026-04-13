import React from "react"
import Seo from "../../components/seo"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import Layout from "../../components/layout"
import "./style/notFound.css"
import Breadcrumbs from "../../components/breadcrumbs/breadcrumbs"
import BreadcrumbSchema from "../../components/breadcrumbs/breadcrumbSchema"

const About = () => {
  const { t } = useTranslation()
  const breadcrumbItems = [
    { label: t`search-content.home`, to: "/" },
    { label: t`not-found.title` },
  ]

  return (
    <>
      <Seo
        title={t`seo.not-found.title`}
        description={t`seo.not-found.description`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="not-found-con">
        <div className="container">
          <div className="breadcrumbs-inline">
            <Breadcrumbs
              items={[
                { label: t`search-content.home`, to: "/" },
                { label: t`not-found.title` },
              ]}
            />
          </div>
          <div className="nf-con">
            <h3 className="h3-style">{t`not-found.title`}</h3>
            <p className="p-style">{t`not-found.description`}</p>
            <Link
              className="register-btn search-content-button"
              to="/"
            >{t`search-content.home`}</Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default About
