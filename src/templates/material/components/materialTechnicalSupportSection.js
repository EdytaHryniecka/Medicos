import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const MaterialTechnicalSupportSection = ({ t, material, renderOptions }) => {
  return (
    <div className="material-technical-support article">
      <h2 className="h2-style js-acc-header">{t`materials.post.technical-support`}</h2>
      <div className="article-content js-acc-body">
        {renderRichText(material.node.technicalSupport, renderOptions)}
      </div>
    </div>
  )
}

export default MaterialTechnicalSupportSection
