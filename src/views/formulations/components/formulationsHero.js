import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Breadcrumbs from "../../../components/breadcrumbs/breadcrumbs"
import { ArrowIcon } from "../icons/formulationsIcons"
import { HERO_IMAGE_SIZES, HERO_IMAGE_SRCSET, heroMobile } from "../heroImage"
import "../styles/formulationsHero.css"

const FormulationsHero = ({ breadcrumbsItems, stats, onCtaClick }) => {
  const { t } = useTranslation()

  return (
    <div className="formulations-hero-container">
      <picture className="formulations-hero-background" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={heroMobile} />
        <img
          src={HERO_IMAGE_SRCSET.split(" ")[0]}
          srcSet={HERO_IMAGE_SRCSET}
          sizes={HERO_IMAGE_SIZES}
          alt=""
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <div className="container formulations-hero-inner">
        <Breadcrumbs
          className="breadcrumbs--hero formulations-hero-breadcrumbs"
          items={breadcrumbsItems}
        />
        <h1 className="h1-style formulations-hero-title">{t`formulations.hero.title`}</h1>
        <div className="formulations-hero-row">
          <div className="formulations-hero-content">
            <p className="p--p1 formulations-hero-description">{t`formulations.hero.description`}</p>
            <button
              type="button"
              className="formulations-button formulations-button--light"
              onClick={onCtaClick}
            >
              {t`formulations.hero.cta`}
              <ArrowIcon className="formulations-arrow-right" />
            </button>
          </div>
          <div className="formulations-hero-stats">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                {index > 0 && (
                  <span
                    className="formulations-hero-stats-separator"
                    aria-hidden="true"
                  />
                )}
                <div className="formulations-hero-stat">
                  <p className="formulations-hero-stat-value">{stat.value}</p>
                  <p className="formulations-hero-stat-label">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormulationsHero
