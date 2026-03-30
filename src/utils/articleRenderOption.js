import React from "react"
import { BLOCKS } from "@contentful/rich-text-types"
import { slugify } from "./slugify"

const getAssetFromTarget = (target, assetMap) => {
  if (!target) return null
  if (target.file) return target

  const targetId =
    typeof target.contentful_id === "string"
      ? target.contentful_id
      : target.sys?.id

  return targetId ? assetMap[targetId] || null : null
}

export const articleTextRenderOptions = (tocRef, assetMap = {}) => {
  const renderHeading = (level, className) => node => {
    const text = node.content.map(item => item.value || "").join("")

    const id = slugify(text)

    // ⬇️ zapis do ref — BEZ duplikatów
    if ([2, 3, 4].includes(level)) {
      tocRef.current.push({ id, text, level })
    }

    return React.createElement(`h${level}`, { id, className }, text)
  }

  return {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const asset = getAssetFromTarget(node.data?.target, assetMap)
        if (!asset?.file) return null

        const { file, title, description } = asset

        return (
          <div className="article-image-wrapper">
            <img className="article-img" src={file.url} alt={title || ""} />
            {description && (
              <p className="article-img-caption">{description}</p>
            )}
          </div>
        )
      },

      [BLOCKS.HEADING_1]: renderHeading(1, "h1-style"),
      [BLOCKS.HEADING_2]: renderHeading(2, "h2-style"),
      [BLOCKS.HEADING_3]: renderHeading(3, "h3-style"),
      [BLOCKS.HEADING_4]: renderHeading(4, "h4-style"),
      [BLOCKS.HEADING_5]: renderHeading(5, "h5-style"),
      [BLOCKS.HEADING_6]: renderHeading(6, "h6-style"),
    },
  }
}
