import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { GatsbyImage } from "gatsby-plugin-image"
import "./styles/materialHeader.css"

const MaterialHeader = ({ material, heroImageData, renderCategory, t }) => {
  return (
    <div className="material-page-header">
      <div className="container">
        <div className="left-text">
          <Link to="/materials" className="bright-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10.4201 2.982C10.6201 3.182 10.7321 3.452 10.7321 3.734C10.7321 4.016 10.6201 4.286 10.4201 4.486L6.91414 7.992L10.4201 11.498C10.5221 11.596 10.6021 11.714 10.6581 11.844C10.7141 11.974 10.7441 12.114 10.7441 12.254C10.7441 12.396 10.7181 12.536 10.6641 12.666C10.6101 12.796 10.5321 12.916 10.4321 13.016C10.3321 13.116 10.2141 13.196 10.0821 13.248C9.95214 13.302 9.81014 13.328 9.67014 13.328C9.52814 13.328 9.38814 13.298 9.26014 13.242C9.13214 13.186 9.01214 13.106 8.91414 13.004L4.65614 8.746C4.45614 8.546 4.34414 8.276 4.34414 7.994C4.34414 7.712 4.45614 7.442 4.65614 7.242L8.91414 2.984C9.11414 2.784 9.38414 2.672 9.66614 2.672C9.94814 2.672 10.2181 2.784 10.4181 2.984L10.4201 2.982Z"
                fill="#144487"
              />
            </svg>
            <span> {t`materials.post.return`}</span>
          </Link>
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
