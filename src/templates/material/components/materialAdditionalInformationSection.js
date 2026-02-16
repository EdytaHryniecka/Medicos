import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const MaterialAdditionalInformationSection = ({ t, material, renderOptions }) => {
  return (
    <div className="material-additional-information article">
      <h2 className="h2-style js-acc-header">
        {t`materials.post.additional-information`}
      </h2>
      <div className="article-content js-acc-body">
        {renderRichText(material.node.additionalInformation, renderOptions)}
      </div>
    </div>
  )
}

export default MaterialAdditionalInformationSection
