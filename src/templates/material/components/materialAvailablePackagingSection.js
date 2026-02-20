import React from "react"
import "./styles/materialAvailablePackagingSection.css"

const MaterialAvailablePackagingSection = ({ t, packagingRows }) => {
  return (
    <div className="material-available-packaging article">
      <h2 className="h2-style js-acc-header">
        {t`materials.post.available-packaging`}
      </h2>
      <div className="article-content js-acc-body">
        <ul className="material-available-packaging-list">
          {packagingRows.map((row, index) => (
            <li
              key={`material-packaging-${index}`}
              className="p--p1 material-available-packaging-item"
            >
              {[row.leftValue, row.rightValue].filter(Boolean).join(" ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MaterialAvailablePackagingSection
