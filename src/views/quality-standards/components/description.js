import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/description.css"
import { StaticImage } from "gatsby-plugin-image"
const Description = () => {
  const { t } = useTranslation()

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
              alt="Flag"
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
