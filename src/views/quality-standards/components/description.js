import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/description.css"

const Description = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="qs-description-container">
        <div className="container"></div>
      </div>
    </>
  )
}

export default Description
