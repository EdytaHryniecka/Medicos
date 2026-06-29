import React from "react"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import "../styles/description.css"
import { StaticImage } from "gatsby-plugin-image"
const Description = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  let alt =
    language === "pl"
      ? "Kobieta w białym fartuchu i okularach trzymająca kolbę laboratoryjną"
      : "Woman in a white lab coat and safety glasses holding a laboratory flask"

  return (
    <>
      <div className="qs-description-container">
        <div className="container">
          <div className="description-left-container">
            <p className="p-style">{t`quality-standards-description.description`}</p>
            <p className="p-style description-2">{t`quality-standards-description.description2`}</p>
          </div>
          <div className="image-container">
            <StaticImage
              className="description-image"
              src="../../../images/quality-standards/description/qs-description.webp"
              alt={alt}
              placeholder="Flag"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Description
