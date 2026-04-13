import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "./styles/materialHeader.css"

const MaterialHeader = ({ material, heroImageData, renderCategory, t }) => {
  return (
    <div className="material-page-header">
      <div className="container">
        <div className="left-text">
          <Breadcrumbs
            items={[
              { label: t`search-content.home`, to: "/" },
              { label: t`menu.raw-material-offer`, to: "/materials" },
              { label: material.node.title },
            ]}
          />
          <div className="cas">
            <p className="p--emphasis">
              {t`material-modal.cas`}: {material.node.cas}
            </p>
          </div>
          <h1 className="h1-style">{material.node.title}</h1>
          <div className="left-header">
            <div className="categories">
              {material.node.category.map((category, index) =>
                renderCategory(category, index)
              )}
            </div>
          </div>
          <button className="register-btn register-material" to="/contact">
            {t`materials.post.ask`}
          </button>
          <p className="p--p1">({t`materials.post.ask-test`})</p>
        </div>
        {heroImageData && (
          <GatsbyImage
            alt={material.node.title}
            className="material-image"
            image={heroImageData}
          />
        )}
      </div>
    </div>
  )
}

export default MaterialHeader
