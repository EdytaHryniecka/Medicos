import React, { useContext } from "react"
import "./styles/articleTile.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import moment from "moment"
import Navigate from "../../hooks/navigate"
import { I18nextContext } from "gatsby-plugin-react-i18next"

const ArticleTile = ({ article, t }) => {
  const { language } = useContext(I18nextContext)

  const description = JSON.parse(article.node.description.raw).content.filter(
    node => node?.content[0]?.nodeType === "text"
  )[0].content[0].value

  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description

  const goToDetails = () => {
    Navigate(`news/${article.node.slug}`, language)
  }

  return (
    <div onClick={() => goToDetails()} className="tile">
      <GatsbyImage
        alt={article.node.title}
        placeholder={article.node.title}
        className="tile-image"
        image={getImage(article.node.image.gatsbyImageData)}
      />
      <div className="tile-text">
        <p className="p-style tile-title">{article.node.title}</p>
        {/* <p className="p-style tile-description">{truncatedDescription}</p> */}
        <div className="tile-text-down">
          <p className="p-style date">
            {moment(article.node.createdAt).format("DD/MM/YYYY HH:MM")}
          </p>
          <p className="p-style read-more">{t`news-read-more.title`}</p>
        </div>
      </div>
    </div>
  )
}

export default ArticleTile
