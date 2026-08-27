import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import "../styles/cosmetologyHero.css"

const ArrowIcon = () => (
  <svg
    className="cosmetology-hero-arrow"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2.982 5.58C3.182 5.38 3.452 5.268 3.734 5.268C4.016 5.268 4.286 5.38 4.486 5.58L7.992 9.086L11.498 5.58C11.596 5.478 11.714 5.398 11.844 5.342C11.974 5.286 12.114 5.256 12.254 5.256C12.396 5.256 12.536 5.282 12.666 5.336C12.796 5.39 12.916 5.468 13.016 5.568C13.116 5.668 13.196 5.786 13.248 5.918C13.302 6.048 13.328 6.19 13.328 6.33C13.328 6.472 13.298 6.612 13.242 6.74C13.186 6.868 13.106 6.988 13.004 7.086L8.746 11.344C8.546 11.544 8.276 11.656 7.994 11.656C7.712 11.656 7.442 11.544 7.242 11.344L2.984 7.086C2.784 6.886 2.672 6.616 2.672 6.334C2.672 6.052 2.784 5.782 2.984 5.582L2.982 5.58Z"
      fill="currentColor"
    />
  </svg>
)

const CosmetologyHero = ({ breadcrumbsItems, onCtaClick }) => {
  const { t } = useTranslation()

  const handleCtaClick = tab => {
    if (onCtaClick) {
      onCtaClick(tab)
    }
  }

  return (
    <div className="cosmetology-hero-container">
      <div className="container">
        {breadcrumbsItems && (
          <Breadcrumbs
            className="breadcrumbs--hero"
            items={breadcrumbsItems}
          />
        )}
        <div className="cosmetology-hero-title">
          <h1 className="h1-style">{t`cosmetology.hero.title1`}</h1>
          <h2 className="h2-style">{t`cosmetology.hero.title2`}</h2>
        </div>
        <div className="cosmetology-hero-content">
          <p className="p-style">{t`cosmetology.hero.description`}</p>
          <div className="cosmetology-hero-buttons">
            <button
              className="bright-button cosmetology-hero-btn"
              onClick={() => handleCtaClick("question")}
            >
              {t`cosmetology.hero.cta-ask`}
              <ArrowIcon />
            </button>
            <button
              className="cosmetology-hero-btn cosmetology-hero-btn--outline"
              onClick={() => handleCtaClick("sample")}
            >
              {t`cosmetology.hero.cta-sample`}
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CosmetologyHero
