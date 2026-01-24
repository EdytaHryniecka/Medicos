import React, { useContext } from "react"
import { I18nextContext, useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/aboutPolicy.css"
import Navigate from "../../../hooks/navigate"

const AboutPolicy = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const goToQualityStandards = () => {
    Navigate(`quality-standards/`, language)
  }
  return (
    <>
      <div className="about-p-container">
        <div className="container">
          <h2 className="h2-style">{t`about-policy.title`}</h2>
          <p className="p-style">{t`about-policy.description`}</p>
          <button
            onClick={goToQualityStandards}
            className="register-btn about-p-button"
          >{t`about-policy.button`}</button>
        </div>
      </div>
    </>
  )
}

export default AboutPolicy
