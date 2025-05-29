import React, { useContext } from "react"
import { useTranslation, I18nextContext } from "gatsby-plugin-react-i18next"
import "../styles/certificate.css"
import QueryNavigate from "../../../hooks/queryNavigate"

const Certificate = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const goToContact = () => {
    QueryNavigate("Inny temat", "contact", language)
  }
  return (
    <>
      <div className="certificate-qs-container">
        <div className="container">
          <h2 className="h2-style">{t`quality-standards-certificate.title`}</h2>
          <p className="p-style">{t`quality-standards-certificate.description`}</p>
          <button
            onClick={goToContact}
            className="register-btn certificate-button"
            to="/contact"
          >{t`quality-standards-certificate.contact`}</button>
        </div>
      </div>
    </>
  )
}

export default Certificate
