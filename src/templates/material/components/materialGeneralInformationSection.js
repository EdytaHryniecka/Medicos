import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const MaterialGeneralInformationSection = ({ t, material, renderOptions }) => {
  return (
    <div className="material-general-information article">
      <h2 className="h2-style js-acc-header">{t`materials.post.title3`}</h2>
      <div className="article-content js-acc-body">
        {renderRichText(material.node.generalInformation, renderOptions)}
      </div>
    </div>
  )
}

export default MaterialGeneralInformationSection
