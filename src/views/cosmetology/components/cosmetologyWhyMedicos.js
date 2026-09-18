import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { StaticImage } from "gatsby-plugin-image"
import {
  iconDoborPrzezFunkcje,
  iconWiedzaAplikacyjna,
  iconOdSelekcjiDoTestow,
  iconPartnerNaCalejSciezce,
} from "../icons/whyMedicosIcons"
import "../styles/cosmetologyWhyMedicos.css"

const CosmetologyWhyMedicos = () => {
  const { t } = useTranslation()

  const reasons = [
    {
      icon: iconDoborPrzezFunkcje,
      title: t`cosmetology.why.reason1.title`,
      description: t`cosmetology.why.reason1.description`,
    },
    {
      icon: iconWiedzaAplikacyjna,
      title: t`cosmetology.why.reason2.title`,
      description: t`cosmetology.why.reason2.description`,
    },
    {
      icon: iconOdSelekcjiDoTestow,
      title: t`cosmetology.why.reason3.title`,
      description: t`cosmetology.why.reason3.description`,
    },
    {
      icon: iconPartnerNaCalejSciezce,
      title: t`cosmetology.why.reason4.title`,
      description: t`cosmetology.why.reason4.description`,
    },
  ]

  return (
    <div className="cosmetology-why-container">
      <div className="container cosmetology-why-inner">
        <div className="cosmetology-why-text">
          <h2 className="h2-style cosmetology-why-title">{t`cosmetology.why.title`}</h2>
          <div className="cosmetology-why-grid">
            {reasons.map(reason => (
              <div className="cosmetology-why-item" key={reason.title}>
                <div
                  className="cosmetology-why-icon-box"
                  dangerouslySetInnerHTML={{ __html: reason.icon }}
                />
                <div className="cosmetology-why-item-text">
                  <p className="title cosmetology-why-item-title">
                    {reason.title}
                  </p>
                  <p className="p--p1">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cosmetology-why-image">
          <StaticImage
            src="../../../images/cosmetology/why-medicos/medicos-surowce-kosmetologia.png"
            alt=""
            placeholder="blurred"
            loading="lazy"
            layout="fullWidth"
            style={{ position: "absolute", inset: 0, height: "100%" }}
            imgStyle={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  )
}

export default CosmetologyWhyMedicos
