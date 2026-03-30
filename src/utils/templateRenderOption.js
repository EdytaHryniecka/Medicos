import React from "react"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

export const richTextRenderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.file === undefined) return

      const { file, title, description } = node.data.target

      return (
        <div className="article-image-wrapper">
          <img className="article-img" src={file.url} alt={title || ""} />
          {description && <p className="article-img-caption">{description}</p>}
        </div>
      )
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      const renderParagraph = content => {
        return (
          <p>
            {content.map((part, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />} {/* Add <br /> for line breaks */}
                {part}
              </React.Fragment>
            ))}
          </p>
        )
      }

      // Iterate through the children of the paragraph node
      const renderedChildren = node.content.map((child, index) => {
        if (child.nodeType === "text") {
          // Split text content by '\n\n'
          const textParts = child.value.split("\n\n")
          // If there are multiple parts, add each as a separate paragraph
          if (textParts.length > 1) {
            return renderParagraph(textParts)
          } else {
            return renderTextWithMarks(child)
          }
        } else if (child.nodeType === "hyperlink") {
          // Render hyperlink
          return (
            <a
              key={index}
              href={child.data.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {child.content.map((subChild, subIndex) => subChild.value)}
            </a>
          )
        }
        return null
      })

      return renderedChildren
    },

    [BLOCKS.HEADING_1]: heading => {
      return <h1>{heading.content[0]?.value}</h1>
    },
    [BLOCKS.HEADING_2]: heading => {
      return <h2>{heading.content[0]?.value}</h2>
    },
    [BLOCKS.HEADING_3]: heading => {
      return <h3>{heading.content[0]?.value}</h3>
    },
    [BLOCKS.HEADING_4]: heading => {
      return <h4>{heading.content[0]?.value}</h4>
    },
    [BLOCKS.HEADING_5]: heading => {
      return <h5>{heading.content[0]?.value}</h5>
    },
    [BLOCKS.HEADING_6]: heading => {
      return <h6>{heading.content[0]?.value}</h6>
    },
  },
}

// Function to render text with marks (bold and underline)
const renderTextWithMarks = textNode => {
  let renderedText = textNode.value

  // Iterate through marks array and apply formatting
  textNode.marks.forEach(mark => {
    if (mark.type === MARKS.BOLD) {
      renderedText = <b>{renderedText}</b>
    } else if (mark.type === MARKS.UNDERLINE) {
      renderedText = <u>{renderedText}</u>
    }
  })

  return renderedText
}
