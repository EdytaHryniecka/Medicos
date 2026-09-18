import React, { useState } from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import "../styles/cosmetologyProcessSteps.css"

const ToggleIcon = ({ open }) => (
  <svg
    className="cosmetology-process-toggle-icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)" }}
  >
    <path
      d="M3 7L8 2L13 7M8 2V14"
      stroke="#144487"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CosmetologyProcessSteps = () => {
  const { t } = useTranslation()
  const [openSteps, setOpenSteps] = useState({})

  const toggleStep = number => {
    setOpenSteps(prev => ({ ...prev, [number]: !prev[number] }))
  }

  const steps = [
    {
      number: "01",
      title: t`cosmetology.process.step1.title`,
      description: t`cosmetology.process.step1.description`,
    },
    {
      number: "02",
      title: t`cosmetology.process.step2.title`,
      description: t`cosmetology.process.step2.description`,
      highlight: t`cosmetology.process.step2.highlight`,
    },
    {
      number: "03",
      title: t`cosmetology.process.step3.title`,
      description: t`cosmetology.process.step3.description`,
      highlight: t`cosmetology.process.step3.highlight`,
    },
    {
      number: "04",
      title: t`cosmetology.process.step4.title`,
      description: t`cosmetology.process.step4.description`,
    },
  ]

  return (
    <div className="cosmetology-process-container">
      <div className="container cosmetology-process-inner">
        <div className="cosmetology-process-main">
          <h2 className="h2-style cosmetology-process-title">{t`cosmetology.process.title`}</h2>
          <div className="cosmetology-process-row">
            {steps.map(step => {
              const isOpen = !!openSteps[step.number]

              return (
                <div className="cosmetology-process-step" key={step.number}>
                  <div className="cosmetology-process-badge">
                    <span>{step.number}</span>
                  </div>
                  <div className="cosmetology-process-card">
                    <button
                      type="button"
                      className="cosmetology-process-card-header"
                      onClick={() => toggleStep(step.number)}
                      aria-expanded={isOpen}
                    >
                      <p className="title cosmetology-process-card-title">
                        {step.title}
                      </p>
                      <span className="cosmetology-process-card-toggle">
                        <ToggleIcon open={isOpen} />
                      </span>
                    </button>
                    <div
                      className={`cosmetology-process-card-panel${
                        isOpen ? " cosmetology-process-card-panel--open" : ""
                      }`}
                    >
                      <div className="cosmetology-process-card-panel-inner">
                        <p className="p--p1 cosmetology-process-card-description">
                          {step.description}
                          {step.highlight && <strong>{step.highlight}</strong>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="cosmetology-process-callout">
          <p className="title">{t`cosmetology.process.callout`}</p>
        </div>
      </div>
    </div>
  )
}

export default CosmetologyProcessSteps
