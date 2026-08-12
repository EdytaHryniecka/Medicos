import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { I18nextContext } from "gatsby-plugin-react-i18next"
import QueryNavigate from "../../hooks/queryNavigate"
import getCurrentTranslations from "../contentful-translator"
import { slugify } from "../../utils/slugify"
import "./styles/ctaWithProductLink.css"
import defaultBackground from "../../images/article/cta-product-link-background.png"

const hasHyperlinkContent = raw => {
  if (typeof raw !== "string" || !raw.trim()) return false

  try {
    const parsed = JSON.parse(raw)
    const nodes = Array.isArray(parsed?.content) ? parsed.content : []

    const extractText = list =>
      list
        .map(node => {
          if (!node) return ""
          if (node.nodeType === "text") {
            return typeof node.value === "string" ? node.value : ""
          }
          if (Array.isArray(node.content)) return extractText(node.content)
          return ""
        })
        .join(" ")

    return extractText(nodes).trim().length > 0
  } catch (error) {
    return false
  }
}

const CtaWithProductLink = ({
  titleOptional,
  description,
  buttonWithUrl,
  backgroundImage,
}) => {
  const { language } = useContext(I18nextContext)

  const data = useStaticQuery(graphql`
    query {
      allContentfulMaterials {
        edges {
          node {
            node_locale
            title
            cas
          }
        }
      }
    }
  `)

  if (!description && !hasHyperlinkContent(buttonWithUrl?.raw)) return null

  const image = backgroundImage?.gatsbyImageData
    ? getImage(backgroundImage.gatsbyImageData)
    : null

  const findMaterialBySlug = slug => {
    const materials = getCurrentTranslations(
      data?.allContentfulMaterials?.edges || [],
      language
    )

    return materials.find(edge => slugify(edge.node.title) === slug)?.node
  }

  const handleButtonClick = event => {
    const link = event.target.closest("a")
    if (!link) return

    const href = link.getAttribute("href") || ""
    if (href.includes("/contact")) return

    event.preventDefault()

    const slug = href.replace(/\/+$/, "").split("/").pop()
    const material = slug ? findMaterialBySlug(slug) : null

    const productLabel = material
      ? [material.title, material.cas].filter(Boolean).join(" ")
      : link.textContent.trim()

    QueryNavigate("Chcę zapytać o dostępność surowca", "contact", language, {
      message: productLabel
        ? `Chcę zapytać o dostępność surowca: ${productLabel}`
        : "",
    })
  }

  return (
    <div className="cta-product-link">
      <div className="cta-product-link-content">
        {titleOptional && (
          <h3 className="cta-product-link-title h3-style">{titleOptional}</h3>
        )}
        {description && (
          <p className="cta-product-link-description p--p1">{description}</p>
        )}
        {buttonWithUrl?.raw && (
          <div className="cta-product-link-button" onClick={handleButtonClick}>
            {renderRichText(buttonWithUrl)}
          </div>
        )}
      </div>
      {image ? (
        <GatsbyImage className="cta-product-link-image" image={image} alt="" />
      ) : (
        <img
          className="cta-product-link-image"
          src={defaultBackground}
          alt=""
          loading="lazy"
        />
      )}
    </div>
  )
}

export default CtaWithProductLink
