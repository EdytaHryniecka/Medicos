import React from "react"

const MaterialMoreInfoSection = ({ t }) => {
  return (
    <div className="material-more-info article">
      <h2 className="h2-style js-acc-header">{t`material-modal.more-info`}</h2>
      <div className="article-content js-acc-body">
        <p>
          {t`material-modal.more-info-description`}{" "}
          <a>{t`material-modal.more-info-email`}</a>
        </p>
      </div>
    </div>
  )
}

export default MaterialMoreInfoSection
