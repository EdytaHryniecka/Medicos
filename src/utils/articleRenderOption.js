import React from "react"
import { BLOCKS } from "@contentful/rich-text-types"
import { slugify } from "./slugify"

export const articleTextRenderOptions = tocRef => {
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
        if (!node.data?.target?.file) return null

        return (
          <img
            className="article-img"
            src={node.data.target.file.url}
            alt={node.data.target.title}
          />
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
