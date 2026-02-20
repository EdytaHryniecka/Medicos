import React from "react"
import "./styles/materialDownloadableMaterialsSection.css"

const MaterialDownloadableMaterialsSection = ({ t }) => {
  return (
    <div className="material-downloadable-materials">
      <h2 className="h2-style">{t`materials.post.downloadable-materials`}</h2>
      <p className="p--p1">{t`materials.post.downloadable-materials-description`}</p>
      <button className="register-btn register-material" to="/contact">
        {t`materials.post.ask2`}
      </button>
    </div>
  )
}

export default MaterialDownloadableMaterialsSection
