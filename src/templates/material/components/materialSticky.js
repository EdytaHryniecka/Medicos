import React from "react"
import "./styles/materialSticky.css"

const MaterialSticky = ({ material, renderCategory, t }) => {
  return (
    <div className="material-sticky">
      <p className="title">{material.node.title}</p>
      <div className="material-sticky-content">
        <p className="p--p2">
          {t`material-modal.inci`}: <span>{material.node.inci}</span>
        </p>
        <p className="p--p2">
          {t`material-modal.cas`}: <span>{material.node.cas}</span>
        </p>
        <div className="categories">
          {material.node.category.map((category, index) =>
            renderCategory(category, index)
          )}
        </div>
        <button className="register-btn register-material" to="/contact">
          {t`materials.post.ask`}
        </button>
      </div>
    </div>
  )
}

export default MaterialSticky
