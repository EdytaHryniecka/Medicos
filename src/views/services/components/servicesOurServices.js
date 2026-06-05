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
                alt="Dwie osoby przy białym biurku obsługujące tablet za pomocą rysika"
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
                alt="Dłonie w białych rękawiczkach trzymające kolbę z różowym płynem obok aparatury laboratoryjnej"
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
                alt="Osoba analizująca dokumenty z wykresami przy biurku z laptopem, kalkulatorem i kubkiem kawy"
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
