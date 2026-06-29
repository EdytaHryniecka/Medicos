import React, { useContext } from "react"
import {
  useTranslation,
  Link,
  I18nextContext,
} from "gatsby-plugin-react-i18next"
import "../styles/servicesOurServices.css"
import { StaticImage } from "gatsby-plugin-image"
import QueryNavigate from "../../../hooks/queryNavigate"

const ServicesOurServices = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)
  let alt =
    language === "pl"
      ? "Dwie osoby przy białym biurku obsługujące tablet za pomocą rysika"
      : "Two people at a white desk using a tablet with a stylus"

  let alt2 =
    language === "pl"
      ? "Dłonie w białych rękawiczkach trzymające kolbę z różowym płynem obok aparatury laboratoryjnej"
      : "Hands wearing white gloves holding a flask containing pink liquid beside laboratory apparatus"

  let alt3 =
    language === "pl"
      ? "Osoba analizująca dokumenty z wykresami przy biurku z laptopem, kalkulatorem i kubkiem kawy"
      : "Person analysing documents with charts at a desk with a laptop, calculator and coffee mug"

  const goToContactTech = () => {
    QueryNavigate("Chcę zamówić doradztwo techniczne", "contact", language)
  }

  const goToContactSub = () => {
    QueryNavigate("Chcę zamówić wyszukiwanie substancji", "contact", language)
  }

  const goToContactAn = () => {
    QueryNavigate("Chcę zamówić analizę rynku dostawców", "contact", language)
  }

  return (
    <>
      <div className="services-os-container">
        <div className="container">
          <div className="services-con">
            <div onClick={goToContactTech} className="service">
              <StaticImage
                className="service-image"
                src="../../../images/services/our-services/service-image-1.webp"
                alt={alt}
                placeholder="Service image"
                loading="lazy"
              />
              <div className="right-text">
                <h3 className="h3-style">{t`services-our-services.title-1`}</h3>
                <p>{t`services-our-services.description-1`}</p>
                <Link
                  to="/contact"
                  className="bright-button"
                >{t`services-our-services.contact`}</Link>
              </div>
            </div>
            <div onClick={goToContactSub} className="service">
              <StaticImage
                className="service-image"
                src="../../../images/services/our-services/service-image-2.webp"
                alt={alt2}
                placeholder="Service image"
                loading="lazy"
              />
              <div className="right-text">
                <h3 className="h3-style">{t`services-our-services.title-2`}</h3>
                <p>{t`services-our-services.description-2`}</p>
                <Link
                  to="/contact"
                  className="bright-button"
                >{t`services-our-services.contact`}</Link>
              </div>
            </div>
            <div onClick={goToContactAn} className="service">
              <StaticImage
                className="service-image"
                src="../../../images/services/our-services/service-image-3.webp"
                alt={alt3}
                placeholder="Service image"
                loading="lazy"
              />
              <div className="right-text">
                <h3 className="h3-style">{t`services-our-services.title-3`}</h3>
                <p>{t`services-our-services.description-3`}</p>
                <Link
                  to="/contact"
                  className="bright-button"
                >{t`services-our-services.contact`}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesOurServices
