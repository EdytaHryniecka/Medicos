import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import "./styles/materialCertificatesSection.css"

const MaterialCertificatesSection = ({ t, certificateItems, certificatesDescription }) => {
  return (
    <div className="material-certificates">
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
        {certificatesDescription && (
          <p className="p--p1 material-certificates-description">
            {certificatesDescription}
          </p>
        )}
      </div>
    </div>
  )
}

export default MaterialCertificatesSection
