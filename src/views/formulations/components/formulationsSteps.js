import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { InfoIcon } from "../icons/formulationsIcons"
import "../styles/formulationsSteps.css"

const STEPS = ["01", "02", "03"]

const FormulationsSteps = () => {
  const { t } = useTranslation()

  return (
    <div className="formulations-steps-container">
      <div className="container">
        <div className="formulations-steps-box">
          <div className="formulations-steps-header">
            <h2 className="h2-style formulations-steps-title">
              <span>{t`formulations.steps.title1`}</span>{" "}
              <span>{t`formulations.steps.title2`}</span>
            </h2>
            <p className="p--p1 formulations-steps-description">{t`formulations.steps.description`}</p>
          </div>
          <div className="formulations-steps-row">
            {STEPS.map((number, index) => (
              <div className="formulations-steps-item" key={number}>
                <span className="formulations-steps-badge">{number}</span>
                <div className="formulations-steps-card">
                  <p className="formulations-steps-card-title">
                    {t(`formulations.steps.step${index + 1}-title`)}
                  </p>
                  <p className="p--p1">
                    {t(`formulations.steps.step${index + 1}-description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="formulations-note">
            <InfoIcon className="formulations-note-icon" />
            <p className="formulations-note-text">{t`formulations.steps.note`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormulationsSteps
