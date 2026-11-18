import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { ArrowIcon } from "../icons/formulationsIcons"
import glassImage from "../../../images/formulations/cta/formulations-cta-glass.webp"

const FormulationsCtaTile = ({ formId, onClick }) => {
  const { t } = useTranslation()

  return (
    <div className="formulations-cta-tile">
      <span
        className="formulations-cta-glass formulations-cta-glass--top"
        aria-hidden="true"
      >
        <img
          src={glassImage}
          alt=""
          width="334"
          height="294"
          loading="lazy"
          decoding="async"
        />
      </span>
      <span
        className="formulations-cta-glass formulations-cta-glass--bottom"
        aria-hidden="true"
      >
        <img
          src={glassImage}
          alt=""
          width="334"
          height="294"
          loading="lazy"
          decoding="async"
        />
      </span>
      <p className="formulations-cta-title">{t`formulations.cta.title`}</p>
      <p className="formulations-cta-description">{t`formulations.cta.description`}</p>
      <a
        href={`#${formId}`}
        className="formulations-button formulations-button--light formulations-cta-button"
        onClick={event => {
          if (!onClick) return
          event.preventDefault()
          onClick()
        }}
      >
        {t`formulations.cta.button`}
        <ArrowIcon className="formulations-arrow-right" />
      </a>
    </div>
  )
}

export default FormulationsCtaTile
