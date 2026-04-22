import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const MaterialGeneralInformationSection = ({ t, material, renderOptions }) => {
  const hasGeneralInformationContent = (() => {
    const rawValue = material?.node?.generalInformation?.raw

    if (typeof rawValue !== "string" || !rawValue.trim()) {
      return false
    }

    try {
      const parsed = JSON.parse(rawValue)
      const nodes = Array.isArray(parsed?.content) ? parsed.content : []

      const extractText = list =>
        list
          .map(node => {
            if (!node) {
              return ""
            }
            if (node.nodeType === "text") {
              return typeof node.value === "string" ? node.value : ""
            }
            if (Array.isArray(node.content)) {
              return extractText(node.content)
            }
            return ""
          })
          .join(" ")

      return extractText(nodes).trim().length > 0
    } catch (error) {
      return false
    }
  })()

  if (!hasGeneralInformationContent) {
    return null
  }

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
