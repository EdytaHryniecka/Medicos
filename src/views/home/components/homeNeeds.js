import React from "react"
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import "../styles/homeNeeds.css"

const HomeNeeds = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="home-n-container">
        <div className="container">
          <h2 className="h1-style">
            {t`home-needs.title-a`} <span>{t`home-needs.title-b`}</span>
            {t`home-needs.title-c`}
          </h2>
          <Link
            to="/contact"
            className="register-btn needs-button"
          >{t`home-needs.contact`}</Link>
        </div>
      </div>
    </>
  )
}

export default HomeNeeds
