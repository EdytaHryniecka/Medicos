import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import "./styles/materialCertificatesSection.css"

const MaterialCertificatesSection = ({
  t,
  certificateItems,
  certificatesDescription,
  certificatesDescriptionLong,
  renderOptions,
  hasCertificatesDescriptionLong,
}) => {
  return (
    <div className="material-certificates article">
      <h2 className="h2-style js-acc-header">{t`materials.post.title2`}</h2>
      <div className="js-acc-body">
        {certificateItems.length > 0 && (
          <div className="material-certificates-graphics">
            {certificateItems.map((item, index) => (
              <div
                className="material-certificate-graphic"
                key={`material-certificate-${index}`}
              >
                {item.imageData ? (
                  <GatsbyImage
                    alt={item.alt}
                    image={item.imageData}
                    className="material-certificate-image"
                  />
                ) : (
                  <img
                    src={item.imageSrc}
                    alt={item.alt}
                    className="material-certificate-image"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {hasCertificatesDescriptionLong && (
          <div className="material-certificates-description article-content">
            {renderRichText(certificatesDescriptionLong, renderOptions)}
          </div>
        )}
        {!hasCertificatesDescriptionLong && certificatesDescription && (
          <p className="p--p1 material-certificates-description">
            {certificatesDescription}
          </p>
        )}
      </div>
    </div>
  )
}

export default MaterialCertificatesSection
